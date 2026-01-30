'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from '@/lib/axios';
import { API_ENDPOINTS, CHART_COLORS } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { ServiceCostItem, ApiResponse } from '@/types';
import { Filter, BarChart2, LineChart as LineChartIcon, TrendingUp, Loader2 } from "lucide-react"
import { Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Cell, ReferenceLine } from "recharts"
import ServiceComparisonChart from '@/components/Charts/ServiceComparisonChart';
import ServiceCostBarChart from '@/components/Charts/ServiceCostBarChart';
import { ForecastControl } from '@/components/Charts/ForecastControl';
import CostInvestigationPanel from '@/components/Overlays/CostInvestigationPanel';
import DashboardLayout from '@/components/Layoutpage/SideBarLayout';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SyncStatus } from '@/components/Sync/SyncStatus';
import { formatCurrency } from "@/lib/utils";

export default function ServiceAnalysisPage() {
    const { user, loading: authLoading } = useAuth();

    // State
    const [accounts, setAccounts] = useState<string[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string>('');

    const [services, setServices] = useState<ServiceCostItem[]>([]);
    const [selectedService, setSelectedService] = useState<string>('');
    const [selectedServiceData, setSelectedServiceData] = useState<ServiceCostItem | null>(null);

    const [comparisonView, setComparisonView] = useState<'grouped' | 'legacy'>('grouped');

    const [monthlyTrend, setMonthlyTrend] = useState<any[]>([]);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [investigationParams, setInvestigationParams] = useState<{
        serviceName: string;
        productCode: string;
        monthA: string;
        monthB: string;
        accountName?: string | null;
    } | null>(null);

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // FORECASTING STATE
    const [showForecast, setShowForecast] = useState(false);
    const [baseline, setBaseline] = useState(100); // Default baseline
    const [forecastData, setForecastData] = useState<{ month: string; cost: number } | null>(null);

    // Load Baseline/Config settings per service
    useEffect(() => {
        if (!selectedAccount || !selectedService) return;

        const storageKey = `baseline_${selectedAccount}_${selectedService}`;
        const savedBaseline = localStorage.getItem(storageKey);

        if (savedBaseline) {
            setBaseline(Number(savedBaseline));
        } else {
            // Calculate average as default if no saved baseline
            if (monthlyTrend.length > 0) {
                const avg = monthlyTrend.reduce((sum, item) => sum + Number(item.visitors), 0) / monthlyTrend.length;
                setBaseline(Math.round(avg));
            } else {
                setBaseline(100);
            }
        }

        // We can choose to persist toggle globally or per service. Globally seems better for UX.
        const savedShowForecast = localStorage.getItem('aws_show_forecast');
        if (savedShowForecast === 'true') setShowForecast(true); // Reuse global preference

    }, [selectedAccount, selectedService, monthlyTrend]);

    const handleSetBaseline = (val: number) => {
        setBaseline(val);
        if (selectedAccount && selectedService) {
            const storageKey = `baseline_${selectedAccount}_${selectedService}`;
            localStorage.setItem(storageKey, val.toString());
        }
    };

    const handleSetShowForecast = (show: boolean) => {
        setShowForecast(show);
        localStorage.setItem('aws_show_forecast', show.toString());
    };

    // Fetch Forecast Data
    useEffect(() => {
        const fetchForecast = async () => {
            if (!selectedAccount || !selectedService) return;

            try {
                const res = await axios.get('/aws/cost-report/forecast', {
                    params: {
                        account: selectedAccount,
                        product_code: selectedService
                    }
                });

                if (res.data.success) {
                    setForecastData({
                        month: res.data.forecast_month,
                        cost: res.data.forecast_cost
                    });
                } else {
                    setForecastData(null);
                }
            } catch (err) {
                console.error("Failed to fetch forecast for service", err);
                setForecastData(null);
            }
        };

        fetchForecast();
    }, [selectedAccount, selectedService]);

    // Prepare chart data with forecast
    const chartDataWithForecast = useMemo(() => {
        const sorted = [...monthlyTrend].sort((a, b) => new Date(a.browser).getTime() - new Date(b.browser).getTime());

        if (showForecast && forecastData) {
            return [
                ...sorted,
                {
                    browser: forecastData.month + ' (Est)',
                    visitors: forecastData.cost,
                    fill: '#8b5cf6', // Purple for forecast
                    isForecast: true
                }
            ];
        }
        return sorted;
    }, [monthlyTrend, showForecast, forecastData]);

    // Calculate Latest Month Status for Alert
    const latestMonthStatus = useMemo(() => {
        if (!monthlyTrend || monthlyTrend.length === 0) return null;

        // Find latest actual data point
        const sortedData = [...monthlyTrend].sort((a, b) => {
            return new Date(a.browser).getTime() - new Date(b.browser).getTime();
        });
        const lastMonth = sortedData[sortedData.length - 1];
        const lastCost = Number(lastMonth.visitors);

        if (showForecast && lastCost > baseline) {
            return {
                isOver: true,
                month: lastMonth.browser,
                cost: lastCost,
                diff: lastCost - baseline
            };
        }
        return null;
    }, [monthlyTrend, baseline, showForecast]);

    // Helper to find previous month
    const getPreviousMonth = (currentMonth: string, allData: any[]) => {
        // Data is sorted in logic, but let's ensure we work on sorted list
        const sorted = [...allData].sort((a, b) => new Date(a.browser).getTime() - new Date(b.browser).getTime());
        const idx = sorted.findIndex(item => item.browser === currentMonth);
        return idx > 0 ? sorted[idx - 1].browser : null;
    };

    const handleChartClick = (data: any) => {
        if (!selectedService || !selectedAccount) return;

        const currentMonth = data.browser || data.payload?.browser; // Handling different event structures if any
        if (!currentMonth) return;

        const prevMonth = getPreviousMonth(currentMonth, monthlyTrend);

        if (prevMonth) {
            setInvestigationParams({
                serviceName: selectedServiceData?.product_name || selectedService,
                productCode: selectedService,
                monthA: prevMonth,
                monthB: currentMonth,
                accountName: selectedAccount
            });
        } else {
            // Optional: Alert user or toast that comparison isn't possible for first month
            alert("Cannot investigate the first month (no previous month to compare).");
        }
    };

    // Listen for Cloud Sync event to auto-refresh data
    useEffect(() => {
        const handleDataUpdate = () => {
            setRefreshTrigger(prev => prev + 1);
        };

        window.addEventListener('cost-data-updated', handleDataUpdate);
        return () => {
            window.removeEventListener('cost-data-updated', handleDataUpdate);
        };
    }, []);

    // 1. Fetch Accounts on Mount
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get<ApiResponse<any>>(API_ENDPOINTS.ACCOUNT_BREAKDOWN, {
                    params: { _t: new Date().getTime() },
                    headers: { 'Cache-Control': 'no-cache' }
                });
                if (response.data.success && response.data.accounts) {
                    setAccounts(response.data.accounts);
                    if (response.data.accounts.length > 0) {
                        setSelectedAccount(response.data.accounts[0]);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch accounts:', err);
            }
        };

        fetchAccounts();
    }, [refreshTrigger]);

    // 2. Fetch Services when Account Changes
    useEffect(() => {
        const fetchServices = async () => {
            if (!selectedAccount) return;

            setLoading(true);
            try {
                const response = await axios.get<ApiResponse<ServiceCostItem[]>>(
                    `${API_ENDPOINTS.SERVICE_DETAILS}/${encodeURIComponent(selectedAccount)}`, {
                    params: { _t: new Date().getTime() },
                    headers: { 'Cache-Control': 'no-cache' }
                }
                );

                if (response.data.success) {
                    const uniqueServicesMap = new Map();
                    response.data.data.forEach(item => {
                        if (!uniqueServicesMap.has(item.product_code)) {
                            uniqueServicesMap.set(item.product_code, item);
                        }
                    });
                    const uniqueServices = Array.from(uniqueServicesMap.values());

                    setServices(uniqueServices);
                    if (uniqueServices.length > 0) {
                        setSelectedService(uniqueServices[0].product_code);
                    } else {
                        setSelectedService('');
                    }
                }
            } catch (err) {
                setError('Failed to fetch services');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [selectedAccount, refreshTrigger]);

    // 3. Fetch Trend Data when Service Changes
    useEffect(() => {
        const fetchTrend = async () => {
            if (!selectedAccount || !selectedService) return;

            setLoading(true);
            try {
                const response = await axios.get<ApiResponse<any[]>>(API_ENDPOINTS.SERVICE_TRENDS, {
                    params: {
                        account_name: selectedAccount,
                        product_code: selectedService,
                        _t: new Date().getTime()
                    },
                    headers: { 'Cache-Control': 'no-cache' }
                });

                if (response.data.success) {
                    // Map data for the chart with colors
                    const mappedData = response.data.data.map((item: any, index: number) => ({
                        browser: item.month_year, // Mapping month to 'browser' (label) to match desired internal structure
                        visitors: Number(item.total_cost),
                        fill: CHART_COLORS[index % CHART_COLORS.length]
                    }));

                    setMonthlyTrend(mappedData);

                    const serviceDetails = services.find(s => s.product_code === selectedService);
                    setSelectedServiceData(serviceDetails || null);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrend();
    }, [selectedAccount, selectedService, services, refreshTrigger]);

    if (authLoading) {
        // ...
    }

    return (
        <DashboardLayout user={user}>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Service Analysis</h2>
                    <p className="text-gray-500 mt-1">
                        Analyze cost distribution and cost investigation for specific AWS services per account.
                    </p>
                    <SyncStatus />
                </div>

                {/* Service Cost Breakdown Section with Toggle */}
                <div id="service-comparison-section" className="space-y-2">
                    <div className="flex justify-end">
                        <Tabs value={comparisonView} onValueChange={(v) => setComparisonView(v as 'grouped' | 'legacy')} className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="grouped">Monthly Trend</TabsTrigger>
                                <TabsTrigger value="legacy">Ranked Overview</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {comparisonView === 'grouped' ? (
                        <div id="service-comparison">
                            <ServiceComparisonChart />
                        </div>
                    ) : (
                        <div id="service-breakdown-legacy">
                            <ServiceCostBarChart />
                        </div>
                    )}
                </div>


                {/* Content Area */}
                {loading ? (
                    <div className="h-96 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : (
                    <div className="space-y-4" id="cost-trends">
                        {/* Line Chart */}
                        <Card className="border border-gray-200 shadow-sm bg-white">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-semibold">Service Costs Trends</CardTitle>
                                        <CardDescription className="text-sm text-gray-500">
                                            Monthly cost progression for {selectedServiceData?.product_name}, click to the month to view cost investigation.
                                        </CardDescription>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Tabs value={chartType} onValueChange={(v) => setChartType(v as 'line' | 'bar')} className="w-[160px]">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="line" className="text-xs">
                                                    <LineChartIcon className="w-3 h-3 mr-1" />
                                                    Line
                                                </TabsTrigger>
                                                <TabsTrigger value="bar" className="text-xs">
                                                    <BarChart2 className="w-3 h-3 mr-1" />
                                                    Bar
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>

                                        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select account" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {accounts.map((acc) => (
                                                    <SelectItem key={acc} value={acc}>
                                                        {acc}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Select value={selectedService} onValueChange={setSelectedService} disabled={!selectedAccount}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select service" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[400px]">
                                                {services.map((svc) => (
                                                    <SelectItem key={svc.product_code} value={svc.product_code}>
                                                        {svc.product_name || svc.product_code}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
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
                                    {selectedAccount && selectedService && (
                                        <ForecastControl
                                            showForecast={showForecast}
                                            setShowForecast={handleSetShowForecast}
                                            baseline={baseline}
                                            setBaseline={handleSetBaseline}
                                            maxBudget={Math.max(
                                                ...(monthlyTrend.length > 0 ? monthlyTrend.map(d => Number(d.visitors)) : [100]),
                                                forecastData?.cost || 0
                                            )}
                                            forecastValue={forecastData?.cost || 0}
                                        />
                                    )}
                                </div>

                                <div className="h-[400px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        {chartType === 'line' ? (
                                            <LineChart data={chartDataWithForecast}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                <XAxis
                                                    dataKey="browser"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                                    dy={10}
                                                    interval={0} // Force show all labels
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                                    tickFormatter={(value) => `$${value}`}
                                                />
                                                <Tooltip
                                                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cost']}
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="visitors"
                                                    stroke="#8b5cf6"
                                                    strokeWidth={3}
                                                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4, stroke: '#fff', cursor: 'pointer' }}
                                                    activeDot={{ r: 6, strokeWidth: 0, onClick: (_: any, payload: any) => handleChartClick(payload.payload), cursor: 'pointer' }}
                                                />
                                                {/* Forecast Line Segment (Dashed) */}
                                                {showForecast && forecastData && chartDataWithForecast.length > 1 && (
                                                    <Line
                                                        type="monotone"
                                                        dataKey="visitors"
                                                        stroke="#8b5cf6"
                                                        strokeWidth={3}
                                                        strokeDasharray="5 5"
                                                        data={[
                                                            chartDataWithForecast[chartDataWithForecast.length - 2],
                                                            chartDataWithForecast[chartDataWithForecast.length - 1]
                                                        ]}
                                                        dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                                                    />
                                                )}
                                                {showForecast && (
                                                    <ReferenceLine
                                                        y={baseline}
                                                        label={{ position: 'insideTopRight', value: 'Budget Baseline', fill: 'red', fontSize: 12 }}
                                                        stroke="red"
                                                        strokeDasharray="3 3"
                                                    />
                                                )}
                                            </LineChart>
                                        ) : (
                                            <BarChart data={chartDataWithForecast}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                <XAxis
                                                    dataKey="browser"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                                    dy={10}
                                                    interval={0} // Force show all labels
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                                    tickFormatter={(value) => `$${value}`}
                                                />
                                                <Tooltip
                                                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cost']}
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Bar
                                                    dataKey="visitors"
                                                    radius={[4, 4, 0, 0]}
                                                    onClick={(data) => !data.isForecast && handleChartClick(data)} // Disable click for forecast
                                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                                >
                                                    {chartDataWithForecast.map((entry: any, index: number) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={entry.isForecast ? '#8b5cf6' : CHART_COLORS[index % CHART_COLORS.length]}
                                                            opacity={entry.isForecast ? 0.5 : 1}
                                                        />
                                                    ))}
                                                </Bar>
                                                {showForecast && (
                                                    <ReferenceLine
                                                        y={baseline}
                                                        label={{ position: 'insideTopRight', value: 'Budget Baseline', fill: 'red', fontSize: 12 }}
                                                        stroke="red"
                                                        strokeDasharray="3 3"
                                                    />
                                                )}
                                            </BarChart>
                                        )}
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
            <CostInvestigationPanel
                isOpen={!!investigationParams}
                onClose={() => setInvestigationParams(null)}
                {...(investigationParams || {
                    serviceName: '',
                    productCode: '',
                    monthA: '',
                    monthB: ''
                })}
            />
        </DashboardLayout >
    );
}
