<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Services\AwsS3Service;
use App\CsvOperations\CsvParser;
use App\DataOperations\CsvReportToData;
use App\Models\CostUpload;

class ImportS3Reports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-s3-reports';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check S3 for new cost reports and import them';

    private AwsS3Service $s3Service;
    private CsvParser $csvParser;
    private CsvReportToData $dataOperations;

    public function __construct(
        AwsS3Service $s3Service,
        CsvParser $csvParser,
        CsvReportToData $dataOperations
    ) {
        parent::__construct();
        $this->s3Service = $s3Service;
        $this->csvParser = $csvParser;
        $this->dataOperations = $dataOperations;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting S3 Cost Report Import...');
        
        try {
            // 1. List files in S3
            $files = $this->s3Service->listCsvFiles('cost-reports/');
            
            if (empty($files)) {
                $this->info('No files found in S3.');
                return;
            }

            $this->info('Found ' . count($files) . ' files in S3. Checking for new files...');

            $newFilesCount = 0;

            foreach ($files as $file) {
                $s3Key = $file['key'];
                $filename = basename($s3Key);

                // 2. Check if file already imported
                if (CostUpload::where('filename', $filename)->exists()) {
                    $this->comment("Skipping existing file: {$filename}");
                    continue;
                }

                $this->info("Importing new file: {$filename}...");

                try {
                    // 3. Download
                    $content = $this->s3Service->downloadFile($s3Key);
                    
                    if (empty($content)) {
                        $this->error("File is empty: {$filename}");
                        continue;
                    }

                    // 4. Parse & Process (Logic reused from Controller)
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

                    // 5. Save to Database (User ID is NULL for automated system imports)
                    $this->dataOperations->saveToDatabase(
                        null, 
                        $filename,
                        $dataResult['processed_data'],
                        $summary,
                        $dataResult['upload_month']
                    );

                    $this->info("Successfully imported: {$filename}");
                    Log::info("Scheduler imported: {$filename}");
                    $newFilesCount++;

                } catch (\Exception $e) {
                    $this->error("Failed to import {$filename}: " . $e->getMessage());
                    Log::error("Scheduler failed to import {$filename}", ['error' => $e->getMessage()]);
                }
            }

            if ($newFilesCount === 0) {
                $this->info('No new files to import.');
            } else {
                $this->info("Import process completed. Imported {$newFilesCount} new files.");
            }

        } catch (\Exception $e) {
            $this->error('Critical error in S3 Import Scheduler: ' . $e->getMessage());
            Log::error('Critical error in S3 Import Scheduler', ['error' => $e->getMessage()]);
        }
    }
}
