import {
  Card,
  CardHeader,
  EmptyState,
  LinkButton,
  formatCurrency,
  formatDate,
} from "@/components/ui";
import { Edit2, Plus, Trash2 } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useMilkStore } from "@/store/milkStore";
import { useDashboardStore } from "@/store/dashboardStore";
import toast from "react-hot-toast";

interface Props {
  entries: Array<{
    _id: string;
    date: string;
    shift: string;
    milkAmount: number;
    bonus: number;
  }>;
}

export default function RecentMilkEntries({
  entries
}: Props){
  const { remove } = useMilkStore();
  const { fetchDashboard } = useDashboardStore();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this milk entry?")) {
      const success = await remove(id);
      if (success) {
        toast.success("Entry deleted successfully.");
        fetchDashboard();
      } else {
        toast.error("Failed to delete entry.");
      }
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Recent Milk Entries"
        description="Latest milk collections recorded in this settlement."
        action={
          <div className="flex gap-2">
            <LinkButton href="/milk-entries" variant="ghost" className="min-h-10 px-3">
              View All
            </LinkButton>
            <LinkButton href="/milk-entries/new" variant="secondary" className="min-h-10 px-3">
              <Plus className="size-4" aria-hidden="true" />
              Add
            </LinkButton>
          </div>
        }
      />
      {entries.length === 0 ? (
        <div className="p-5 sm:p-6">
          <EmptyState
            title="No Milk Entries Yet"
            description="Add your first milk entry to start tracking today's collection."
            action={<LinkButton href="/milk-entries/new">Add Milk Entry</LinkButton>}
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
              {entries.map((entry) => (
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
  );
};
