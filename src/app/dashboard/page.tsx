"use client";
import { Alert, DashboardSkeleton, PageHeader, PageShell } from "@/components/ui";
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
  }, [fetchDashboard]);

  if (loading) return <DashboardSkeleton />;
  if (!dashboard) {
    return (
      <PageShell>
        <Alert title="Dashboard unavailable">
          We could not load your dashboard data right now. Please refresh and try again.
        </Alert>
      </PageShell>
    );
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <PageShell>
      <PageHeader
        eyebrow={today}
        title="Good to see you."
        description="A clean snapshot of today's milk, bonuses, deductions, and expected settlement payment."
      />
      <DashboardSummary dashboard={dashboard} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <RecentMilkEntries entries={dashboard.recentMilkEntries ?? []} />
          <RecentDeductions deductions={dashboard.recentDeductions ?? []} />
        </div>
        <QuickActions />
      </div>
    </PageShell>
  );
};

export default DashboardPage;
