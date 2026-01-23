'use client';

import '@/lib/recharts-fix';
import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import {
    Area,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import { useChartData } from '@/lib/hooks/useChartData';
import { API_ENDPOINTS } from '@/lib/constants';
import { ChartPoint, ApiResponse } from '@/types';

const formatCurrency = (value: unknown, decimals = 2) => {
    const num = Number(value);
    if (isNaN(num)) return '$0.00';
    return `$${num.toFixed(decimals)}`;
};

export default function MonthlyTrendChart() {
    const { data: apiResponse, loading, error, refetch } = useChartData<ApiResponse<ChartPoint[]>>(API_ENDPOINTS.MONTHLY_TREND);

    const chartData = useMemo(() => {
        if (!apiResponse?.data || !Array.isArray(apiResponse.data)) return [];

        return apiResponse.data
            .map((item: any) => ({
                month: item.month,
                total_cost: Number(item.total_cost),
            }))
            .sort((a, b) => {
                const dateA = new Date(a.month + ' 1');
                const dateB = new Date(b.month + ' 1');
                return dateA.getTime() - dateB.getTime();
            });
    }, [apiResponse]);

    const totalCost = useMemo(() => {
        if (chartData.length === 0) return 0;
        return chartData.reduce((sum, item) => sum + item.total_cost, 0);
    }, [chartData]);

    const trendPercentage = useMemo(() => {
        if (chartData.length < 2) return 0;
        const lastMonth = chartData[chartData.length - 1].total_cost;
        const previousMonth = chartData[chartData.length - 2].total_cost;
        if (previousMonth === 0) return 0;
        return (((lastMonth - previousMonth) / previousMonth) * 100).toFixed(1);
    }, [chartData]);

    return (
        <Card className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100">
                <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-gray-900">
                        Monthly AWS Cost Trend
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        Total cost: {formatCurrency(totalCost)}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="h-[350px] flex items-center justify-center text-gray-500">
                        Loading chart...
                    </div>
                ) : error ? (
                    <div className="h-[350px] flex flex-col items-center justify-center text-red-500">
                        <p className="mb-2">{error}</p>
                        <button
                            onClick={refetch}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                        >
                            Retry
                        </button>
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="h-[350px] flex flex-col items-center justify-center text-gray-500">
                        <p className="mb-2">No data available</p>
                        <p className="text-sm">Upload a cost report to see your monthly trends</p>
                    </div>
                ) : (
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                                <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => formatCurrency(v, 0)} />
                                <Tooltip
                                    formatter={(v: number) => formatCurrency(v)}
                                    contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.7)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(229, 231, 235, 0.3)',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        padding: '8px 12px'
                                    }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                                    labelStyle={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b', marginBottom: '4px' }}
                                    wrapperStyle={{ pointerEvents: 'none', zIndex: 50 }}
                                />
                                <Area type="monotone" dataKey="total_cost" stroke="#3b82f6" strokeWidth={2} fill="url(#fillCost)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
            {!loading && !error && chartData.length > 0 && (
                <CardFooter className="flex-col items-start gap-2 text-sm border-t border-gray-100 pt-4">
                    <div className="flex gap-2 font-medium leading-none text-gray-900">
                        Trending {Number(trendPercentage) > 0 ? 'up' : 'down'} by{' '}
                        {Math.abs(Number(trendPercentage))}% this month
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="leading-none text-gray-500">
                        Showing total costs for the last {chartData.length} months
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}