import {
  Card,
  CardHeader,
  EmptyState,
  LinkButton,
  formatCurrency,
  formatDate,
} from "@/components/ui";
import { Plus } from "lucide-react";
import React from "react";

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
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Recent Milk Entries"
        description="Latest milk collections recorded in this settlement."
        action={
          <LinkButton href="/milk-entries/new" variant="secondary" className="min-h-10 px-3">
            <Plus className="size-4" aria-hidden="true" />
            Add
          </LinkButton>
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
  );
};
