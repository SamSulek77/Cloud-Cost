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

  const rows: ServiceRow[] = useMemo(() => {
    return Array.isArray(apiResponse?.data) ? apiResponse!.data : [];
  }, [apiResponse]);

  const months = useMemo(() => [...new Set(rows.map(d => d.month_year))], [rows]);
  const accounts = useMemo(() => [...new Set(rows.map(d => d.account_name))], [rows]);

  // Set default selection when data loads
  useEffect(() => {
    if (rows.length > 0) {
      if (!selectedMonth) setSelectedMonth(rows[0]?.month_year);
      if (!selectedAccount) setSelectedAccount(rows[0]?.account_name);
    }
  }, [rows, selectedMonth, selectedAccount]);

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

    if (!showAll) {
      data = data.filter(d => d.cost > 2.0);
    }

    return data.sort((a, b) => b.cost - a.cost);
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Service Cost Comparison</CardTitle>
            <CardDescription>
              Compare AWS services by account and month
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
            >
              {showAll ? 'Hide' : 'Show Others Services'}
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
        <div className="h-[1000px]">
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
              <Tooltip formatter={(v: number) => formatCurrency(v)} />

              <Bar dataKey="cost" radius={[0, 6, 6, 0]}>
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
