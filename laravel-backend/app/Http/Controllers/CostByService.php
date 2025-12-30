<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class CostByService extends Controller
{
    /**
     * Get service costs grouped by account
     */
    public function serviceByAccount(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                Log::warning('serviceByAccount: No authenticated user');
                return response()->json([
                    'error' => 'Unauthenticated'
                ], 401);
            }

            Log::info('serviceByAccount: Fetching daxta for user', ['user_id' => $user->id]);

            // Get all records grouped by month, account, and service
            $rows = DB::table('cost_records')
                ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
                //remove user id to show data to all user
                ->whereNotNull('cost_records.product_code') // Only records with service info
                ->whereNotNull('cost_records.month_year')
                ->where('cost_records.month_year', '!=', 'Unknown')
                ->where('cost_records.month_year', '!=', '')
                ->select(
                    'cost_records.month_year',
                    'cost_records.account_name',
                    'cost_records.product_code',
                    'cost_records.product_name',
                    DB::raw('SUM(cost_records.cost) as total_cost'),
                    DB::raw('COUNT(*) as usage_count')
                )
                ->groupBy(
                    'cost_records.month_year',
                    'cost_records.account_name',
                    'cost_records.product_code',
                    'cost_records.product_name'
                )
                ->orderBy('cost_records.month_year')
                ->orderBy('total_cost', 'desc')
                ->get();

            Log::info('serviceByAccount: Query executed', [
                'rows_count' => $rows->count(),
            ]);

            // Group data for easier frontend consumption
            $groupedData = $this->groupServiceData($rows);

            return response()->json([
                'success' => true,
                'data' => $rows,
                'grouped' => $groupedData,
            ], 200);

        } catch (\Exception $e) {
            Log::error('serviceByAccount: Error fetching data', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'An error occurred while fetching service data',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get top services across all accounts
     */
    public function topServices(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'error' => 'Unauthenticated'
                ], 401);
            }

            $limit = $request->input('limit', 10);
            $monthYear = $request->input('month_year');

            $query = DB::table('cost_records')
                ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
                //remove user id to show data to all user
                ->whereNotNull('cost_records.product_code');

            if ($monthYear) {
                $query->where('cost_records.month_year', $monthYear);
            }

            $services = $query
                ->select(
                    'cost_records.product_code',
                    'cost_records.product_name',
                    DB::raw('SUM(cost_records.cost) as total_cost'),
                    DB::raw('COUNT(DISTINCT cost_records.account_name) as account_count'),
                    DB::raw('COUNT(*) as usage_count')
                )
                ->groupBy('cost_records.product_code', 'cost_records.product_name')
                ->orderBy('total_cost', 'desc')
                ->limit($limit)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $services,
                'total_cost' => $services->sum('total_cost'),
                'month_year' => $monthYear,
            ], 200);

        } catch (\Exception $e) {
            Log::error('topServices: Error', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'An error occurred while fetching top services',
            ], 500);
        }
    }

    /**
     * Get service costs for a specific account
     */
    public function servicesByAccount(Request $request, string $accountName)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'error' => 'Unauthenticated'
                ], 401);
            }

            $monthYear = $request->input('month_year');

            $query = DB::table('cost_records')
                ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
                //remove user id to show data to all user
                ->where('cost_records.account_name', $accountName)
                ->whereNotNull('cost_records.product_code');

            if ($monthYear) {
                $query->where('cost_records.month_year', $monthYear);
            }

            $services = $query
                ->select(
                    'cost_records.product_code',
                    'cost_records.product_name',
                    'cost_records.month_year',
                    DB::raw('SUM(cost_records.cost) as total_cost'),
                    DB::raw('COUNT(*) as usage_count')
                )
                ->groupBy(
                    'cost_records.product_code',
                    'cost_records.product_name',
                    'cost_records.month_year'
                )
                ->orderBy('total_cost', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'account_name' => $accountName,
                'month_year' => $monthYear,
                'data' => $services,
                'total_cost' => $services->sum('total_cost'),
            ], 200);

        } catch (\Exception $e) {
            Log::error('servicesByAccount: Error', [
                'error' => $e->getMessage(),
                'account' => $accountName,
            ]);

            return response()->json([
                'success' => false,
                'error' => 'An error occurred while fetching account services',
            ], 500);
        }
    }

    /**
     * Get service cost trends over time
     */
    public function serviceTrends(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'error' => 'Unauthenticated'
                ], 401);
            }

            $productCode = $request->input('product_code');
            $accountName = $request->input('account_name');

            $query = DB::table('cost_records')
                ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
                //remove user id to show data to all user
                ->whereNotNull('cost_records.product_code');

            if ($productCode) {
                $query->where('cost_records.product_code', $productCode);
            }

            if ($accountName) {
                $query->where('cost_records.account_name', $accountName);
            }

            $trends = $query
                ->select(
                    'cost_records.month_year',
                    'cost_records.product_code',
                    'cost_records.product_name',
                    DB::raw('SUM(cost_records.cost) as total_cost')
                )
                ->groupBy(
                    'cost_records.month_year',
                    'cost_records.product_code',
                    'cost_records.product_name'
                )
                ->orderBy('cost_records.month_year')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $trends,
                'filters' => [
                    'product_code' => $productCode,
                    'account_name' => $accountName,
                ],
            ], 200);

        } catch (\Exception $e) {
            Log::error('serviceTrends: Error', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'An error occurred while fetching service trends',
            ], 500);
        }
    }

    /**
     * Helper method to group service data by different dimensions
     */
    private function groupServiceData($rows)
    {
        $byMonth = [];
        $byAccount = [];
        $byService = [];

        foreach ($rows as $row) {
            // Group by month
            if (!isset($byMonth[$row->month_year])) {
                $byMonth[$row->month_year] = [];
            }
            $byMonth[$row->month_year][] = $row;

            // Group by account
            if (!isset($byAccount[$row->account_name])) {
                $byAccount[$row->account_name] = [];
            }
            $byAccount[$row->account_name][] = $row;

            // Group by service
            if (!isset($byService[$row->product_code])) {
                $byService[$row->product_code] = [
                    'product_code' => $row->product_code,
                    'product_name' => $row->product_name,
                    'total_cost' => 0,
                    'months' => [],
                ];
            }
            $byService[$row->product_code]['total_cost'] += $row->total_cost;
            $byService[$row->product_code]['months'][] = $row;
        }

        return [
            'by_month' => $byMonth,
            'by_account' => $byAccount,
            'by_service' => array_values($byService),
        ];
    }

    /**
     * Get available months with service data
     */
    public function availableMonths(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'error' => 'Unauthenticated'
                ], 401);
            }

            $months = DB::table('cost_records')
                ->join('cost_uploads', 'cost_records.upload_id', '=', 'cost_uploads.id')
                //remove user id to show data to all user
                ->whereNotNull('cost_records.product_code')
                ->whereNotNull('cost_records.month_year')
                ->where('cost_records.month_year', '!=', 'Unknown')
                ->where('cost_records.month_year', '!=', '')
                ->select('cost_records.month_year')
                ->distinct()
                ->orderBy('cost_records.month_year')
                ->pluck('month_year');

            return response()->json([
                'success' => true,
                'data' => $months,
            ], 200);

        } catch (\Exception $e) {
            Log::error('availableMonths: Error', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'An error occurred while fetching available months',
            ], 500);
        }
    }
}