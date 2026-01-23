<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CostInvestigationController extends Controller
{
    /**
     * Compare service costs between two months with granular usage details
     */
    public function compare(Request $request)
    {
        try {
            $request->validate([
                'product_code' => 'required|string',
                'month_a' => 'required|string', // Previous Month (e.g. "November 2025")
                'month_b' => 'required|string', // Current Month (e.g. "December 2025")
                'account_name' => 'nullable|string',
            ]);

            $productCode = $request->input('product_code');
            $monthA = $request->input('month_a');
            $monthB = $request->input('month_b');
            $accountName = $request->input('account_name');

            Log::info('Cost Investigation Request', [
                'product_code' => $productCode,
                'month_a' => $monthA, // e.g. "August 2025"
                'month_b' => $monthB,
                'account_name' => $accountName,
            ]);

            // 1. Fetch usage data for both months
            $usageData = DB::table('cost_records')
                ->select(
                    'usage_type',
                    'month_year',
                    DB::raw('SUM(cost) as total_cost'),
                    DB::raw('SUM(usage_quantity) as total_quantity')
                )
                ->where(function($query) use ($productCode) {
                    $query->where('product_code', $productCode)
                          ->orWhere('product_name', $productCode);
                })
                ->whereIn('month_year', [$monthA, $monthB])
                ->when($accountName, function ($query) use ($accountName) {
                    return $query->where('account_name', $accountName);
                })
                ->groupBy('usage_type', 'month_year');
            
            Log::info('Query SQL', ['sql' => $usageData->toSql(), 'bindings' => $usageData->getBindings()]);
            
            $usageData = $usageData->get();

            // 2. Process into comparison map
            $comparison = [];

            foreach ($usageData as $row) {
                // Determine display name for usage type
                $type = $row->usage_type ?: 'Standard Usage';
                
                if (!isset($comparison[$type])) {
                    $comparison[$type] = [
                        'usage_type' => $type,
                        'cost_a' => 0,
                        'cost_b' => 0,
                        'quantity_a' => 0,
                        'quantity_b' => 0,
                    ];
                }

                if ($row->month_year === $monthA) {
                    $comparison[$type]['cost_a'] = (float) $row->total_cost;
                    $comparison[$type]['quantity_a'] = (float) $row->total_quantity;
                } else {
                    $comparison[$type]['cost_b'] = (float) $row->total_cost;
                    $comparison[$type]['quantity_b'] = (float) $row->total_quantity;
                }
            }

            // 3. Calculate Deltas and Format Result
            $results = [];
            $totalCostA = 0;
            $totalCostB = 0;

            foreach ($comparison as $type => $data) {
                $costDiff = $data['cost_b'] - $data['cost_a'];
                $quantityDiff = $data['quantity_b'] - $data['quantity_a'];
                
                // Calculate percentage change
                $percentChange = 0;
                if ($data['cost_a'] > 0) {
                    $percentChange = ($costDiff / $data['cost_a']) * 100;
                } elseif ($data['cost_b'] > 0) {
                    $percentChange = 100; // New cost
                }

                $results[] = [
                    'usage_type' => $type,
                    'cost_a' => $data['cost_a'],
                    'cost_b' => $data['cost_b'],
                    'cost_change' => $costDiff,
                    'percent_change' => $percentChange,
                    'quantity_a' => $data['quantity_a'],
                    'quantity_b' => $data['quantity_b'],
                    'quantity_change' => $quantityDiff,
                    'is_new' => ($data['cost_a'] == 0 && $data['cost_b'] > 0)
                ];

                $totalCostA += $data['cost_a'];
                $totalCostB += $data['cost_b'];
            }

            // 4. Sort by biggest cost increase
            usort($results, function ($a, $b) {
                return $b['cost_change'] <=> $a['cost_change'];
            });

            return response()->json([
                'success' => true,
                'data' => $results,
                'summary' => [
                    'month_a' => $monthA,
                    'month_b' => $monthB,
                    'total_cost_a' => $totalCostA,
                    'total_cost_b' => $totalCostB,
                    'total_change' => $totalCostB - $totalCostA,
                    'total_percent_change' => $totalCostA > 0 ? (($totalCostB - $totalCostA) / $totalCostA) * 100 : 0
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Cost Investigation Error', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'error' => 'Failed to compare costs: ' . $e->getMessage()
            ], 500);
        }
    }
}
