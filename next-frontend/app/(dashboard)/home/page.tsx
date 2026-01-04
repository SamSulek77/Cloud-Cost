'use client';

import DashboardLayout from '@/components/Layoutpage/SideBarLayout';
import MonthlyTrendChart from '@/components/Charts/MonthlyTrendChart';
import AccountBreakdownChart from '@/components/Charts/AccountBreakdownChart';
import ServiceCostBarChart from '@/components/Charts/ServiceCostBarChart';
import { useAuth } from '@/lib/hooks/useAuth';
import AccountCostTable from '@/components/Tables/AccountCostTable';


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
          <p className="text-gray-500 mt-1">
            Here's an overview of cloud spending and latest cost trends.
          </p>
        </div>

        {/* Monthly AWS Cost Trend */}
        <div id="cost-trend">
          <MonthlyTrendChart />
        </div>

        <div id="cost-breakdown" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccountBreakdownChart />
          <AccountCostTable />
        </div>

        {/* Service Cost Breakdown */}
        <div id="service-comparison">
          <ServiceCostBarChart />
        </div>

      </div>
    </DashboardLayout >
  );
}