<?php

namespace App\CsvOperations;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class DateParser
{
    private array $dateFormats = [
        'd/m/Y',           // 31/05/2025
        'd-m-Y',           // 31-05-2025
        'Y-m-d',           // 2025-05-31
        'm/d/Y',           // 05/31/2025
        'd/m/Y H:i:s',     // 31/05/2025 23:59:00
        'Y-m-d H:i:s',     // 2025-05-31 23:59:00
    ];

    public function parse(string $dateString): Carbon
    {
        // Try each format
        foreach ($this->dateFormats as $format) {
            try {
                $dateObj = Carbon::createFromFormat($format, $dateString);
                if ($dateObj !== false) {
                    return $dateObj;
                }
            } catch (\Exception $e) {
                continue;
            }
        }
        
        // Try Carbon's auto-parse as last resort
        try {
            return Carbon::parse($dateString);
        } catch (\Exception $e) {
            throw new \Exception("Could not parse date: {$dateString}");
        }
    }

    /**
     * Parse date and return formatted data
     */
    public function parseWithFormats(string $dateString): array
    {
        try {
            $dateObj = $this->parse($dateString);
            
            return [
                'month_year' => $dateObj->format('F Y'),      // "November 2024"
                'month_short' => $dateObj->format('M Y'),     // "Nov 2024"
                'formatted' => $dateObj->format('Y-m-d'),     // "2024-11-30"
                'carbon' => $dateObj,
            ];
        } catch (\Exception $e) {
            Log::warning("Date parsing failed: {$dateString}", ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Get the latest date from an array of date strings
     */
    public function getLatestDate(array $dateStrings): ?Carbon
    {
        $latestDate = null;
        
        foreach ($dateStrings as $dateString) {
            try {
                $currentDate = $this->parse($dateString);
                if ($latestDate === null || $currentDate->gt($latestDate)) {
                    $latestDate = $currentDate;
                }
            } catch (\Exception $e) {
                Log::warning("Skipping invalid date: {$dateString}");
                continue;
            }
        }
        
        return $latestDate;
    }
}