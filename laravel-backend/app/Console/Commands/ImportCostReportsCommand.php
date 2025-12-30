<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\AwsS3Service;
use App\CsvOperations\CsvParser;
use App\CsvOperations\DateParser;
use App\DataOperations\CsvReportToData;
use App\Models\User;
use App\Models\CostUpload;
use Illuminate\Support\Facades\Log;

class ImportCostReportsCommand extends Command
{
    protected $signature = 'cost:import-all 
                            {--year= : Specific year to import (e.g., 2025)}
                            {--month= : Specific month to import (e.g., 1-12)}
                            {--force : Re-import even if already exists}';
    
    protected $description = 'Import cost reports from S3 (scans all years/months)';

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
        parent::__construct();
        $this->s3Service = $s3Service;
        $this->csvParser = $csvParser;
        $this->dateParser = $dateParser;
        $this->dataOperations = $dataOperations;
    }

    public function handle()
    {
        $year = $this->option('year');
        $month = $this->option('month');
        $force = $this->option('force');

        $this->info('🔍 Scanning S3 for cost reports...');
        $this->info('Bucket structure: cost-reports/{year}/{month}/');
        $this->newLine();

        try {
            $totalImported = 0;
            $totalSkipped = 0;
            $totalFailed = 0;

            if ($year && $month) {
                // Import specific month
                $this->info("📁 Importing: {$year}/{$month}");
                $result = $this->importMonth($year, $month, $force);
                $totalImported += $result['imported'];
                $totalSkipped += $result['skipped'];
                $totalFailed += $result['failed'];
            } elseif ($year) {
                // Import all months in a year
                $this->info("📁 Scanning year: {$year}");
                for ($m = 1; $m <= 12; $m++) {
                    $result = $this->importMonth($year, $m, $force);
                    $totalImported += $result['imported'];
                    $totalSkipped += $result['skipped'];
                    $totalFailed += $result['failed'];
                }
            } else {
                // Scan all years and months
                $years = $this->scanYears();
                
                if (empty($years)) {
                    $this->warn('No year folders found in S3');
                    return 0;
                }

                $this->info("📂 Found years: " . implode(', ', $years));
                $this->newLine();

                foreach ($years as $y) {
                    $this->info("📁 Scanning year: {$y}");
                    for ($m = 1; $m <= 12; $m++) {
                        $result = $this->importMonth($y, $m, $force);
                        $totalImported += $result['imported'];
                        $totalSkipped += $result['skipped'];
                        $totalFailed += $result['failed'];
                    }
                }
            }

            $this->newLine();
            $this->info('✅ Import completed!');
            $this->table(
                ['Status', 'Count'],
                [
                    ['Imported', $totalImported],
                    ['Skipped', $totalSkipped],
                    ['Failed', $totalFailed],
                ]
            );

            return 0;

        } catch (\Exception $e) {
            $this->error('❌ Import failed: ' . $e->getMessage());
            Log::error('Cost import error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return 1;
        }
    }

    /**
     * Scan for year folders in S3
     */
    private function scanYears(): array
    {
        try {
            $allFiles = $this->s3Service->listCsvFiles('cost-reports/');
            $years = [];

            foreach ($allFiles as $file) {
                // Extract year from path: cost-reports/2025/1/file.csv
                if (preg_match('#cost-reports/(\d{4})/#', $file['key'], $matches)) {
                    $year = $matches[1];
                    if (!in_array($year, $years)) {
                        $years[] = $year;
                    }
                }
            }

            sort($years);
            return $years;

        } catch (\Exception $e) {
            Log::error('Failed to scan years: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Import all files from a specific month
     */
    private function importMonth(int $year, int $month, bool $force = false): array
    {
        $imported = 0;
        $skipped = 0;
        $failed = 0;

        try {
            $prefix = "cost-reports/{$year}/{$month}/";
            $files = $this->s3Service->listCsvFiles($prefix);

            if (empty($files)) {
                // Don't show message for empty months
                return ['imported' => 0, 'skipped' => 0, 'failed' => 0];
            }

            $this->line("  📄 Found " . count($files) . " file(s) in {$year}/{$month}");

            foreach ($files as $file) {
                $filename = $file['filename'];
                $s3Key = $file['key'];

                // Check if already imported (unless force flag is set)
                if (!$force) {
                    $exists = CostUpload::where('filename', $filename)
                        ->where('month_year', $this->getMonthYear($year, $month))
                        ->exists();
                    
                    if ($exists) {
                        $this->line("    ⏭️  Skipped: {$filename} (already imported)");
                        $skipped++;
                        continue;
                    }
                }

                try {
                    $this->line("    ⬇️  Importing: {$filename}...");
                    $this->importFile($s3Key, $year, $month);
                    $this->info("    ✅ Imported: {$filename}");
                    $imported++;
                } catch (\Exception $e) {
                    $this->error("    ❌ Failed: {$filename} - " . $e->getMessage());
                    Log::error("Failed to import {$filename}", [
                        'error' => $e->getMessage()
                    ]);
                    $failed++;
                }
            }

        } catch (\Exception $e) {
            Log::warning("Failed to scan {$year}/{$month}: " . $e->getMessage());
        }

        return [
            'imported' => $imported,
            'skipped' => $skipped,
            'failed' => $failed,
        ];
    }

    /**
     * Import a single file
     */
    private function importFile(string $s3Key, int $year, int $month)
    {
        // Download file
        $content = $this->s3Service->downloadFile($s3Key);

        if (empty($content)) {
            throw new \Exception('Downloaded file is empty');
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

        // Get system user (first user)
        $systemUser = User::first();

        if (!$systemUser) {
            throw new \Exception('No user found in database');
        }

        // Save to database
        $this->dataOperations->saveToDatabase(
            $systemUser->id,
            basename($s3Key),
            $dataResult['processed_data'],
            $summary,
            $dataResult['upload_month']
        );
    }

    /**
     * Get month name from year and month number
     */
    private function getMonthYear(int $year, int $month): string
    {
        return date('F Y', strtotime("{$year}-{$month}-01"));
    }
}