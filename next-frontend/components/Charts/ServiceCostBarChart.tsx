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
  Cell,
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

import { useChartData } from '@/lib/hooks/useChartData';
import { API_ENDPOINTS, CHART_COLORS } from '@/lib/constants';
import { ServiceRow, ApiResponse } from '@/types';

import CostInvestigationPanel from '@/components/Overlays/CostInvestigationPanel';

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function ServiceCostBarChart() {
  const { data: apiResponse, loading, error } = useChartData<ApiResponse<ServiceRow[]>>(API_ENDPOINTS.SERVICE_COSTS);

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [investigationParams, setInvestigationParams] = useState<{
    serviceName: string;
    productCode: string;
    monthA: string;
    monthB: string;
    accountName?: string | null;
  } | null>(null);

  // Helper to find previous month from available data
  const getPreviousMonth = (currentMonth: string, availableMonths: string[]) => {
    // Sort months chronologically
    const sorted = [...availableMonths].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const idx = sorted.indexOf(currentMonth);
    return idx > 0 ? sorted[idx - 1] : null;
  };

  const rows: ServiceRow[] = useMemo(() => {
    return Array.isArray(apiResponse?.data) ? apiResponse!.data : [];
  }, [apiResponse]);

  const months = useMemo(() => {
    const uniqueMonths = [...new Set(rows.map(d => d.month_year))];
    return uniqueMonths.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [rows]);
  const accounts = useMemo(() => [...new Set(rows.map(d => d.account_name))], [rows]);

  // Set default selection when data loads
  useEffect(() => {
    if (months.length > 0 && !selectedMonth) {
      // Default to latest month (Current Month)
      setSelectedMonth(months[months.length - 1]);
    }

    if (rows.length > 0 && !selectedAccount) {
      setSelectedAccount(rows[0]?.account_name);
    }
  }, [months, rows, selectedMonth, selectedAccount]);

  /* =======================
     TRANSFORM FOR BAR CHART
  ======================== */
  const chartData = useMemo(() => {
    let data = rows
      .filter(r =>
        (!selectedMonth || r.month_year === selectedMonth) &&
        (!selectedAccount || r.account_name === selectedAccount)
      )
      .map(r => ({
        service: r.product_name || r.product_code,
        cost: Number(r.total_cost),
      }));

    // Sort data by cost descending (Highest first) and then followed by the rest cost
    data = data.sort((a, b) => b.cost - a.cost);

    // If not showing all is used, take only top 5
    if (!showAll) {
      data = data.slice(0, 5);
    }

    return data;
  }, [rows, selectedMonth, selectedAccount, showAll]);

  /* =======================
     UI
  ======================== */
  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        Loading service costs…
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Service Cost Comparison</CardTitle>
              <CardDescription>
                {showAll ? 'Comparing all services by cost' : 'Top 5 highest cost services'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
              >
                {showAll ? 'Top services' : 'Show All Services'}
              </button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="flex gap-4 pt-4">
            <Select value={selectedMonth ?? ''} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAccount ?? ''} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(acc => (
                  <SelectItem key={acc} value={acc}>
                    {acc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className={showAll ? "h-[1000px]" : "h-[400px]"}>
            <ResponsiveContainer width="100%" height="95%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="service"
                  type="category"
                  width={250}
                  tickLine={false}
                  axisLine={false}
                />
                <XAxis
                  type="number"
                  tickFormatter={(v) => formatCurrency(v)}
                />
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
                  itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b', marginBottom: '4px' }}
                  wrapperStyle={{ pointerEvents: 'none', zIndex: 50 }}
                />

                <Bar
                  dataKey="cost"
                  radius={[0, 6, 6, 0]}
                  onClick={(data) => {
                    if (selectedMonth && months.length > 0) {
                      const prevMonth = getPreviousMonth(selectedMonth, months);
                      if (prevMonth) {
                        setInvestigationParams({
                          serviceName: data.service,
                          productCode: data.service, // In current mapping name is used as code often, validation handled in API
                          monthA: prevMonth,
                          monthB: selectedMonth,
                          accountName: selectedAccount
                        });
                      } else {
                        alert("Select a month that has a previous month history to compare.");
                      }
                    } else {
                      alert("Please select a specific month to investigate.");
                    }
                  }}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
    </>
  );
}
