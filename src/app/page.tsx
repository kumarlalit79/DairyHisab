import { Card, LinkButton, PageShell } from "@/components/ui";
import { ArrowRight, BarChart3, LogIn, Milk } from "lucide-react";

export default function Home() {
  return (
    <PageShell className="flex min-h-[calc(100vh-3rem)] items-center">
      <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-[var(--primary)] shadow-sm">
            <Milk className="size-4" aria-hidden="true" />
            Digital Dairy Ledger
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[var(--text)] sm:text-6xl">
            DairyHisab
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Keep track of every drop, every rupee, and every settlement from one clean dashboard.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/login">
              <LogIn className="size-4" aria-hidden="true" />
              Login
            </LinkButton>
            <LinkButton href="/dashboard" variant="secondary">
              Open Dashboard
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </div>

        <Card className="p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)]">Today</p>
              <h2 className="mt-1 text-2xl font-semibold text-[var(--text)]">Ledger Snapshot</h2>
            </div>
            <div className="rounded-2xl bg-[var(--primary-light)] p-3 text-[var(--primary)]">
              <BarChart3 className="size-6" aria-hidden="true" />
            </div>
          </div>
          <div className="space-y-3">
            {["Milk collection", "Bonus tracking", "Deduction ledger", "Settlement history"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-semibold text-[var(--text)]">{item}</span>
                <span className="h-2 w-14 rounded-full bg-[var(--primary)]/20" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
