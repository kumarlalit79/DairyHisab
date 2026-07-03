"use client";

import {
  Alert,
  Button,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
  PageShell,
  TableSkeleton,
  formatCurrency,
  formatDate,
} from "@/components/ui";
import { useSettlementStore } from "@/store/settlementStore";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SettlementDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { settlementDetails, loading, fetchSettlementDetails } =
    useSettlementStore();

  useEffect(() => {
    fetchSettlementDetails(id as string);
  }, [fetchSettlementDetails, id]);

  if (loading) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Settlement"
          title="Settlement Details"
          description="Loading entries, deductions, and totals."
        />
        <div className="grid gap-6">
          <TableSkeleton rows={3} />
          <TableSkeleton rows={5} />
          <TableSkeleton rows={4} />
        </div>
      </PageShell>
    );
  }

  if (!settlementDetails) {
    return (
      <PageShell>
        <Alert title="Settlement unavailable">
          We could not load details for this settlement.
        </Alert>
      </PageShell>
    );
  }

  const settlement = settlementDetails?.settlement;
  const milkEntries = settlementDetails?.milkEntries ?? [];
  const deductions = settlementDetails?.deductions ?? [];
  const totalMilk = milkEntries.reduce(
    (sum: number, entry: { milkAmount?: number }) => sum + Number(entry.milkAmount || 0),
    0,
  );
  const totalBonus = milkEntries.reduce(
    (sum: number, entry: { bonus?: number }) => sum + Number(entry.bonus || 0),
    0,
  );
  const totalDeductions = deductions.reduce(
    (sum: number, item: { amount?: number }) => sum + Number(item.amount || 0),
    0,
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Settlement"
        title="Settlement Details"
        description="Milk entries, deductions, and totals for this settlement period."
        action={
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        }
      />

      <div className="grid gap-6">
        <Card className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Status</p>
              <p className="mt-2">
                <span className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-sm font-semibold text-[var(--primary)]">
                  {settlement?.status}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Start Date</p>
              <p className="mt-2 font-semibold text-[var(--text)]">
                {formatDate(settlement?.startDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Milk</p>
              <p className="mt-2 font-mono text-lg font-semibold text-[var(--text)]">
                {totalMilk} L
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Bonus</p>
              <p className="mt-2 text-lg font-semibold text-green-700">
                {formatCurrency(totalBonus)}
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Deductions</p>
              <p className="mt-2 text-lg font-semibold text-[var(--danger)]">
                {formatCurrency(totalDeductions)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader title="Milk Entries" description="All milk records linked to this settlement." />
          {milkEntries.length === 0 ? (
            <div className="p-5 sm:p-6">
              <EmptyState
                title="No Milk Entries in This Settlement"
                description="Milk entries linked to this settlement will appear here."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-5 py-3 font-semibold">Shift</th>
                    <th className="px-5 py-3 font-semibold">Milk</th>
                    <th className="px-5 py-3 font-semibold">Bonus</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {milkEntries.map((entry: { _id: string; date: string; shift: string; milkAmount: number; bonus: number }) => (
                    <tr key={entry._id} className="transition hover:bg-[var(--primary-light)]/50">
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-[var(--text)]">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                          {entry.shift}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-[var(--text)]">
                        {entry.milkAmount} L
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-green-700">
                        {formatCurrency(entry.bonus)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="overflow-hidden">
          <CardHeader title="Deductions" description="All deductions linked to this settlement." />
          {deductions.length === 0 ? (
            <div className="p-5 sm:p-6">
              <EmptyState
                title="No Deductions in This Settlement"
                description="Deductions linked to this settlement will appear here."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-5 py-3 font-semibold">Type</th>
                    <th className="px-5 py-3 font-semibold">Amount</th>
                    <th className="px-5 py-3 font-semibold">Note</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {deductions.map((item: { _id: string; date: string; type: string; amount: number; note?: string }) => (
                    <tr key={item._id} className="transition hover:bg-[var(--danger-light)]/45">
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-[var(--text)]">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                          {item.type?.replaceAll("_", " ")}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-[var(--danger)]">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="min-w-56 px-5 py-4 text-[var(--text-secondary)]">
                        {item.note || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </PageShell>
  );
};

export default SettlementDetailsPage;
