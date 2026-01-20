'use client';

import { useMemo, useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell
} from 'recharts';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import { API_ENDPOINTS, CHART_COLORS } from '@/lib/constants';

const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

export default function ServiceComparisonChart() {
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState<string[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [timeFilter, setTimeFilter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q4');
    const [focusedMonth, setFocusedMonth] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);

    // 1. Fetch Accounts
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.ACCOUNT_BREAKDOWN);
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
    }, []);

    // 2. Fetch Section Data
    useEffect(() => {
        const fetchData = async () => {
            if (!selectedAccount) return;
            setLoading(true);
            try {
                const response = await axios.get('/cost/services/by-month', {
                    params: { account_name: selectedAccount }
                });
                if (response.data.success) {
                    setData(response.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch service comparison data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedAccount]);

    // 3. Process Data for Chart
    const { chartData, serviceNames } = useMemo(() => {
        if (!data || data.length === 0) return { chartData: [], serviceNames: [] };

        let processed = [...data].sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

        // Filter by Quarter/Year
        if (!focusedMonth && timeFilter !== 'ALL') {
            processed = processed.filter(d => {
                const monthIndex = new Date(d.month).getMonth();
                if (timeFilter === 'Q1') return monthIndex >= 0 && monthIndex <= 2;
                if (timeFilter === 'Q2') return monthIndex >= 3 && monthIndex <= 5;
                if (timeFilter === 'Q3') return monthIndex >= 6 && monthIndex <= 8;
                return monthIndex >= 9 && monthIndex <= 11;
            });
        }

        // Filter by specific month focus
        if (focusedMonth) {
            processed = processed.filter(d => d.month === focusedMonth);
        }

        // Transform for Stacking (Home Page style)
        const allServices = new Set<string>();
        const formatted = processed.map(m => {
            const row: any = { month: m.month };
            m.services.forEach((s: any) => {
                const name = s.product_name || s.product_code;
                row[name] = Number(s.total_cost);
                allServices.add(name);
            });
            // "Other" category removed as per user request to only show Top 5
            // if (m.other_cost > 0) {
            //     row['Other Services'] = Number(m.other_cost);
            //     allServices.add('Other Services');
            // }
            return row;
        });

        return { chartData: formatted, serviceNames: Array.from(allServices) };
    }, [data, timeFilter, focusedMonth]);

    const handleChartClick = (evt: any) => {
        if (focusedMonth) {
            setFocusedMonth(null);
        } else if (evt && evt.activeLabel) {
            setFocusedMonth(evt.activeLabel);
        }
    };

    return (
        <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        Service Cost Comparison
                        {focusedMonth && <span className="text-gray-400 font-normal">/ {focusedMonth}</span>}
                    </CardTitle>
                    <CardDescription>
                        {focusedMonth ? 'Showing details for selected month' : 'Top 5 services per month grouped by cost'}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                    {focusedMonth ? (
                        <Button variant="outline" size="sm" onClick={() => setFocusedMonth(null)}>
                            Back to Overview
                        </Button>
                    ) : (
                        <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as any)}>
                            <SelectTrigger className="w-[180px]">
                                <Calendar className="w-4 h-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">Full Year</SelectItem>
                                <SelectItem value="Q1">Quarter 1</SelectItem>
                                <SelectItem value="Q2">Quarter 2</SelectItem>
                                <SelectItem value="Q3">Quarter 3</SelectItem>
                                <SelectItem value="Q4">Quarter 4</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Account" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map(acc => (
                                <SelectItem key={acc} value={acc}>{acc}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                {loading ? (
                    <div className="h-[400px] flex items-center justify-center">
                        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="h-[400px] flex items-center justify-center text-gray-500">
                        No data found for the selected criteria.
                    </div>
                ) : (
                    <div className="h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                onClick={handleChartClick}
                                style={{ cursor: 'pointer' }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.6} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={v => `$${v}`}
                                    tick={{ fill: '#64748b' }}
                                />
                                <Tooltip
                                    formatter={(v: any) => formatCurrency(v)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                                {serviceNames.map((name, idx) => (
                                    <Bar
                                        key={name}
                                        dataKey={name}
                                        fill={name === 'Other Services' ? '#94a3b8' : CHART_COLORS[idx % CHART_COLORS.length]}
                                        radius={[4, 4, 0, 0]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
