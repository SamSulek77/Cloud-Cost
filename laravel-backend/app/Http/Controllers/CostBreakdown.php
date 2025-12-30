<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\CsvOperations\CsvParser;
use App\CsvOperations\DateParser;
use App\DataOperations\CsvReportToData;

class CostBreakdown extends Controller
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

    public function accountBreakdown(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                Log::warning('accountBreakdown: No authenticated user');
                return response()->json([
                    'error' => 'Unauthenticated'
                ], 401);
            }

            Log::info('accountBreakdown: Fetching data for user', ['user_id' => $user->id]);

            // Get all records grouped by month and account
            $rows = \DB::table('cost_records')
                ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
                ->where('cost_uploads.user_id', $user->id)
                ->whereNotNull('cost_records.month_year')
                ->where('cost_records.month_year', '!=', 'Unknown')
                ->where('cost_records.month_year', '!=', '')
                ->select(
                    'cost_records.month_year',
                    'cost_records.account_name',
                    \DB::raw('SUM(cost_records.cost) as total_cost')
                )
                ->groupBy('cost_records.month_year', 'cost_records.account_name')
                ->orderBy('cost_records.month_year')
                ->orderBy('cost_records.account_name')
                ->get();

            Log::info('accountBreakdown: Query executed', [
                'rows_count' => $rows->count(),
            ]);

            // Transform data to format suitable for stacked area chart
            // Result: [
            //   { month: "January 2025", "Account-A": 1234, "Account-B": 5678 },
            //   { month: "February 2025", "Account-A": 2345, "Account-B": 6789 }
            // ]
            
            $monthlyData = [];
            $accounts = [];

            foreach ($rows as $row) {
                $month = $row->month_year;
                $account = $row->account_name;
                $cost = round((float) $row->total_cost, 2);

                // Track unique accounts
                if (!in_array($account, $accounts)) {
                    $accounts[] = $account;
                }

                // Initialize month if not exists
                if (!isset($monthlyData[$month])) {
                    $monthlyData[$month] = ['month' => $month];
                }

                // Add account cost to this month
                $monthlyData[$month][$account] = $cost;
            }

            // Convert to array and fill missing accounts with 0
            $data = [];
            foreach ($monthlyData as $monthData) {
                $row = ['month' => $monthData['month']];
                
                // Ensure all accounts are present (fill with 0 if missing)
                foreach ($accounts as $account) {
                    $row[$account] = $monthData[$account] ?? 0;
                }
                
                $data[] = $row;
            }

            Log::info('accountBreakdown: Returning data', [
                'data_count' => count($data),
                'accounts' => $accounts,
            ]);

            return response()->json([
                'success' => true,
                'data' => $data,
                'accounts' => $accounts, // List of account names for the chart
            ]);

        } catch (\Exception $e) {
            Log::error('accountBreakdown: Error occurred', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Failed to fetch account breakdown: ' . $e->getMessage()
            ], 500);
        }
    }
}