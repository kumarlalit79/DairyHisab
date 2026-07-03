"use client";

import {
  Card,
  CardHeader,
  EmptyState,
  LinkButton,
  PageHeader,
  PageShell,
  TableSkeleton,
  formatDate,
} from "@/components/ui";
import { useSettlementStore } from "@/store/settlementStore";
import { Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HistoryPage = () => {
  const router = useRouter();

  const { settlements, loading, fetchSettlements } = useSettlementStore();

  useEffect(() => {
    fetchSettlements();
  }, [fetchSettlements]);

  if (loading) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Settlements"
          title="Settlement History"
          description="Review completed and active settlement periods."
        />
        <TableSkeleton rows={6} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Settlements"
        title="Settlement History"
        description="Review completed and active settlement periods."
        action={
          <LinkButton href="/dashboard" variant="secondary">
            Back to Dashboard
          </LinkButton>
        }
      />

      <Card className="overflow-hidden">
        <CardHeader title="All Settlements" description="Click a row or use View to open settlement details." />
        {settlements.length === 0 ? (
          <div className="p-5 sm:p-6">
            <EmptyState
              title="No Settlement History Yet"
              description="Settlement periods will appear here once your ledger has active or completed settlements."
              action={
                <LinkButton href="/milk-entries/new">
                  <Plus className="size-4" aria-hidden="true" />
                  Add Milk Entry
                </LinkButton>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Start Date</th>
                  <th className="px-5 py-3 font-semibold">End Date</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {settlements.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => router.push(`/history/${item._id}`)}
                    className="cursor-pointer transition hover:bg-[var(--primary-light)]/50"
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item?.status === "ACTIVE"
                            ? "bg-[var(--primary-light)] text-[var(--primary)]"
                            : "bg-slate-100 text-[var(--text-secondary)]"
                        }`}
                      >
                        {item?.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-medium text-[var(--text)]">
                      {formatDate(item.startDate)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-[var(--text-secondary)]">
                      {formatDate(item.endDate)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[var(--text)] shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                        onClick={(event) => {
                          event.stopPropagation();
                          router.push(`/history/${item._id}`);
                        }}
                      >
                        <Eye className="size-4" aria-hidden="true" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </PageShell>
  );
};

export default HistoryPage;
