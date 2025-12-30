<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\AwsS3Service;
use App\CsvOperations\CsvParser;
use App\CsvOperations\DateParser;
use App\DataOperations\CsvReportToData;

class S3CostReportController extends Controller
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
     * List all available CSV files in S3
     */
    public function listS3Files(Request $request)
    {
        try {
            $year = $request->input('year');
            $month = $request->input('month');

            if ($year && $month) {
                $files = $this->s3Service->listFilesByMonth($year, $month);
            } else {
                $files = $this->s3Service->listCsvFiles('cost-reports/');
            }

            return response()->json([
                'success' => true,
                'files' => $files,
                'count' => count($files),
            ]);

        } catch (\Exception $e) {
            Log::error('List S3 files error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to list S3 files: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Import a specific file from S3
     */
    public function importFromS3(Request $request)
    {
        try {
            $request->validate([
                's3_key' => 'required|string',
            ]);

            $s3Key = $request->input('s3_key');
            $user = $request->user();

            Log::info('Importing from S3', [
                'key' => $s3Key,
                'user_id' => $user->id,
            ]);

            // Check if file exists
            if (!$this->s3Service->fileExists($s3Key)) {
                return response()->json([
                    'error' => 'File not found in S3'
                ], 404);
            }

            // Get file metadata
            $metadata = $this->s3Service->getFileMetadata($s3Key);
            $fileSizeMB = $metadata['content_length'] / 1024 / 1024;

            Log::info('File metadata', [
                'size_mb' => round($fileSizeMB, 2),
                'last_modified' => $metadata['last_modified'],
            ]);

            if ($fileSizeMB > 100) {
                return response()->json([
                    'error' => 'File size (' . round($fileSizeMB, 2) . ' MB) exceeds maximum allowed size of 100MB'
                ], 422);
            }

            // Download file content
            $content = $this->s3Service->downloadFile($s3Key);

            if (empty($content)) {
                return response()->json([
                    'error' => 'Downloaded file is empty'
                ], 422);
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
            $dataResult = $this->dataOperations->processData($processResult['raw_data']);
            $summary = $this->dataOperations->calculateSummary($dataResult['aggregated_data']);

            // Save to database
            $upload = $this->dataOperations->saveToDatabase(
                $user->id,
                basename($s3Key), // Use S3 filename
                $dataResult['processed_data'],
                $summary,
                $dataResult['upload_month']
            );

            return response()->json([
                'success' => true,
                'message' => 'Report imported from S3 successfully',
                'upload_id' => $upload->id,
                'records_processed' => count($dataResult['processed_data']),
                'accounts' => $summary['total_accounts'],
                'file_size_mb' => round($fileSizeMB, 2),
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => $e->validator->errors()->first()
            ], 422);
        } catch (\Exception $e) {
            Log::error('S3 import error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Import failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Import the latest file from S3
     */
    public function importLatest(Request $request)
    {
        try {
            $user = $request->user();
            
            // Get the latest file
            $latestFile = $this->s3Service->getLatestFile('cost-reports/');

            if (!$latestFile) {
                return response()->json([
                    'error' => 'No files found in S3'
                ], 404);
            }

            Log::info('Importing latest file', [
                'key' => $latestFile['key'],
                'last_modified' => $latestFile['last_modified'],
            ]);

            // Use the importFromS3 logic
            $request->merge(['s3_key' => $latestFile['key']]);
            return $this->importFromS3($request);

        } catch (\Exception $e) {
            Log::error('Import latest error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to import latest file: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Import all files from a specific month
     */
    public function importMonth(Request $request)
    {
        try {
            $request->validate([
                'year' => 'required|integer|min:2020|max:2100',
                'month' => 'required|integer|min:1|max:12',
            ]);

            $year = $request->input('year');
            $month = $request->input('month');
            $user = $request->user();

            $files = $this->s3Service->listFilesByMonth($year, $month);

            if (empty($files)) {
                return response()->json([
                    'error' => "No files found for {$year}/{$month}"
                ], 404);
            }

            $results = [];
            $successCount = 0;
            $failCount = 0;

            foreach ($files as $file) {
                try {
                    $request->merge(['s3_key' => $file['key']]);
                    $response = $this->importFromS3($request);
                    
                    if ($response->getStatusCode() === 200) {
                        $successCount++;
                        $results[] = [
                            'file' => $file['filename'],
                            'status' => 'success',
                        ];
                    } else {
                        $failCount++;
                        $results[] = [
                            'file' => $file['filename'],
                            'status' => 'failed',
                            'error' => $response->getData()->error ?? 'Unknown error',
                        ];
                    }
                } catch (\Exception $e) {
                    $failCount++;
                    $results[] = [
                        'file' => $file['filename'],
                        'status' => 'failed',
                        'error' => $e->getMessage(),
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Imported {$successCount} files successfully, {$failCount} failed",
                'results' => $results,
                'total_files' => count($files),
                'successful' => $successCount,
                'failed' => $failCount,
            ]);

        } catch (\Exception $e) {
            Log::error('Import month error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to import month: ' . $e->getMessage()
            ], 500);
        }
    }
}