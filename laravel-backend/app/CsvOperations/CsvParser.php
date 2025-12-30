<?php

namespace App\CsvOperations;

use Illuminate\Support\Facades\Log;

class CsvParser
{
    /**
     * Detect CSV delimiter
     */
    public function detectDelimiter(string $content): string
    {
        $delimiters = [',', ';', "\t", '|'];
        $delimiter = ',';
        $maxCount = 0;
        $sample = substr($content, 0, 2000);
        
        foreach ($delimiters as $del) {
            $count = substr_count($sample, $del);
            if ($count > $maxCount) {
                $maxCount = $count;
                $delimiter = $del;
            }
        }
        return $delimiter;
    }

    /**
     * Parse CSV content and return structured data
     */
    public function parse(string $content): array
    {
        // Remove BOM if present
        $content = str_replace("\xEF\xBB\xBF", '', $content);
        
        $delimiter = $this->detectDelimiter($content);
        $lines = explode("\n", $content);
        
        if (empty($lines)) {
            throw new \Exception('No lines found in file');
        }

        // Detect and skip warning line if present
        $headerLineIndex = $this->detectHeaderLine($lines);
        
        if (count($lines) <= $headerLineIndex) {
            throw new \Exception('CSV file has no data rows');
        }

        // Parse headers
        $headers = str_getcsv($lines[$headerLineIndex], $delimiter);
        $headers = array_map('trim', $headers);
        
        Log::info('CSV Headers found:', ['headers' => array_slice($headers, 0, 10)]);

        return [
            'headers' => $headers,
            'lines' => $lines,
            'delimiter' => $delimiter,
            'header_line_index' => $headerLineIndex,
        ];
    }

    /**
     * Detect the actual header line (skip warning messages)
     */
    private function detectHeaderLine(array $lines): int
    {
        $firstLine = trim($lines[0]);
        
        // Check if first line is a warning/message (not real headers)
        if (strpos($firstLine, 'Don\'t see your tags') !== false || 
            strpos($firstLine, 'tags are excluded') !== false ||
            strpos($firstLine, 'New tags are excluded') !== false ||
            strlen($firstLine) > 500) {
            Log::info('Skipping warning line at row 1, using row 2 as headers');
            return 1;
        }
        
        return 0;
    }

    /**
     * Map CSV columns to required fields
     */
   
    public function mapColumns(array $headers): array
    {
        Log::info('CSV Headers:', ['headers' => array_slice($headers, 0, 15)]);
        
        $candidates = [
            'account' => [
                'LinkedAccountName',
                'lineItem/LinkedAccountName',
                'linked_account_name',
            ],
            'end' => [
                'UsageEndDate',
                'lineItem/UsageEndDate',
                'usage_end_date',
            ],
            'cost' => [
                'TotalCost',
                'total_cost',
            ],
            'product_code' => [
                'ProductCode',
                'lineItem/ProductCode',
                'product_code',
            ],
            'product_name' => [
                'ProductName',
                'lineItem/ProductName',
                'product_name',
            ],
        ];

        $map = [];
        $requiredFields = ['account', 'end', 'cost']; // ProductCode/Name are optional
        
        foreach ($candidates as $key => $possibleColumns) {
            foreach ($possibleColumns as $column) {
                foreach ($headers as $index => $header) {
                    if (strcasecmp($header, $column) === 0) {
                        $map[$key] = $index;
                        Log::info("Mapped '{$key}' to column '{$header}' at index {$index}");
                        break 2;
                    }
                }
            }
            
            // Only throw error for required fields
            if (!isset($map[$key]) && in_array($key, $requiredFields)) {
                $availableHeaders = implode(', ', array_slice($headers, 0, 15));
                $lookingFor = implode(', ', $possibleColumns);
                
                throw new \Exception(
                    "Cannot find required column for '{$key}'. " .
                    "Looking for EXACT match of one of: [{$lookingFor}]. " .
                    "Available columns in your CSV: [{$availableHeaders}]. " .
                    "Column names must match exactly (case-insensitive)."
                );
            }
        }
        
        return $map;
    }

