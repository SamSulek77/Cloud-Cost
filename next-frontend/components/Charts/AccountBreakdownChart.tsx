'use client';

import '@/lib/recharts-fix';
import { useEffect, useState, useMemo, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
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
import { useChartData } from '@/lib/hooks/useChartData';
import { API_ENDPOINTS, CHART_COLORS } from '@/lib/constants';
import { AccountBreakdownPoint, ApiResponse } from '@/types';

const formatCurrency = (value: unknown, decimals = 2) => {
    const num = Number(value);
    if (isNaN(num)) return '$0.00';
    return `$${num.toFixed(decimals)}`;
};

export default function AccountBreakdownChart() {
    const { data: apiResponse, loading, error, refetch } = useChartData<ApiResponse<AccountBreakdownPoint[]>>(API_ENDPOINTS.ACCOUNT_BREAKDOWN);
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

    const hasInitialized = useRef(false);

    // Derived state for data and accounts list
    const { accountData, accounts } = useMemo(() => {
        if (!apiResponse?.data || !Array.isArray(apiResponse.data)) {
            return { accountData: [], accounts: [] };
        }

        const sortedData = apiResponse.data.sort((a, b) => {
            const dateA = new Date(a.month + ' 1');
            const dateB = new Date(b.month + ' 1');
            return dateA.getTime() - dateB.getTime();
        });

        const accountsList = apiResponse.accounts ?? [];
        return { accountData: sortedData, accounts: accountsList };
    }, [apiResponse]);

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

    return (
        <Card className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100">
                <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-gray-900">
                        Cost Breakdown by Account
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        Bar Chart - Multiple Accounts
                    </CardDescription>
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
                        <p className="mb-2">No data available</p>
                        <p className="text-sm">Upload a cost report to see account breakdown</p>
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
                                                        All accounts selected
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
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={accountData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#e5e7eb"
                                        strokeOpacity={0.5}
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        tickFormatter={(v) => v.slice(0, 3)}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        tickFormatter={(v) => formatCurrency(v, 0)}
                                    />
                                    <Tooltip
                                        formatter={(v) => formatCurrency(v)}
                                        contentStyle={{
                                            background: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                    <Legend verticalAlign="top" height={36} iconType="rect" />
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

            <CardFooter className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                Showing costs for {selectedAccounts.length} of {accounts.length} accounts
            </CardFooter>
        </Card>
    );
}