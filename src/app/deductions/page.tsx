"use client";

import { Card, EmptyState, LinkButton, PageHeader, PageShell, TableSkeleton, formatCurrency, formatDate } from "@/components/ui";
import { useDeductionStore } from "@/store/deductionStore";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function DeductionsPage() {
  const { deductions, fetch, remove, loading } = useDeductionStore();
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this deduction?")) {
      const success = await remove(id);
      if (success) {
        toast.success("Deduction deleted successfully.");
        fetch();
      } else {
        toast.error("Failed to delete deduction.");
      }
    }
  };

  const filteredDeductions = deductions.filter((deduction) => 
    deduction.type.toLowerCase().includes(search.toLowerCase()) || 
    (deduction.note && deduction.note.toLowerCase().includes(search.toLowerCase())) ||
    formatDate(deduction.date).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Deductions"
        title="Deductions"
        description="Manage all deductions for the current settlement."
        action={
          <LinkButton href="/deductions/new">
            <Plus className="size-4" aria-hidden="true" />
            Add Deduction
          </LinkButton>
        }
      />

      <div className="mb-6 flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by date, type, or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-[var(--text)] shadow-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
          />
        </div>
      </div>

      {loading && deductions.length === 0 ? (
        <TableSkeleton rows={5} />
      ) : (
        <Card className="overflow-hidden">
          {filteredDeductions.length === 0 ? (
             <div className="p-5 sm:p-6">
              <EmptyState
                title={search ? "No deductions match your search" : "No Deductions Yet"}
                description={search ? "Try adjusting your search terms." : "Add your first deduction."}
                action={!search ? <LinkButton href="/deductions/new">Add Deduction</LinkButton> : undefined}
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
                    <th className="px-5 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDeductions.map((deduction) => (
                    <tr
                      key={deduction._id}
                      className="transition hover:bg-[var(--danger-light)]/30"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-[var(--text)]">
                        {formatDate(deduction.date)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                          {deduction.type.replace("_", " ")}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono font-semibold text-[var(--danger)]">
                        {formatCurrency(deduction.amount)}
                      </td>
                      <td className="px-5 py-4 text-[var(--text-secondary)]">
                        {deduction.note || "-"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/deductions/${deduction._id}/edit`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(deduction._id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-[var(--danger)] focus:outline-none focus:ring-2 focus:ring-[var(--danger)]"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </PageShell>
  );
}
