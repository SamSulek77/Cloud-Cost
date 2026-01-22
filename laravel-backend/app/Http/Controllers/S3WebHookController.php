<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\AwsS3Service;
use App\CsvOperations\CsvParser;
use App\CsvOperations\DateParser;
use App\DataOperations\CsvReportToData;

class S3WebhookController extends Controller
{
    private AwsS3Service $s3Service;
    private CsvParser $csvParser;
    private DateParser $dateParser;
    private CsvReportToData $dataOperations;

    public function __construct(
        AwsS3Service $s3Service,
        CsvParser $csvParser,
        DateParser $dateParser,
        CsvReportToData $dataOperations
    ) {
        $this->s3Service = $s3Service;
        $this->csvParser = $csvParser;
        $this->dateParser = $dateParser;
        $this->dataOperations = $dataOperations;
    }

    /**
     * Handle S3 event notification
     */
    public function handleS3Event(Request $request)
    {
        try {
            Log::info('S3 Event received', ['body' => $request->all()]);

            // AWS SNS sends a subscription confirmation first
            $messageType = $request->header('x-amz-sns-message-type');
            
            if ($messageType === 'SubscriptionConfirmation') {
                return $this->confirmSubscription($request);
            }

            // Parse the SNS message
            $message = json_decode($request->getContent(), true);
            
            if (!isset($message['Message'])) {
                Log::warning('No message in SNS notification');
                return response()->json(['error' => 'Invalid notification'], 400);
            }

            $s3Event = json_decode($message['Message'], true);
            
            // Extract S3 object details
            if (!isset($s3Event['Records'][0])) {
                Log::warning('No records in S3 event');
                return response()->json(['error' => 'No records found'], 400);
            }

            foreach ($s3Event['Records'] as $record) {
                $bucket = $record['s3']['bucket']['name'];
                $key = urldecode($record['s3']['object']['key']);
                $eventName = $record['eventName'];

                Log::info('Processing S3 event', [
                    'bucket' => $bucket,
                    'key' => $key,
                    'event' => $eventName,
                ]);

                // Only process ObjectCreated events for CSV files
                if (strpos($eventName, 'ObjectCreated') !== false && 
                    pathinfo($key, PATHINFO_EXTENSION) === 'csv') {
                    
                    $this->processNewFile($key);
                }
            }

            return response()->json(['status' => 'processed'], 200);

        } catch (\Exception $e) {
            Log::error('S3 webhook error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json(['error' => 'Processing failed'], 500);
        }
    }

    /**
     * Process newly uploaded file
     */
    private function processNewFile(string $s3Key)
    {
        try {
            Log::info("Processing new file: {$s3Key}");

            // Download file
            $content = $this->s3Service->downloadFile($s3Key);

            if (empty($content)) {
                Log::warning("Downloaded file is empty: {$s3Key}");
                return;
            }

            // Parse CSV
            $parsedCsv = $this->csvParser->parse($content);
            $columnMap = $this->csvParser->mapColumns($parsedCsv['headers']);
            
            // Process rows
            $processResult = $this->csvParser->processRows(
                $parsedCsv['lines'],
                $parsedCsv['delimiter'],
                $parsedCsv['header_line_index'],
                $columnMap
            );

            // Process and aggregate data
            // Process and aggregate data
            $dataResult = $this->dataOperations->processData($processResult['raw_data']);
            $uploadMonth = $dataResult['upload_month'];

            // 🛑 1. STRICT FOLDER COMPLIANCE CHECK (Match S3 Key Structure)
            if ($uploadMonth !== 'Unknown') {
                 Log::info("Webhook Check: Processing contents of {$s3Key} which declares month {$uploadMonth}");

                 if (preg_match('/(\d{4})\/(\d{1,2})\//', $s3Key, $matches)) {
                     $folderYear = (int)$matches[1];
                     $folderMonth = (int)$matches[2];
                     
                     try {
                         $contentDate = \Carbon\Carbon::createFromFormat('F Y', $uploadMonth);
                         
                         if ($contentDate->year !== $folderYear || $contentDate->month !== $folderMonth) {
                             Log::warning("Skipping webhook mismatch: Content {$uploadMonth} != Folder {$folderYear}/{$folderMonth} (Key: {$s3Key})");
                             return; // Stop processing
                         } else {
                             Log::info("Webhook Check: Folder match confirmed. {$folderYear}/{$folderMonth} matches {$uploadMonth}");
                         }
                     } catch (\Exception $e) {
                         Log::warning("Webhook date parsing failed: " . $e->getMessage());
                     }
                 } else {
                     Log::warning("Webhook could not detect Year/Month folder structure in key: {$s3Key}. Skipping strict folder check.");
                 }
            }

            // 🛑 2. DUPLICATE CONTENT CHECK
            $existsCount = \App\Models\CostUpload::where('month_year', trim($uploadMonth))->count();
            Log::info("Webhook Check: DB check for '{$uploadMonth}' found {$existsCount} records.");

            if ($uploadMonth !== 'Unknown' && $existsCount > 0) {
                Log::warning("Skipping webhook duplicate: Month {$uploadMonth} already exists in database.");
                return; // Stop processing
            }

            $summary = $this->dataOperations->calculateSummary($dataResult['aggregated_data']);

            // Get default user (or you can have a system user)
            $systemUser = \App\Models\User::first();

            if (!$systemUser) {
                Log::error('No user found for automatic import');
                return;
            }

            // Save to database
            $upload = $this->dataOperations->saveToDatabase(
                $systemUser->id,
                basename($s3Key),
                $dataResult['processed_data'],
                $summary,
                $dataResult['upload_month']
            );

            Log::info("File processed successfully", [
                'upload_id' => $upload->id,
                'records' => count($dataResult['processed_data']),
                'accounts' => $summary['total_accounts'],
            ]);

        } catch (\Exception $e) {
            Log::error("Failed to process file: {$s3Key}", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Confirm SNS subscription
     */
    private function confirmSubscription(Request $request)
    {
        $message = json_decode($request->getContent(), true);
        $subscribeURL = $message['SubscribeURL'] ?? null;

        if ($subscribeURL) {
            // Visit the URL to confirm subscription
            file_get_contents($subscribeURL);
            Log::info('SNS subscription confirmed');
            return response()->json(['status' => 'subscribed'], 200);
        }

        return response()->json(['error' => 'No subscribe URL'], 400);
    }
}