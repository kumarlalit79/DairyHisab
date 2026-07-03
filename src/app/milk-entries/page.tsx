"use client";

import { Card, EmptyState, LinkButton, PageHeader, PageShell, TableSkeleton, formatCurrency, formatDate, Button } from "@/components/ui";
import { useMilkStore } from "@/store/milkStore";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function MilkEntriesPage() {
  const { entries, fetch, remove, loading } = useMilkStore();
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this milk entry?")) {
      const success = await remove(id);
      if (success) {
        toast.success("Entry deleted successfully.");
        fetch();
      } else {
        toast.error("Failed to delete entry.");
      }
    }
  };

  const filteredEntries = entries.filter((entry) => 
    entry.shift.toLowerCase().includes(search.toLowerCase()) || 
    formatDate(entry.date).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Milk"
        title="Milk Entries"
        description="Manage all milk entries for the current settlement."
        action={
          <LinkButton href="/milk-entries/new">
            <Plus className="size-4" aria-hidden="true" />
            Add Milk Entry
          </LinkButton>
        }
      />

      <div className="mb-6 flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by date or shift..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-[var(--text)] shadow-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
          />
        </div>
      </div>

      {loading && entries.length === 0 ? (
        <TableSkeleton rows={5} />
      ) : (
        <Card className="overflow-hidden">
          {filteredEntries.length === 0 ? (
             <div className="p-5 sm:p-6">
              <EmptyState
                title={search ? "No entries match your search" : "No Milk Entries Yet"}
                description={search ? "Try adjusting your search terms." : "Add your first milk entry to start tracking collection."}
                action={!search ? <LinkButton href="/milk-entries/new">Add Milk Entry</LinkButton> : undefined}
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
                    <th className="px-5 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEntries.map((entry) => (
                    <tr
                      key={entry._id}
                      className="transition hover:bg-[var(--primary-light)]/50"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-[var(--text)]">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                          {entry.shift}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-[var(--text)]">
                        {formatCurrency(entry.milkAmount)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-green-700">
                        {formatCurrency(entry.bonus)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/milk-entries/${entry._id}/edit`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(entry._id)}
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
