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
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function AccountCostTable() {
    //fetch data
    const { data: apiResponse, loading } =
        useChartData<ApiResponse<AccountBreakdownPoint[]>>(API_ENDPOINTS.ACCOUNT_BREAKDOWN);
    //filter
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [isFiltering, setIsFiltering] = useState(false);

    const handleMonthChange = (value: string) => {
        setIsFiltering(true);
        setSelectedMonth(value);
        setTimeout(() => setIsFiltering(false), 1000);
    };

    //process data
    const { months, tableData } = useMemo(() => {
        if (!apiResponse?.data) return { months: [], tableData: [] };
        //get list of months from dropdown
        const monthsList = apiResponse.data.map(item => item.month);
        //get list of all accounts name
        const accountsList = apiResponse.accounts || [];
        //find the data row for the selected month
        const currentMonthData = apiResponse.data.find(d => d.month === selectedMonth);

        const rows = accountsList.map(account => ({
            accountName: account,
            cost: Number(currentMonthData?.[account] || 0)
        })).sort((a, b) => b.cost - a.cost); // Sort specific to high cost first?
        return { months: monthsList, tableData: rows };
    }, [apiResponse, selectedMonth]);
    // 4. Auto-select first month on load
    useEffect(() => {
        if (months.length > 0 && !selectedMonth) {
            setSelectedMonth(months[0]);
        }
    }, [months, selectedMonth]);

    const handleExportCSV = () => {
        if (!tableData || tableData.length === 0) return;

        // 1. Define Headers
        const headers = ['Account Name', 'Total Cost'];

        // 2. Map data to CSV rows
        const csvRows = tableData.map(row =>
            `"${row.accountName.replace(/"/g, '""')}",${row.cost.toFixed(2)}`
        );

        // 3. Combine headers and rows
        const csvContent = [headers.join(','), ...csvRows].join('\n');

        // 4. Create Blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `aws_cost_breakdown_${selectedMonth || 'all'}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading table data...</div>;
    }

    // 5. Render
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <CardTitle>Monthly Cost by Account</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Table - Monthly Cost by Accounts
                        </CardDescription>
                    </div>
                    {/* Filter Dropdown */}
                    <Select value={selectedMonth} onValueChange={handleMonthChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>
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
                        <TableRow>
                            <TableHead>Account Name</TableHead>
                            <TableHead className="text-right">Total Cost</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isFiltering ? (
                            <TableRow>
                                <TableCell colSpan={2} className="h-24 text-center text-gray-500">
                                    Updating data...
                                </TableCell>
                            </TableRow>
                        ) : (
                            tableData.map((row) => (
                                <TableRow key={row.accountName}>
                                    <TableCell className="font-medium text-base">{row.accountName}</TableCell>
                                    <TableCell className="text-right">
                                        ${row.cost.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                Showing costs for {selectedMonth}
                <Button
                    className="flex items-center gap-2 ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                    onClick={handleExportCSV}
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </Button>
            </CardFooter>
        </Card>
    );
}

