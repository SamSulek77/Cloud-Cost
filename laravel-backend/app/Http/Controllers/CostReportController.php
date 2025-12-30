<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\CsvOperations\CsvParser;
use App\CsvOperations\DateParser;
use App\DataOperations\CsvReportToData;
use Illuminate\Support\Facades\Storage;

class CostReportController extends Controller
{
    private CsvParser $csvParser;
    private DateParser $dateParser;
    private CsvReportToData $dataOperations;

    public function __construct(
        CsvParser $csvParser,
        DateParser $dateParser,
        CsvReportToData $dataOperations
    ) {
        $this->csvParser = $csvParser;
        $this->dateParser = $dateParser;
        $this->dataOperations = $dataOperations;
    }

    /**
     * Upload and process cost report
     */
    public function uploadReport(Request $request)
    {
        try {
            Log::info('Upload request received');

            // Validate file
            $request->validate([
                'file' => 'required|file|mimes:csv,txt|max:102400',
            ], [
                'file.required' => 'Please select a file to upload',
                'file.mimes' => 'Only CSV files are allowed',
                'file.max' => 'File size must not exceed 100MB',
            ]);

            $file = $request->file('file');

            if (!$file->isValid()) {
                return response()->json([
                    'error' => 'File upload failed: ' . $file->getErrorMessage()
                ], 422);
            }

            // Check file size
            $fileSizeMB = $file->getSize() / 1024 / 1024;
            Log::info("Uploading file: {$file->getClientOriginalName()}, Size: " . round($fileSizeMB, 2) . " MB");

            if ($fileSizeMB > 100) {
                return response()->json([
                    'error' => 'File size (' . round($fileSizeMB, 2) . ' MB) exceeds maximum allowed size of 100MB'
                ], 422);
            }

            // Read file content
            $content = file_get_contents($file->getRealPath());
            
            if ($content === false || empty($content)) {
                return response()->json(['error' => 'Cannot read file or file is empty'], 422);
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
                $request->user()->id,
                $file->getClientOriginalName(),
                $dataResult['processed_data'],
                $summary,                               // ✅ 5th
                $dataResult['upload_month']             // ✅ 6th
            );

            return response()->json([
                'success' => true,
                'message' => 'Report uploaded and saved successfully',
                'upload_id' => $upload->id,
                'records_processed' => count($dataResult['processed_data']),
                'accounts' => $summary['total_accounts'],
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => $e->validator->errors()->first()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Upload error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Processing failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function importFromS3(Request $request)
    {
        try {
            Log::info('S3 import request received');

            $request->validate([
                's3_key' => 'required|string',
            ]);

            $s3Key = $request->input('s3_key');

            // 1️⃣ Get file content from S3 (NO local storage)
            if (!Storage::disk('s3')->exists($s3Key)) {
                return response()->json([
                    'error' => 'File not found in S3'
                ], 404);
            }

            $content = Storage::disk('s3')->get($s3Key);

            if (empty($content)) {
                return response()->json([
                    'error' => 'S3 file is empty'
                ], 422);
            }

            // 2️⃣ Reuse your EXISTING pipeline
            $parsedCsv = $this->csvParser->parse($content);
            $columnMap = $this->csvParser->mapColumns($parsedCsv['headers']);

            $processResult = $this->csvParser->processRows(
                $parsedCsv['lines'],
                $parsedCsv['delimiter'],
                $parsedCsv['header_line_index'],
                $columnMap
            );

            $dataResult = $this->dataOperations->processData($processResult['raw_data']);
            $summary = $this->dataOperations->calculateSummary($dataResult['aggregated_data']);

            // 3️⃣ Save to DB (same as upload)
            $upload = $this->dataOperations->saveToDatabase(
                $request->user()->id,
                basename($s3Key),
                $dataResult['processed_data'],
                $summary,
                $dataResult['upload_month']
            );

            return response()->json([
                'success' => true,
                'message' => 'S3 report imported successfully',
                'upload_id' => $upload->id,
                'records_processed' => count($dataResult['processed_data']),
            ]);

        } catch (\Exception $e) {
            Log::error('S3 import error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'S3 import failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all uploaded reports with aggregated data
     */
    public function getAllReports(Request $request)
    {
        try {
            // ✅ CHANGE: Remove user ID parameter
            $data = $this->dataOperations->getAllReports();

            return response()->json([
                'success' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            Log::error('Get reports error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch reports: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get upload configuration limits
     */
    public function getUploadLimits()
    {
        $maxUpload = ini_get('upload_max_filesize');
        $maxPost = ini_get('post_max_size');
        
        return response()->json([
            'success' => true,
            'limits' => [
                'max_upload_size' => $maxUpload,
                'max_post_size' => $maxPost,
                'max_upload_mb' => $this->parseSize($maxUpload) / 1024 / 1024,
                'recommended_max_mb' => 100,
            ]
        ]);
    }

    /**
     * Parse size string to bytes
     */
    private function parseSize($size)
    {
        $unit = strtoupper(substr($size, -1));
        $value = (int) $size;
        
        switch($unit) {
            case 'G': return $value * 1024 * 1024 * 1024;
            case 'M': return $value * 1024 * 1024;
            case 'K': return $value * 1024;
            default: return $value;
        }
    }

    public function index(Request $request)
    {
        try {
            $perPage = (int) $request->query('per_page', 10);

            // ✅ CHANGE: Remove user ID parameter
            $data = $this->dataOperations->getAllReports($perPage);

            return response()->json($data);

        } catch (\Exception $e) {
            Log::error('Costs index error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'Failed to fetch costs'
            ], 500);
        }
    }

    public function monthlyTrend(Request $request)
{
    try {
        $user = $request->user();
        
        if (!$user) {
            Log::warning('monthlyTrend: No authenticated user');
            return response()->json([
                'error' => 'Unauthenticated'
            ], 401);
        }

        Log::info('monthlyTrend: Fetching data for user', ['user_id' => $user->id]);

        $rows = \DB::table('cost_records')
            ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
            //remove user id so that data can be show to all users
            ->whereNotNull('cost_records.month_year')
            ->where('cost_records.month_year', '!=', 'Unknown')
            ->where('cost_records.month_year', '!=', '')
            ->select(
                'cost_records.month_year',
                \DB::raw('SUM(cost_records.cost) as total_cost')
            )
            ->groupBy('cost_records.month_year')
            ->orderBy('cost_records.month_year')
            ->get();

        Log::info('monthlyTrend: Query executed', [
            'rows_count' => $rows->count(),
            'rows' => $rows->toArray()
        ]);

        $data = [];
        foreach ($rows as $row) {
            $data[] = [
                'month' => $row->month_year,
                'total_cost' => round((float) $row->total_cost, 2),
            ];
        }

        Log::info('monthlyTrend: Returning data', [
            'data_count' => count($data),
            'data' => $data
        ]);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);

    } catch (\Exception $e) {
        Log::error('monthlyTrend: Error occurred', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'error' => 'Failed to fetch monthly trend: ' . $e->getMessage()
        ], 500);
    }
}
}