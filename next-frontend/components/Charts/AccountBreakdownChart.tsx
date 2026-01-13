'use client';

import '@/lib/recharts-fix';
import { useEffect, useState, useMemo, useRef } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useChartData } from '@/lib/hooks/useChartData';
import { API_ENDPOINTS, CHART_COLORS } from '@/lib/constants';
import { AccountBreakdownPoint, ApiResponse } from '@/types';

const formatCurrency = (value: unknown, decimals = 2) => {
    const num = Number(value);
    if (isNaN(num)) return '$0.00';
    return `$${num.toFixed(decimals)}`;
};

interface AccountBreakdownChartProps {
    onFilterChange?: (filter: string) => void;
}

export default function AccountBreakdownChart({ onFilterChange }: AccountBreakdownChartProps) {
    const { data: apiResponse, loading, error, refetch } = useChartData<ApiResponse<AccountBreakdownPoint[]>>(API_ENDPOINTS.ACCOUNT_BREAKDOWN);
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

    // Simple Time Filter State
    const [timeFilter, setTimeFilter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');
    const [focusedMonth, setFocusedMonth] = useState<string | null>(null);

    const hasInitialized = useRef(false);
    const hasSetDefaultFilter = useRef(false);

    // Notify parent of filter change
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(timeFilter);
        }
    }, [timeFilter, onFilterChange]);

    // Auto-select latest quarter based on data
    useEffect(() => {
        if (apiResponse?.data && apiResponse.data.length > 0 && !hasSetDefaultFilter.current) {
            // Sort to find latest month
            const sortedData = [...apiResponse.data].sort((a, b) => {
                return new Date(a.month + ' 1').getTime() - new Date(b.month + ' 1').getTime();
            });
            const latestItem = sortedData[sortedData.length - 1];

            if (latestItem) {
                const date = new Date(latestItem.month + ' 1');
                const monthIndex = date.getMonth();

                let quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4' = 'Q1';
                if (monthIndex >= 0 && monthIndex <= 2) quarter = 'Q1';
                else if (monthIndex >= 3 && monthIndex <= 5) quarter = 'Q2';
                else if (monthIndex >= 6 && monthIndex <= 8) quarter = 'Q3';
                else quarter = 'Q4';

                setTimeFilter(quarter);
                hasSetDefaultFilter.current = true;
            }
        }
    }, [apiResponse]);

    // Derived state for data and accounts list
    const { accountData, accounts } = useMemo(() => {
        if (!apiResponse?.data || !Array.isArray(apiResponse.data)) {
            return { accountData: [], accounts: [] };
        }

        let processedData = apiResponse.data.sort((a, b) => {
            const dateA = new Date(a.month + ' 1');
            const dateB = new Date(b.month + ' 1');
            return dateA.getTime() - dateB.getTime();
        });

        // Apply Time Filter (only if not focused)
        if (!focusedMonth && timeFilter !== 'ALL') {
            processedData = processedData.filter(d => {
                const date = new Date(d.month + ' 1');
                const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec

                if (timeFilter === 'Q1') {
                    // Jan (0) to Mar (2)
                    return monthIndex >= 0 && monthIndex <= 2;
                } else if (timeFilter === 'Q2') {
                    // Apr (3) to Jun (5)
                    return monthIndex >= 3 && monthIndex <= 5;
                } else if (timeFilter === 'Q3') {
                    // Jul (6) to Sep (8)
                    return monthIndex >= 6 && monthIndex <= 8;
                } else {
                    // Oct (9) to Dec (11)
                    return monthIndex >= 9 && monthIndex <= 11;
                }
            });
        }

        // Apply Focus Filter
        if (focusedMonth) {
            processedData = processedData.filter(d => d.month === focusedMonth);
        }

        const accountsList = apiResponse.accounts ?? [];
        return { accountData: processedData, accounts: accountsList };
    }, [apiResponse, timeFilter, focusedMonth]);

    // Auto-select all accounts ONLY when first loaded
    useEffect(() => {
        if (accounts.length > 0 && !hasInitialized.current) {
            setSelectedAccounts(accounts);
            hasInitialized.current = true;
        }
    }, [accounts]);

    const toggleAccount = (account: string) => {
        setSelectedAccounts((prev) =>
            prev.includes(account) ? prev.filter((a) => a !== account) : [...prev, account]
        );
    };

    const selectAllAccounts = () => setSelectedAccounts(accounts);
    const deselectAllAccounts = () => setSelectedAccounts([]);

    const handleChartClick = (data: any) => {
        if (focusedMonth) {
            setFocusedMonth(null);
        } else if (data && data.activeLabel) {
            setFocusedMonth(data.activeLabel);
        }
    };

    return (
        <Card className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        Cost Breakdown
                        {focusedMonth && (
                            <span className="text-gray-400 font-normal">
                                / {focusedMonth}
                            </span>
                        )}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        {focusedMonth ? 'Showing detailed breakdown (Click chart to return)' : 'Bar Chart - Click on a month to expand details'}
                    </CardDescription>
                </div>

                <div className="flex items-center gap-2">
                    {focusedMonth ? (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setFocusedMonth(null)}
                            className="h-9 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                        >
                            Back to Overview
                        </Button>
                    ) : (
                        <div className="w-[200px]">
                            <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as any)}>
                                <SelectTrigger className="h-9 bg-white border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <SelectValue placeholder="Period" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Full Year</SelectItem>
                                    <SelectItem value="Q1">Quarter 1 (Jan-Mar)</SelectItem>
                                    <SelectItem value="Q2">Quarter 2 (Apr-Jun)</SelectItem>
                                    <SelectItem value="Q3">Quarter 3 (Jul-Sep)</SelectItem>
                                    <SelectItem value="Q4">Quarter 4 (Oct-Dec)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                {loading ? (
                    <div className="h-[450px] flex items-center justify-center text-gray-500">
                        Loading account breakdown...
                    </div>
                ) : error ? (
                    <div className="h-[450px] flex flex-col items-center justify-center text-red-500">
                        <p className="mb-2">{error}</p>
                        <button
                            onClick={refetch}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                        >
                            Retry
                        </button>
                    </div>
                ) : accountData.length === 0 ? (
                    <div className="h-[450px] flex flex-col items-center justify-center text-gray-500">
                        <p className="mb-2">No data available for this period</p>
                        <p className="text-sm">Try changing the time filter or uploading more reports</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Account Selector */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between min-h-[44px] h-auto py-2">
                                            <div className="flex flex-wrap gap-1 flex-1">
                                                {selectedAccounts.length === 0 ? (
                                                    <span className="text-gray-500 text-sm">Select accounts...</span>
                                                ) : selectedAccounts.length === accounts.length ? (
                                                    <Badge variant="secondary" className="text-xs">
                                                        All accounts selected ({accounts.length})
                                                    </Badge>
                                                ) : (
                                                    <>
                                                        {selectedAccounts.slice(0, 3).map((acc) => (
                                                            <Badge key={acc} variant="secondary" className="text-xs">
                                                                {acc}
                                                            </Badge>
                                                        ))}
                                                        {selectedAccounts.length > 3 && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                +{selectedAccounts.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <ChevronDown className="h-4 w-4 opacity-50 ml-2 shrink-0" />
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-[400px] p-0" align="start">
                                        <div className="px-3 py-2 border-b flex items-center justify-between bg-gray-50">
                                            <span className="text-xs font-medium text-gray-500">Select Accounts</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={selectAllAccounts}
                                                    className="text-xs px-2 py-1 rounded hover:bg-gray-100 text-blue-600 font-medium"
                                                >
                                                    Show All
                                                </button>
                                                <button
                                                    onClick={deselectAllAccounts}
                                                    className="text-xs px-2 py-1 rounded hover:bg-gray-100 text-blue-600 font-medium"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto p-2">
                                            {accounts.map((account, index) => (
                                                <div
                                                    key={account}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100 transition-colors ${selectedAccounts.includes(account)
                                                        ? 'bg-blue-50 hover:bg-blue-100'
                                                        : ''
                                                        }`}
                                                    onClick={() => toggleAccount(account)}
                                                >
                                                    <div
                                                        className="w-3 h-3 rounded flex-shrink-0"
                                                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                                                    />
                                                    <span className="text-sm flex-1">{account}</span>
                                                    {selectedAccounts.includes(account) && (
                                                        <span className="text-blue-600 text-xs">✓</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="h-[550px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={accountData}
                                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                    onClick={handleChartClick}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#7186b4ff"
                                        strokeOpacity={0.5}
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={16}
                                        tick={{ fill: '#060c18ff', fontSize: 13 }}
                                        tickFormatter={(v) => v.slice(0, 3)}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tick={{ fill: '#08152eff', fontSize: 14 }}
                                        tickFormatter={(v) => formatCurrency(v, 0)}
                                    />
                                    <Tooltip
                                        formatter={(v) => formatCurrency(v)}
                                        contentStyle={{
                                            background: 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(229, 231, 235, 0.3)',
                                            borderRadius: '12px',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                            padding: '8px 12px',
                                        }}
                                        itemStyle={{
                                            padding: '0px',
                                            fontSize: '11px',
                                            fontWeight: 500,
                                            lineHeight: '1.4'
                                        }}
                                        labelStyle={{
                                            fontWeight: 'bold',
                                            marginBottom: '6px',
                                            fontSize: '12px',
                                            color: '#1e293b'
                                        }}
                                        cursor={{ fill: 'rgba(113, 134, 180, 0.1)' }}
                                        wrapperStyle={{ pointerEvents: 'none', zIndex: 50 }}
                                    />
                                    <Legend verticalAlign="top" height={96} iconType="rect" />
                                    {selectedAccounts.map((account) => (
                                        <Bar
                                            key={account}
                                            dataKey={account}
                                            fill={CHART_COLORS[accounts.indexOf(account) % CHART_COLORS.length]}
                                            radius={[4, 4, 0, 0]}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="text-sm text-gray-500 border-t border-gray-100 pt-4 flex justify-between">
                <span>Showing costs for {selectedAccounts.length} of {accounts.length} accounts</span>
                <span>Period: {focusedMonth ? focusedMonth : (timeFilter === 'ALL' ? 'Full Year' :
                    timeFilter === 'Q1' ? 'Quarter 1 (Jan-Mar)' :
                        timeFilter === 'Q2' ? 'Quarter 2 (Apr-Jun)' :
                            timeFilter === 'Q3' ? 'Quarter 3 (Jul-Sep)' :
                                'Quarter 4 (Oct-Dec)')}</span>
            </CardFooter>
        </Card>
    );
}