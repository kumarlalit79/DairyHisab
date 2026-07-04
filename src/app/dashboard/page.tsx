"use client";
import { Alert, Button, DashboardSkeleton, LinkButton, PageHeader, PageShell } from "@/components/ui";
import DashboardSummary from "@/components/DashboardSummary";
import QuickActions from "@/components/QuickActions";
import RecentDeductions from "@/components/RecentDeductions";
import RecentMilkEntries from "@/components/RecentMilkEntries";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAuthStore } from "@/store/authStore";
import { LogOut, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const { dashboard, loading, fetchDashboard } = useDashboardStore();
  const { user, fetchUser, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchDashboard();
    if (!user) fetchUser();
  }, [fetchDashboard, fetchUser, user]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

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
        title={`Good to see you${user?.name ? `, ${user.name.split(" ")[0]}` : ""}.`}
        description="A clean snapshot of today's milk, bonuses, deductions, and expected settlement payment."
        action={
          <div className="flex items-center gap-2">
            <LinkButton href="/profile" variant="secondary" className="min-h-10 gap-1.5 px-3">
              <UserCircle className="size-4" aria-hidden="true" />
              Profile
            </LinkButton>
            <Button
              type="button"
              variant="secondary"
              className="min-h-10 gap-1.5 px-3"
              onClick={handleLogout}
            >
              <LogOut className="size-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        }
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
