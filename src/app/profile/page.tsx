"use client";
import { Alert, Button, Card, CardHeader, Field, PageHeader, PageShell, Skeleton } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, loading, fetchUser, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (loading && !user) {
    return (
      <PageShell>
        <div className="mb-8 space-y-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Card className="p-6 space-y-6">
          <Skeleton className="h-6 w-32" />
          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </Card>
      </PageShell>
    );
  }

  if (!user) {
    return (
      <PageShell>
        <Alert title="Profile unavailable">
          We could not load your profile data right now. Please login again.
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </PageShell>
    );
  }

  const UserDetail = ({ label, value }: { label: string; value: string }) => (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
      <span className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
        {label}
      </span>
      <span className="block text-base font-semibold text-[var(--text)]">
        {value || "-"}
      </span>
    </div>
  );

  return (
    <PageShell>
      <PageHeader
        title="My Profile"
        description="View your personal details and dairy information."
        action={
          <Button variant="danger" onClick={handleLogout} className="w-full sm:w-auto">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        }
      />
      
      <Card className="overflow-hidden max-w-4xl">
        <CardHeader 
          title="Personal Information" 
          description="Your contact details and assigned dairy code."
        />
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
              <UserIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text)]">{user.name}</h3>
              <p className="text-[var(--text-secondary)]">{user.mobile}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            <UserDetail label="Full Name" value={user.name} />
            <UserDetail label="Mobile Number" value={user.mobile} />
            <UserDetail label="Dairy Code" value={user.dairyCode} />
            <UserDetail label="Secretary Name" value={user.secretaryName} />
            <UserDetail label="Village" value={user.village} />
            <UserDetail label="Address" value={user.address} />
          </div>
        </div>
      </Card>
    </PageShell>
  );
};

export default ProfilePage;
