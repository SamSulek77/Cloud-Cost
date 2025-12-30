<?php

namespace App\DataOperations;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\CostUpload;
use App\Models\CostRecord;
use App\CsvOperations\DateParser;

class CsvReportToData
{
    private DateParser $dateParser;

    public function __construct(DateParser $dateParser)
    {
        $this->dateParser = $dateParser;
    }

    /**
     * Process raw CSV data and prepare for database insertion
     */
    public function processData(array $rawData): array
    {
        $processedData = [];
        $aggregatedData = [];
        $allDates = [];

        foreach ($rawData as $index => $record) {
            try {
                $dateInfo = $this->dateParser->parseWithFormats($record['end_date']);
                
                // Store everything in one record including product info
                $processedData[] = [
                    'account_name' => $record['account'],
                    'product_code' => $record['product_code'] ?? null,
                    'product_name' => $record['product_name'] ?? null,
                    'usage_end_date' => $dateInfo['formatted'],
                    'month_year' => $dateInfo['month_year'],
                    'cost' => $record['cost'],
                ];

                $allDates[] = $record['end_date'];

                // Aggregate by account and month
                $key = "{$record['account']}|{$dateInfo['month_year']}";
                if (!isset($aggregatedData[$key])) {
                    $aggregatedData[$key] = [
                        'account_name' => $record['account'],
                        'month' => $dateInfo['month_year'],
                        'total_cost' => 0,
                        'record_count' => 0,
                    ];
                }
                $aggregatedData[$key]['total_cost'] += $record['cost'];
                $aggregatedData[$key]['record_count']++;

            } catch (\Exception $e) {
                Log::warning("Skipping record {$index}: " . $e->getMessage());
                continue;
            }
        }

        // Determine upload month from latest date
        $uploadMonth = 'Unknown';
        if (!empty($allDates)) {
            $latestDate = $this->dateParser->getLatestDate($allDates);
            if ($latestDate !== null) {
                $uploadMonth = $latestDate->format('F Y');
            }
        }

        return [
            'processed_data' => $processedData,
            'aggregated_data' => array_values($aggregatedData),
            'upload_month' => $uploadMonth,
        ];
    }

    /**
     * Calculate summary statistics
     */
    public function calculateSummary(array $aggregatedData): array
    {
        $totalCost = 0;
        $accountCosts = [];
        $uniqueAccounts = [];

        foreach ($aggregatedData as $item) {
            $totalCost += $item['total_cost'];
            if (!isset($accountCosts[$item['account_name']])) {
                $accountCosts[$item['account_name']] = 0;
                $uniqueAccounts[] = $item['account_name'];
            }
            $accountCosts[$item['account_name']] += $item['total_cost'];
        }
        arsort($accountCosts);

        return [
            'total_cost' => round($totalCost, 2),
            'total_records' => array_sum(array_column($aggregatedData, 'record_count')),
            'total_accounts' => count($uniqueAccounts),
            'unique_accounts' => $uniqueAccounts,
            'cost_by_account' => $accountCosts,
        ];
    }

    /**
     * Save data to database
     * 
     * @param int|null $userId User ID or null for system imports
     */
    public function saveToDatabase(
        ?int $userId,
        string $filename,
        array $processedData,
        array $summary,
        string $uploadMonth
    ): CostUpload {
        DB::beginTransaction();
        
        try {
            // Log sample record
            if (!empty($processedData)) {
                Log::info("Sample record being saved:", [
                    'first_record' => $processedData[0],
                    'total_to_save' => count($processedData),
                ]);
            }

            // Create upload record
            $upload = CostUpload::create([
                'user_id' => $userId,
                'filename' => $filename,
                'month_year' => $uploadMonth,
                'total_cost' => $summary['total_cost'],
                'total_records' => count($processedData),
                'total_accounts' => $summary['total_accounts'],
                'uploaded_at' => now(),
            ]);

            Log::info("Upload record created", [
                'upload_id' => $upload->id,
            ]);

            // Prepare records for batch insert (includes product_code and product_name)
            $recordsToInsert = array_map(function($record) use ($upload) {
                return [
                    'upload_id' => $upload->id,
                    'account_name' => $record['account_name'],
                    'product_code' => $record['product_code'] ?? null,
                    'product_name' => $record['product_name'] ?? null,
                    'usage_end_date' => $record['usage_end_date'],
                    'month_year' => $record['month_year'],
                    'cost' => $record['cost'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }, $processedData);

            Log::info("Prepared records for insertion", [
                'count' => count($recordsToInsert),
            ]);

            // Insert in chunks for better performance
            $inserted = 0;
            foreach (array_chunk($recordsToInsert, 1000) as $chunkIndex => $chunk) {
                CostRecord::insert($chunk);
                $inserted += count($chunk);
                
                Log::info("Inserted chunk", [
                    'chunk_number' => $chunkIndex + 1,
                    'chunk_size' => count($chunk),
                    'total_inserted' => $inserted,
                ]);
            }

            DB::commit();

            Log::info("Data saved successfully", [
                'upload_id' => $upload->id,
                'records_saved' => $inserted,
            ]);

            return $upload;

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Database save failed', [
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString()
            ]);
            
            throw $e;
        }
    }

    /**
     * Get all reports - visible to all users
     */
    public function getAllReports(int $perPage = 10): array
    {
        // Show all uploads, regardless of user
        $uploads = CostUpload::query()
            ->orderBy('uploaded_at', 'desc')
            ->paginate($perPage);

        // Raw records (paginated) - no user filter
        $rawRecords = DB::table('cost_records')
            ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
            ->select(
                'cost_records.account_name as LinkedAccountName',
                'cost_records.usage_end_date as UsageEndDate',
                'cost_records.month_year as Month',
                'cost_records.cost as TotalCost'
            )
            ->orderBy('cost_records.usage_end_date', 'desc')
            ->paginate($perPage);

        // Aggregated data (not paginated) - no user filter
        $aggregatedData = DB::table('cost_records')
            ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
            ->select(
                'cost_records.account_name',
                'cost_records.month_year as month',
                DB::raw('SUM(cost_records.cost) as total_cost'),
                DB::raw('COUNT(*) as record_count')
            )
            ->groupBy('cost_records.account_name', 'cost_records.month_year')
            ->orderBy('cost_records.month_year')
            ->get();

        // Summary
        $totalCost = $aggregatedData->sum('total_cost');
        $totalRecords = $rawRecords->total();
        $uniqueAccounts = $aggregatedData->pluck('account_name')->unique();

        $costByAccount = [];
        foreach ($aggregatedData as $record) {
            $costByAccount[$record->account_name] =
                ($costByAccount[$record->account_name] ?? 0) + $record->total_cost;
        }
        arsort($costByAccount);

        return [
            'uploads' => $uploads,
            'raw_data' => $rawRecords,
            'aggregated_data' => $aggregatedData,
            'summary' => [
                'total_cost' => round($totalCost, 2),
                'total_records' => $totalRecords,
                'total_uploads' => $uploads->total(),
                'total_accounts' => $uniqueAccounts->count(),
                'unique_accounts' => $uniqueAccounts->values(),
                'cost_by_account' => $costByAccount,
            ]
        ];
    }
}