'use client';

import '@/lib/recharts-fix';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import DashboardLayout from '@/components/Layoutpage/DashboardLayout';
import ServiceCostBarChart from '@/components/ServiceCostBarChart/ServiceCostBarChart'
import { TrendingUp, ChevronDown } from 'lucide-react';
import {
  AreaChart,
  Area,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const formatCurrency = (value: unknown, decimals = 2) => {
  const num = Number(value);
  if (isNaN(num)) return '$0.00';
  return `$${num.toFixed(decimals)}`;
};

interface ChartPoint {
  month: string;
  total_cost: number;
}

interface AccountBreakdownPoint {
  month: string;
  [key: string]: string | number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const CHART_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
  '#06b6d4', '#f97316', '#84cc16', '#6366f1', '#14b8a6', '#f43f5e',
];

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [accountData, setAccountData] = useState<AccountBreakdownPoint[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get<User>('/user', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  useEffect(() => {
    fetchMonthlyTrend();
    fetchAccountBreakdown();
  }, []);

  useEffect(() => {
    if (accounts.length > 0 && selectedAccounts.length === 0) {
      setSelectedAccounts(accounts);
    }
  }, [accounts]);

  const fetchMonthlyTrend = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      const response = await axios.get('/aws/cost-report/monthly-trend', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const monthlyArray = response.data?.data ?? [];
      if (!Array.isArray(monthlyArray)) {
        setError('Invalid data format received from server');
        setChartData([]);
        return;
      }

      const result: ChartPoint[] = monthlyArray
        .map((item: any) => ({
          month: item.month,
          total_cost: Number(item.total_cost),
        }))
        .sort((a, b) => {
          const dateA = new Date(a.month + ' 1');
          const dateB = new Date(b.month + ' 1');
          return dateA.getTime() - dateB.getTime();
        });

      setChartData(result);
    } catch (error: any) {
      console.error('Failed to load monthly trend:', error);
      setError(error.response?.status === 401 ? 'Authentication failed. Please log in again.' : 'Failed to load chart data. Please try again.');
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountBreakdown = async () => {
    try {
      setAccountError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setAccountError('No authentication token found. Please log in.');
        setLoadingAccounts(false);
        return;
      }

      const response = await axios.get('/aws/cost-report/account-breakdown', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data?.data ?? [];
      const accountsList = response.data?.accounts ?? [];

      if (!Array.isArray(data)) {
        setAccountError('Invalid data format received from server');
        setAccountData([]);
        setAccounts([]);
        return;
      }

      const sortedData = data.sort((a: any, b: any) => {
        const dateA = new Date(a.month + ' 1');
        const dateB = new Date(b.month + ' 1');
        return dateA.getTime() - dateB.getTime();
      });

      setAccountData(sortedData);
      setAccounts(accountsList);
    } catch (error: any) {
      console.error('Failed to load account breakdown:', error);
      setAccountError(error.response?.status === 401 ? 'Authentication failed. Please log in again.' : 'Failed to load account data. Please try again.');
      setAccountData([]);
      setAccounts([]);
    } finally {
      setLoadingAccounts(false);
    }
  };

  const toggleAccount = (account: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(account) ? prev.filter((a) => a !== account) : [...prev, account]
    );
  };

  const selectAllAccounts = () => setSelectedAccounts(accounts);
  const deselectAllAccounts = () => setSelectedAccounts([]);

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

  if (!user) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Monthly AWS Cost Trend</CardTitle>
            <CardDescription>Total cost: {formatCurrency(totalCost)}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading chart...
              </div>
            ) : error ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-red-500">
                <p className="mb-2">{error}</p>
                <button onClick={fetchMonthlyTrend} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                  Retry
                </button>
              </div>
            ) : chartData.length === 0 ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                <p className="mb-2">No data available</p>
                <p className="text-sm">Upload a cost report to see your monthly trends</p>
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => formatCurrency(v, 0)} />
                    <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="total_cost" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#fillCost)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
          {!loading && !error && chartData.length > 0 && (
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                {Number(trendPercentage) > 0 ? 'Trending up' : 'Trending down'} by {Math.abs(Number(trendPercentage))}% this month
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total costs for the last {chartData.length} months
              </div>
            </CardFooter>
          )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle>Cost Breakdown by Account</CardTitle>
                <CardDescription>Bar Chart - Multiple Accounts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingAccounts ? (
              <div className="h-[450px] flex items-center justify-center text-muted-foreground">
                Loading account breakdown...
              </div>
            ) : accountError ? (
              <div className="h-[450px] flex flex-col items-center justify-center text-red-500">
                <p className="mb-2">{accountError}</p>
                <button onClick={fetchAccountBreakdown} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                  Retry
                </button>
              </div>
            ) : accountData.length === 0 ? (
              <div className="h-[450px] flex flex-col items-center justify-center text-muted-foreground">
                <p className="mb-2">No data available</p>
                <p className="text-sm">Upload a cost report to see account breakdown</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span className="truncate">
                            {selectedAccounts.length === 0 ? 'Select accounts...' : selectedAccounts.length === accounts.length ? 'All accounts selected' : selectedAccounts.length === 1 ? selectedAccounts[0] : `${selectedAccounts.length} accounts selected`}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[400px] max-h-[400px] overflow-y-auto">
                        <div className="px-2 py-1.5">
                          <div className="flex gap-2">
                            <button onClick={(e) => { e.preventDefault(); selectAllAccounts(); }} className="flex-1 text-xs px-2 py-1 rounded border hover:bg-accent">
                              Select All
                            </button>
                            <button onClick={(e) => { e.preventDefault(); deselectAllAccounts(); }} className="flex-1 text-xs px-2 py-1 rounded border hover:bg-accent">
                              Clear All
                            </button>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        {accounts.map((account, index) => (
                          <DropdownMenuCheckboxItem key={account} checked={selectedAccounts.includes(account)} onCheckedChange={() => toggleAccount(account)} onSelect={(e) => e.preventDefault()}>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                              <span>{account}</span>
                            </div>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {selectedAccounts.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedAccounts.map((account) => {
                      const colorIndex = accounts.indexOf(account);
                      return (
                        <div key={account} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border" style={{ borderColor: CHART_COLORS[colorIndex % CHART_COLORS.length], backgroundColor: `${CHART_COLORS[colorIndex % CHART_COLORS.length]}20` }}>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length] }} />
                          <span>{account}</span>
                          <button onClick={() => toggleAccount(account)} className="hover:opacity-70">×</button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={accountData}
                    barCategoryGap={24}   // ✅ spacing between months
                    barGap={6}            // ✅ spacing between bars in same month
                    >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}    // ✅ match screenshot (horizontal grid only)
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => formatCurrency(v, 0)}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                    />

                    <Tooltip
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"   // ✅ like screenshot
                        height={48}
                        iconType="circle"
                        wrapperStyle={{
                        fontSize: '12px',
                        }}
                    />

                    {selectedAccounts.map((account) => {
                        const colorIndex = accounts.indexOf(account);
                        return (
                        <Bar
                            key={account}
                            dataKey={account}
                            fill={CHART_COLORS[colorIndex % CHART_COLORS.length]}
                            radius={[6, 6, 0, 0]}  // ✅ rounded top like screenshot
                            maxBarSize={36}       // ✅ THICK bars
                        />
                        );
                    })}
                    </BarChart>
                </ResponsiveContainer>
                </div>

              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing costs for {selectedAccounts.length} of {accounts.length} accounts
            </div>
          </CardFooter>
        </Card>

        <ServiceCostBarChart/>
      </div>
    </DashboardLayout>
  );
}