    /**
     * Process CSV rows and extract data
     */
    /**
     * Process CSV rows and extract data
     */
    public function processRows(
        array $lines,
        string $delimiter,
        int $headerLineIndex,
        array $columnMap
    ): array {
        $rawData = [];
        $skippedLines = 0;
        $processedLines = 0;

        Log::info("Processing CSV", [
            'total_lines' => count($lines),
            'header_line' => $headerLineIndex,
            'data_starts_at' => $headerLineIndex + 1,
        ]);

        for ($i = $headerLineIndex + 1; $i < count($lines); $i++) {
            $line = trim($lines[$i]);
            if (empty($line)) {
                $skippedLines++;
                continue;
            }
            
            $row = str_getcsv($line, $delimiter);
            
            // Debug first few rows
            if ($i <= $headerLineIndex + 3) {
                Log::info("Row {$i} data", [
                    'columns' => count($row),
                    'account_value' => $row[$columnMap['account']] ?? 'MISSING',
                    'end_value' => $row[$columnMap['end']] ?? 'MISSING',
                    'cost_value' => $row[$columnMap['cost']] ?? 'MISSING',
                    'product_code_value' => isset($columnMap['product_code']) ? ($row[$columnMap['product_code']] ?? 'MISSING') : 'NOT_MAPPED',
                    'product_name_value' => isset($columnMap['product_name']) ? ($row[$columnMap['product_name']] ?? 'MISSING') : 'NOT_MAPPED',
                ]);
            }
            
            $maxIndex = max(
                $columnMap['account'],
                $columnMap['end'],
                $columnMap['cost'],
                $columnMap['product_code'] ?? 0,
                $columnMap['product_name'] ?? 0
            );
            
            if (count($row) <= $maxIndex) {
                Log::warning("Row {$i}: Not enough columns", [
                    'has' => count($row),
                    'needs' => $maxIndex + 1
                ]);
                $skippedLines++;
                continue;
            }

            $account = isset($row[$columnMap['account']]) ? trim($row[$columnMap['account']]) : null;
            $end = isset($row[$columnMap['end']]) ? trim($row[$columnMap['end']]) : null;
            $costRaw = isset($row[$columnMap['cost']]) ? trim($row[$columnMap['cost']]) : '0';
            $cost = floatval(str_replace(',', '', $costRaw));
            
            // Extract ProductCode and ProductName (optional fields)
            $productCode = isset($columnMap['product_code']) && isset($row[$columnMap['product_code']]) 
                ? trim($row[$columnMap['product_code']]) 
                : null;
            $productName = isset($columnMap['product_name']) && isset($row[$columnMap['product_name']]) 
                ? trim($row[$columnMap['product_name']]) 
                : null;

            // Validate required data
            if (!$account) {
                Log::warning("Row {$i}: Missing account");
                $skippedLines++;
                continue;
            }
            
            if (!$end) {
                Log::warning("Row {$i}: Missing end date");
                $skippedLines++;
                continue;
            }
            
            if ($cost < 0) {
                Log::warning("Row {$i}: Negative cost, skipping");
                $skippedLines++;
                continue;
            }

            // Add to results
            $rawData[] = [
                'account' => $account,
                'end_date' => $end,
                'cost' => $cost,
                'product_code' => $productCode,
                'product_name' => $productName,
            ];
            
            $processedLines++;
        }

        Log::info("Data processing complete", [
            'total_lines' => count($lines),
            'skipped_lines' => $skippedLines,
            'processed_lines' => $processedLines,
            'raw_records' => count($rawData)
        ]);

        if (empty($rawData)) {
            throw new \Exception(
                'No valid data found in CSV. Check the logs for details. ' .
                'Make sure your CSV has: account names, dates, and cost values'
            );
        }

        return [
            'raw_data' => $rawData,
            'skipped_lines' => $skippedLines,
            'processed_lines' => $processedLines,
        ];
    }
}