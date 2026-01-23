'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from '@/lib/axios';
import { API_ENDPOINTS, CHART_COLORS } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { ServiceCostItem, ApiResponse } from '@/types';
import { Filter, BarChart2, LineChart as LineChartIcon } from "lucide-react"
import { Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Cell } from "recharts"
import { Loader2 } from 'lucide-react';
import ServiceComparisonChart from '@/components/Charts/ServiceComparisonChart';
import ServiceCostBarChart from '@/components/Charts/ServiceCostBarChart';
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
                                <div className="h-[400px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        {chartType === 'line' ? (
                                            <LineChart data={[...monthlyTrend].sort((a, b) => new Date(a.browser).getTime() - new Date(b.browser).getTime())}>
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
                                            </LineChart>
                                        ) : (
                                            <BarChart data={[...monthlyTrend].sort((a, b) => new Date(a.browser).getTime() - new Date(b.browser).getTime())}>
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
                                                    onClick={(data) => handleChartClick(data)}
                                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                                >
                                                    {monthlyTrend.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                                    ))}
                                                </Bar>
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
