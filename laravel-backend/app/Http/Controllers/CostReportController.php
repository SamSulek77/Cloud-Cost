<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CostReportController extends Controller
{
    /**
     * Upload and process AWS Cost Report CSV
     */
    public function uploadReport(Request $request)
    {
        try {
            Log::info('Upload request received');

            $validator = Validator::make($request->all(), [
                'file' => 'required|file|mimes:csv,txt|max:51200' // Max 50MB for large reports
            ]);

            if ($validator->fails()) {
                Log::error('Validation failed', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $file = $request->file('file');
            
            Log::info('Processing file', [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize()
            ]);

            $data = $this->parseCSV($file);
            
            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Report processed successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Upload error', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ]);
            
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Parse CSV and extract required data
     */
    private function parseCSV($file)
{
    $path = $file->getRealPath();
    $content = file_get_contents($path);
    
    // Remove BOM if present
    $content = str_replace("\xEF\xBB\xBF", '', $content);
    
    // Detect delimiter
    $delimiters = [',', ';', "\t", '|'];
    $delimiter = ',';
    $maxCount = 0;
    
    foreach ($delimiters as $del) {
        $count = substr_count(substr($content, 0, 1000), $del);
        if ($count > $maxCount) {
            $maxCount = $count;
            $delimiter = $del;
        }
    }
    
    Log::info("Detected delimiter: " . ($delimiter == "\t" ? "TAB" : $delimiter));
    
    // Parse with detected delimiter
    $lines = explode("\n", $content);
    if (empty($lines)) {
        throw new \Exception('File is empty');
    }
    
    // Get headers from first line
    $headerLine = $lines[0];
    $headers = str_getcsv($headerLine, $delimiter);
    
    // Clean headers
    $headers = array_map(function($h) {
        return trim($h);
    }, $headers);
    
    Log::info('Total columns found: ' . count($headers));
    Log::info('First 30 column names:', array_slice($headers, 0, 30));
    
    // Find columns
    $accountCol = false;
    $costCol = false;
    $dateCol = false;
    
    foreach ($headers as $index => $header) {
        $cleanHeader = strtolower(trim($header));
        
        if (stripos($header, 'LinkedAccount') !== false || 
            stripos($header, 'linked_account') !== false ||
            $cleanHeader == 'linkedaccountname') {
            $accountCol = $index;
            Log::info("Found account column at index $index: '$header'");
        }
        
        if (stripos($header, 'TotalCost') !== false || 
            stripos($header, 'total_cost') !== false ||
            $cleanHeader == 'totalcost') {
            $costCol = $index;
            Log::info("Found cost column at index $index: '$header'");
        }
        
        if (stripos($header, 'UsageEndDate') !== false || 
            stripos($header, 'usage_end_date') !== false ||
            $cleanHeader == 'usageenddate') {
            $dateCol = $index;
            Log::info("Found date column at index $index: '$header'");
        }
    }
    
    if ($accountCol === false || $costCol === false || $dateCol === false) {
        // Show all column names for debugging
        $allColumns = '';
        foreach ($headers as $i => $h) {
            $allColumns .= "[$i] '$h', ";
        }
        
        throw new \Exception(
            "Required columns not found.\n" .
            "Looking for: LinkedAccountName, TotalCost, UsageEndDate\n" .
            "All columns: $allColumns"
        );
    }
    
    Log::info("Using columns - Account: $accountCol, Cost: $costCol, Date: $dateCol");
    
    $data = [];
    $rowNum = 0;
    $skipped = 0;
    
    // Process data rows (skip header)
    for ($i = 1; $i < count($lines); $i++) {
        $line = trim($lines[$i]);
        if (empty($line)) {
            continue;
        }
        
        $row = str_getcsv($line, $delimiter);
        $rowNum++;
        
        if (count($row) <= max($accountCol, $costCol, $dateCol)) {
            $skipped++;
            continue;
        }
        
        $account = trim($row[$accountCol] ?? '');
        $cost = trim($row[$costCol] ?? '0');
        $date = trim($row[$dateCol] ?? '');
        
        // Log first few rows for debugging
        if ($rowNum <= 3) {
            Log::info("Row $rowNum - Account: '$account', Cost: '$cost', Date: '$date'");
        }
        
        if (empty($account) || empty($date) || $cost == '0' || $cost == '') {
            $skipped++;
            continue;
        }
        
        $costFloat = floatval(str_replace(',', '', $cost));
        
        try {
            $month = Carbon::parse($date)->format('F Y');
        } catch (\Exception $e) {
            $month = 'Unknown';
        }
        
        $key = $account . '|' . $month;
        
        if (!isset($data[$key])) {
            $data[$key] = [
                'account_name' => $account,
                'month' => $month,
                'total_cost' => 0
            ];
        }
        
        $data[$key]['total_cost'] += $costFloat;
    }
    
    Log::info("Processed $rowNum rows, skipped $skipped rows, found " . count($data) . " unique entries");
    
    if (empty($data)) {
        throw new \Exception("No valid data found. Processed $rowNum rows, all were skipped.");
    }
    
    $result = array_values($data);
    
    // Calculate summary
    $totalCost = 0;
    $accounts = [];
    
    foreach ($result as $item) {
        $totalCost += $item['total_cost'];
        $accounts[$item['account_name']] = 
            ($accounts[$item['account_name']] ?? 0) + $item['total_cost'];
    }
    
    arsort($accounts);
    
    return [
        'details' => $result,
        'summary' => [
            'total_cost' => round($totalCost, 2),
            'total_accounts' => count($accounts),
            'cost_by_account' => $accounts
        ]
    ];
}

    /**
     * Find column index by trying multiple possible names
     */
    private function findColumnIndex($headers, $possibleNames)
    {
        foreach ($possibleNames as $name) {
            $index = array_search($name, $headers);
            if ($index !== false) {
                return $index;
            }
            
            // Case-insensitive search
            foreach ($headers as $i => $header) {
                if (strcasecmp($header, $name) === 0) {
                    return $i;
                }
            }
        }
        return false;
    }
    
    /**
     * Calculate summary statistics
     */
    private function calculateSummary($data)
    {
        $totalCost = 0;
        $accountCosts = [];
        $monthlyCosts = [];
        
        foreach ($data as $item) {
            $totalCost += $item['total_cost'];
            
            // By account
            if (!isset($accountCosts[$item['account_name']])) {
                $accountCosts[$item['account_name']] = 0;
            }
            $accountCosts[$item['account_name']] += $item['total_cost'];
            
            // By month
            if (!isset($monthlyCosts[$item['month']])) {
                $monthlyCosts[$item['month']] = 0;
            }
            $monthlyCosts[$item['month']] += $item['total_cost'];
        }
        
        // Sort accounts by cost (descending)
        arsort($accountCosts);
        
        return [
            'total_cost' => round($totalCost, 2),
            'total_accounts' => count($accountCosts),
            'cost_by_account' => $accountCosts,
            'cost_by_month' => $monthlyCosts
        ];
    }
}