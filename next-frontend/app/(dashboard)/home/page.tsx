'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useChartData } from '@/lib/hooks/useChartData';
import { API_ENDPOINTS } from '@/lib/constants';
import { ChartPoint, ApiResponse } from '@/types';
import DashboardLayout from '@/components/Layoutpage/SideBarLayout';
import MonthlyTrendChart from '@/components/Charts/MonthlyTrendChart';
import AccountBreakdownChart from '@/components/Charts/AccountBreakdownChart';
import ServiceCostBarChart from '@/components/Charts/ServiceCostBarChart';
import AccountCostTable from '@/components/Tables/AccountCostTable';
import AccountTrendTable from '@/components/Tables/AccountTrendTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity, Database } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const [breakdownFilter, setBreakdownFilter] = useState<string>('Q1');

  // Fetch Monthly Trend Data for KPI
  const { data: trendResponse } = useChartData<ApiResponse<ChartPoint[]>>(API_ENDPOINTS.MONTHLY_TREND);

  // Fetch Account Breakdown Data for KPI
  const { data: accountResponse } = useChartData<ApiResponse<any[]>>(API_ENDPOINTS.ACCOUNT_BREAKDOWN);

  // Fetch Service Cost Data for KPI
  const { data: serviceResponse } = useChartData<ApiResponse<any[]>>(API_ENDPOINTS.SERVICE_COSTS);

  // Calculate Total Cost KPI
  const { currentTotalCost, kpiTrendPercentage, trendDetails } = useMemo(() => {
    if (!trendResponse?.data || !Array.isArray(trendResponse.data) || trendResponse.data.length === 0) {
      return { currentTotalCost: 0, kpiTrendPercentage: 0 };
    }

    // Sort by date
    const sortedData = [...trendResponse.data].sort((a, b) => {
      const dateA = new Date(a.month + ' 1');
      const dateB = new Date(b.month + ' 1');
      return dateA.getTime() - dateB.getTime();
    });

    // SUM ALL COSTS (User Request)
    const totalCumulativeCost = sortedData.reduce((sum, item) => sum + Number(item.total_cost), 0);

    // Trend Calculation (Latest Month vs Previous Month)
    const latestMonth = sortedData[sortedData.length - 1];
    const previousMonth = sortedData.length > 1 ? sortedData[sortedData.length - 2] : null;

    let trend = 0;
    if (latestMonth && previousMonth && Number(previousMonth.total_cost) > 0) {
      const currentCost = Number(latestMonth.total_cost);
      const prevCost = Number(previousMonth.total_cost);
      trend = ((currentCost - prevCost) / prevCost) * 100;
    }

    return {
      currentTotalCost: totalCumulativeCost,
      kpiTrendPercentage: trend,
      trendDetails: {
        diff: (latestMonth && previousMonth) ? Number(latestMonth.total_cost) - Number(previousMonth.total_cost) : 0,
        prevCost: previousMonth ? Number(previousMonth.total_cost) : 0,
        currentMonthName: latestMonth ? new Date(latestMonth.month + ' 1').toLocaleString('default', { month: 'short' }) : '',
        prevMonthName: previousMonth ? new Date(previousMonth.month + ' 1').toLocaleString('default', { month: 'short' }) : ''
      }
    };
  }, [trendResponse]);

  // Calculate Active Accounts KPI
  const { activeAccountsCount, newAccountsCount } = useMemo(() => {
    if (!accountResponse?.data || !Array.isArray(accountResponse.data) || !accountResponse.accounts) {
      return { activeAccountsCount: 0, newAccountsCount: 0 };
    }

    const sortedData = [...accountResponse.data].sort((a, b) => {
      const dateA = new Date(a.month + ' 1');
      const dateB = new Date(b.month + ' 1');
      return dateA.getTime() - dateB.getTime();
    });

    const latestMonthData = sortedData[sortedData.length - 1];
    const previousMonthData = sortedData.length > 1 ? sortedData[sortedData.length - 2] : null;

    if (!latestMonthData) return { activeAccountsCount: 0, newAccountsCount: 0 };

    const getActiveCount = (monthData: any) => {
      let count = 0;
      if (accountResponse && accountResponse.accounts) {
        accountResponse.accounts.forEach((acc: string) => {
          if (monthData[acc] && Number(monthData[acc]) > 0) {
            count++;
          }
        });
      }
      return count;
    };

    const currentCount = getActiveCount(latestMonthData);
    const prevCount = previousMonthData ? getActiveCount(previousMonthData) : 0;

    return {
      activeAccountsCount: currentCount,
      newAccountsCount: currentCount - prevCount
    };

  }, [accountResponse]);

  // Calculate Top Cost Service KPI
  const topService = useMemo(() => {
    if (!serviceResponse?.data || !Array.isArray(serviceResponse.data)) return null;

    const rows = serviceResponse.data;

    // Calculate latest month from data
    const months = [...new Set(rows.map((r: any) => r.month_year))].sort((a: any, b: any) => {
      return new Date(a + ' 1').getTime() - new Date(b + ' 1').getTime();
    });

    const latestMonth = months[months.length - 1];
    if (!latestMonth) return null;

    // Filter rows for latest month
    const latestRows = rows.filter((r: any) => r.month_year === latestMonth);

    if (latestRows.length === 0) return null;

    // Aggregate cost by service
    const costByService: Record<string, number> = {};
    latestRows.forEach((r: any) => {
      const name = r.product_name || r.product_code || 'Unknown';
      costByService[name] = (costByService[name] || 0) + Number(r.total_cost);
    });

    // Find highest cost service
    let maxCost = -1;
    let topServiceName = '-';

    Object.entries(costByService).forEach(([name, cost]) => {
      if (cost > maxCost) {
        maxCost = cost;
        topServiceName = name;
      }
    });

    return {
      name: topServiceName,
      cost: maxCost,
      month: latestMonth
    };
  }, [serviceResponse]);

  // Calculate Top 3 Accounts by Cost (Latest Month)
  const topAccounts = useMemo(() => {
    if (!accountResponse?.data || !Array.isArray(accountResponse.data) || !accountResponse.accounts) return [];

    const rows = accountResponse.data;
    // Sort months to get latest
    const sortedRows = [...rows].sort((a, b) => {
      return new Date(a.month + ' 1').getTime() - new Date(b.month + ' 1').getTime();
    });

    const latestMonthData = sortedRows[sortedRows.length - 1];
    if (!latestMonthData) return [];

    const accountCosts = accountResponse.accounts.map(accName => ({
      name: accName,
      cost: Number(latestMonthData[accName] || 0),
      id: Math.floor(Math.random() * 9000000000) + 1000000000 // Mock ID for display as per design
    }));

    return accountCosts
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 3);
  }, [accountResponse]);


  if (loading || !user) {
    return (
      <DashboardLayout user={user}>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
          <p className="text-gray-500 mt-1">
            Here's an overview of cloud spending and latest cost trends.
          </p>
        </div>

        {/* KPI Cards (The "Keep This" part) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Cost
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${currentTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {kpiTrendPercentage > 0 ? '+' : ''}{kpiTrendPercentage.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {trendDetails?.currentMonthName} vs {trendDetails?.prevMonthName}
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${trendDetails?.diff && trendDetails.diff >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                {trendDetails?.diff && trendDetails.diff >= 0 ? '+' : '-'}${Math.abs(trendDetails?.diff || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {trendDetails?.prevMonthName}: ${trendDetails?.prevCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active AWS Accounts
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{activeAccountsCount}</div>
              <p className="text-xs text-muted-foreground">
                {newAccountsCount >= 0 ? '+' : ''}{newAccountsCount} from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Service</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate" title={topService?.name || 'No Data'}>
                {topService ? topService.name : '-'}
              </div>
              <p className="text-xs text-muted-foreground">
                {topService ? `$${topService.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in ${topService.month}` : 'No service data'}
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Top 3 Accounts Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {topAccounts.map((acc, index) => {
            const bgColors = ['bg-pink-50', 'bg-yellow-50', 'bg-white'];
            const textColors = ['text-pink-700', 'text-yellow-700', 'text-gray-900'];
            const isLast = index === 2;

            return (
              <Card key={acc.name} className={`${bgColors[index] || 'bg-white'} border-none shadow-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-medium ${isLast ? 'text-gray-500' : 'text-gray-600'}`}>
                    {acc.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${textColors[index] || 'text-gray-900'}`}>
                    ${acc.cost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Database className="w-3 h-3" />
                    <span className="truncate">{acc.id}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Monthly AWS Cost Trend */}
        <div id="cost-trend">
          <MonthlyTrendChart />
        </div>

        <div id="cost-breakdown" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={breakdownFilter === 'ALL' ? 'lg:col-span-2' : ''}>
            <AccountBreakdownChart onFilterChange={setBreakdownFilter} />
          </div>
          <div className={breakdownFilter === 'ALL' ? 'lg:col-span-2' : ''}>
            <AccountCostTable />
          </div>
        </div>

        <div id="account-trends" className="mt-8">
          <AccountTrendTable />
        </div>


      </div>
    </DashboardLayout>
  );
}