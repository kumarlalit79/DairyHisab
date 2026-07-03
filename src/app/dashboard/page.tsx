"use client";
import DashboardSummary from "@/components/DashboardSummary";
import QuickActions from "@/components/QuickActions";
import RecentDeductions from "@/components/RecentDeductions";
import RecentMilkEntries from "@/components/RecentMilkEntries";
import { useDashboardStore } from "@/store/dashboardStore";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const { dashboard, loading, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <h2>loading...</h2>;
  if (!dashboard) return <h2>no data</h2>;

  console.log("dashboard - ",dashboard)

  return (
    <div>
      <h1>DairyHisab Dashboard</h1>

      <DashboardSummary dashboard={dashboard} />

      <hr />
      <QuickActions />

      <hr />

      <RecentMilkEntries entries={dashboard.recentMilkEntries} />

      <hr />

      <RecentDeductions deductions={dashboard.recentDeductions} />
    </div>
  );
};

export default DashboardPage;
