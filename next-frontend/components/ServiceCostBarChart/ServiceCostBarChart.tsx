'use client';

import { useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';

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

const CHART_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#f97316',
];

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

interface ServiceRow {
  month_year: string;
  account_name: string;
  product_code: string;
  product_name: string;
  total_cost: number;
}

export default function ServiceCostBarChart() {
  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     FETCH DATA
  ======================== */
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      const res = await axios.get('/cost/services/by-account', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data: ServiceRow[] = res.data.data;

      setRows(data);
      setMonths([...new Set(data.map(d => d.month_year))]);
      setAccounts([...new Set(data.map(d => d.account_name))]);

      setSelectedMonth(data[0]?.month_year ?? null);
      setSelectedAccount(data[0]?.account_name ?? null);
      setLoading(false);
    };

    fetchData();
  }, []);

  /* =======================
     TRANSFORM FOR BAR CHART
  ======================== */
  const chartData = useMemo(() => {
    return rows
      .filter(r =>
        (!selectedMonth || r.month_year === selectedMonth) &&
        (!selectedAccount || r.account_name === selectedAccount)
      )
      .map(r => ({
        service: r.product_name || r.product_code,
        cost: Number(r.total_cost),
      }))
      .sort((a, b) => b.cost - a.cost);
  }, [rows, selectedMonth, selectedAccount]);

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
        <CardTitle>Service Cost Comparison</CardTitle>
        <CardDescription>
          Compare AWS services by account and month
        </CardDescription>

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
        <div className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="service"
                type="category"
                width={180}
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
