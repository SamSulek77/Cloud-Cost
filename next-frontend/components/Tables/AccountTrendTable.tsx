'use client';

import { useState, useMemo, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter,
    CardDescription,
} from '@/components/ui/card';
import { useChartData } from '@/lib/hooks/useChartData';
import { API_ENDPOINTS } from '@/lib/constants';
import { AccountBreakdownPoint, ApiResponse } from '@/types';
import { Loader2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function AccountTrendTable() {
    //fetch data
    const { data: apiResponse, loading } =
        useChartData<ApiResponse<AccountBreakdownPoint[]>>(API_ENDPOINTS.ACCOUNT_BREAKDOWN);
    //filter
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [isFiltering, setIsFiltering] = useState(false);

    const handleMonthChange = (value: string) => {
        setIsFiltering(true);
        setSelectedMonth(value);
        setTimeout(() => setIsFiltering(false), 500);
    };

    //process data
    const { months, tableData, totalCurrentCost, totalChangePercent } = useMemo(() => {
        if (!apiResponse?.data) return { months: [], tableData: [], totalCurrentCost: 0, totalChangePercent: 0 };

        // Sort months chronologically
        const headerMonths = [...new Set(apiResponse.data.map(item => item.month))].sort((a, b) => {
            return new Date(a + ' 1').getTime() - new Date(b + ' 1').getTime();
        });

        const accountsList = apiResponse.accounts || [];

        // Find index of selected month
        const currentIndex = headerMonths.indexOf(selectedMonth);
        const previousMonth = currentIndex > 0 ? headerMonths[currentIndex - 1] : null;

        const currentMonthData = apiResponse.data.find(d => d.month === selectedMonth);
        const previousMonthData = previousMonth ? apiResponse.data.find(d => d.month === previousMonth) : null;

        let grandTotalCurrent = 0;
        let grandTotalPrevious = 0;

        const rows = accountsList.map(account => {
            const currentCost = Number(currentMonthData?.[account] || 0);
            const previousCost = Number(previousMonthData?.[account] || 0);
            const change = previousCost > 0 ? ((currentCost - previousCost) / previousCost) * 100 : 0;

            grandTotalCurrent += currentCost;
            grandTotalPrevious += previousCost;

            // Trend Data: Last 6 months up to selected month
            const trendStartIndex = Math.max(0, currentIndex - 5);
            const trendMonths = headerMonths.slice(trendStartIndex, currentIndex + 1);

            const trendData = trendMonths.map(m => {
                const mData = apiResponse.data.find(d => d.month === m);
                return { value: Number(mData?.[account] || 0) };
            });

            return {
                accountName: account,
                current: currentCost,
                previous: previousCost,
                change: change,
                trend: trendData
            };
        }).sort((a, b) => b.current - a.current);

        const totalChange = grandTotalPrevious > 0 ? ((grandTotalCurrent - grandTotalPrevious) / grandTotalPrevious) * 100 : 0;

        return {
            months: headerMonths,
            tableData: rows,
            totalCurrentCost: grandTotalCurrent,
            totalChangePercent: totalChange
        };
    }, [apiResponse, selectedMonth]);

    // Auto-select latest month on load
    useEffect(() => {
        if (months.length > 0 && !selectedMonth) {
            const latestMonth = months[months.length - 1];
            if (selectedMonth !== latestMonth) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setSelectedMonth(latestMonth);
            }
        }
    }, [months, selectedMonth]);

    if (loading) {
        return <div className="p-8 text-center text-gray-400 text-sm">Loading trend data...</div>;
    }

    return (
        <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-900">Account Trends</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Comprehensive view of account spending with monthly trends.
                        </CardDescription>
                    </div>

                    <Select value={selectedMonth} onValueChange={handleMonthChange}>
                        <SelectTrigger className="w-[160px] h-9 text-xs">
                            <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={month} className="text-xs">
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-100 hover:bg-transparent">
                            <TableHead className="w-[30%] text-xs font-medium text-gray-500 uppercase tracking-wider">Account</TableHead>
                            <TableHead className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current</TableHead>
                            <TableHead className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</TableHead>
                            <TableHead className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</TableHead>
                            <TableHead className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Trend</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isFiltering ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-gray-400 text-sm">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                    Updating...
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData.map((row, idx) => (
                                <TableRow key={row.accountName} className="hover:bg-gray-50 border-gray-50">
                                    <TableCell className="font-medium text-sm text-gray-900 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`h-2 w-2 rounded-full ${idx % 3 === 0 ? 'bg-blue-400' : idx % 3 === 1 ? 'bg-green-400' : 'bg-orange-400'}`} />
                                            <span className="truncate max-w-[250px]" title={row.accountName}>{row.accountName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-gray-900 font-semibold">
                                        ${row.current.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-gray-500">
                                        ${row.previous.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.change >= 0 ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                                            {row.change > 0 ? '+' : ''}{row.change.toFixed(1)}%
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-2">
                                        <div className="h-10 w-[120px] ml-auto">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={row.trend}>
                                                    <Line
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke={row.change >= 0 ? "#ef4444" : "#10b981"}
                                                        strokeWidth={2}
                                                        dot={false}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4 pb-4">
                <div className="text-xs text-gray-400">
                    Showing top {tableData.length} accounts
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500">Period Total:</span>
                    <span className="font-bold text-gray-900">${totalCurrentCost.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${totalChangePercent >= 0 ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                        {totalChangePercent > 0 ? '↗' : '↘'} {Math.abs(totalChangePercent).toFixed(1)}%
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}
