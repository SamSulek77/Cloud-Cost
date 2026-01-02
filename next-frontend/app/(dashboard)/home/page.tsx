'use client';

import DashboardLayout from '@/components/Layoutpage/DashboardLayout';
import MonthlyTrendChart from '@/components/Charts/MonthlyTrendChart';
import AccountBreakdownChart from '@/components/Charts/AccountBreakdownChart';
import ServiceCostBarChart from '@/components/Charts/ServiceCostBarChart';
import { useAuth } from '@/lib/hooks/useAuth';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h2>
        </div>

        {/* Monthly AWS Cost Trend */}
        <MonthlyTrendChart />

        {/* Cost Breakdown by Account */}
        <AccountBreakdownChart />

        {/* Service Cost Breakdown */}
        <ServiceCostBarChart />
      </div>
    </DashboardLayout>
  );
}