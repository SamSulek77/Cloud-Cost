import { formatCurrency } from '@/lib/utils';
// const formatCurrency = (value: unknown, decimals = 2) => { ... } removed

import '@/lib/recharts-fix';
import { useMemo, useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import {
    Area,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
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
import { ForecastControl } from './ForecastControl';
import axiosInstance from '@/lib/axios';
import axios from 'axios';

interface ForecastResponse {
    success: boolean;
    forecast_month: string;
    forecast_cost: number;
}



export default function MonthlyTrendChart() {
    const { data: apiResponse, loading, error, refetch } = useChartData<ApiResponse<ChartPoint[]>>(API_ENDPOINTS.MONTHLY_TREND);

    // FORECAST STATE
    const [showForecast, setShowForecast] = useState(false);
    const [baseline, setBaseline] = useState(1000);
    const [forecastData, setForecastData] = useState<{ month: string; cost: number } | null>(null);

    // Fetch Forecast
    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const res = await axiosInstance.get<ForecastResponse>('/aws/cost-report/forecast');
                if (res.data.success) {
                    setForecastData({
                        month: res.data.forecast_month,
                        cost: res.data.forecast_cost
                    });
                }
            } catch (err) {
                console.error("Failed to fetch forecast", err);
            }
        };
        fetchForecast();
    }, []);

    const chartData = useMemo(() => {
        if (!apiResponse?.data || !Array.isArray(apiResponse.data)) return [];

        let data = apiResponse.data
            .map((item: ChartPoint) => ({
                month: item.month,
                total_cost: Number(item.total_cost),
                // Add a flag to distinguish real data
                isForecast: false
            }))
            .sort((a, b) => {
                const dateA = new Date(a.month + ' 1');
                const dateB = new Date(b.month + ' 1');
                return dateA.getTime() - dateB.getTime();
            });

        // Append Forecast if enabled
        if (showForecast && forecastData) {
            data = [...data, {
                month: forecastData.month + ' (Est)',
                total_cost: forecastData.cost,
                isForecast: true
            }];
        }

        return data;
    }, [apiResponse, showForecast, forecastData]);

    const totalCost = useMemo(() => {
        if (!apiResponse?.data) return 0;
        return apiResponse.data.reduce((sum, item) => sum + Number(item.total_cost), 0);
    }, [apiResponse]);

    const trendPercentage = useMemo(() => {
        if (chartData.length < 2) return 0;
        const lastMonth = chartData[chartData.length - 1].total_cost;
        const previousMonth = chartData[chartData.length - 2].total_cost;
        if (previousMonth === 0) return 0;
        return (((lastMonth - previousMonth) / previousMonth) * 100).toFixed(1);
    }, [chartData]);

    const maxCost = useMemo(() => {
        if (chartData.length === 0) return 2000;
        return Math.max(...chartData.map(d => d.total_cost));
    }, [chartData]);

    // Auto-set initial baseline to average if data exists (user experience improvement)
    // Also load from localStorage if available
    useEffect(() => {
        const savedBaseline = localStorage.getItem('aws_cost_baseline');
        const savedShowForecast = localStorage.getItem('aws_show_forecast');

        if (savedBaseline) {
            setBaseline(Number(savedBaseline));
        } else if (chartData.length > 0 && baseline === 1000) {
            setBaseline(Math.round(totalCost / (chartData.length || 1)));
        }

        if (savedShowForecast === 'true') {
            setShowForecast(true);
        }
    }, [totalCost]); // Only run when totalCost changes (initial load)

    // Save baseline to localStorage whenever it changes
    const handleSetBaseline = (val: number) => {
        setBaseline(val);
        localStorage.setItem('aws_cost_baseline', val.toString());
    };

    // Save toggle to localStorage
    const handleSetShowForecast = (show: boolean) => {
        setShowForecast(show);
        localStorage.setItem('aws_show_forecast', show.toString());
    };

    // Calculate Latest MOnth Status
    const latestMonthStatus = useMemo(() => {
        if (!apiResponse?.data || apiResponse.data.length === 0) return null;

        // Find latest actual data point
        const sortedData = [...apiResponse.data].sort((a, b) => {
            return new Date(a.month + ' 1').getTime() - new Date(b.month + ' 1').getTime();
        });
        const lastMonth = sortedData[sortedData.length - 1];
        const lastCost = Number(lastMonth.total_cost);

        if (showForecast && lastCost > baseline) {
            return {
                isOver: true,
                month: lastMonth.month,
                cost: lastCost,
                diff: lastCost - baseline
            };
        }
        return null;
    }, [apiResponse, baseline, showForecast]);

    return (
        <Card className="bg-white shadow-sm transition-all duration-300">
            <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between">
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
                {/* LATEST MONTH ALERT */}
                {latestMonthStatus && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-center gap-2 text-sm text-red-700 animate-in fade-in slide-in-from-top-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>
                            <strong>Alert:</strong> {latestMonthStatus.month} cost ({formatCurrency(latestMonthStatus.cost)})
                            exceeds budget by <strong>{formatCurrency(latestMonthStatus.diff)}</strong>.
                        </span>
                    </div>
                )}

                <div className="mb-6">
                    <ForecastControl
                        showForecast={showForecast}
                        setShowForecast={handleSetShowForecast}
                        baseline={baseline}
                        setBaseline={handleSetBaseline}
                        maxBudget={maxCost}
                        forecastValue={forecastData?.cost || 0}
                    />
                </div>

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
                                    {/* Gradient for Forecast */}
                                    <linearGradient id="fillForecast" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
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
                                />

                                {/* Base Cost Area */}
                                <Area
                                    type="monotone"
                                    dataKey="total_cost"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fill="url(#fillCost)"
                                />

                                {/* Interactive Baseline */}
                                {showForecast && (
                                    <ReferenceLine
                                        y={baseline}
                                        label={{ position: 'insideTopRight', value: 'Budget Baseline', fill: 'red', fontSize: 12 }}
                                        stroke="red"
                                        strokeDasharray="3 3"
                                    />
                                )}
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