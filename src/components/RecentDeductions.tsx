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
  deductions: Array<{
    _id: string;
    date: string;
    type: string;
    amount: number;
    note?: string;
  }>;
}


const RecentDeductions = ({ deductions }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Recent Deductions"
        description="Latest advances, feed, medicine, and other deductions."
        action={
          <LinkButton href="/deductions/new" variant="secondary" className="min-h-10 px-3">
            <Plus className="size-4" aria-hidden="true" />
            Add
          </LinkButton>
        }
      />

      {deductions.length === 0 ? (
        <div className="p-5 sm:p-6">
          <EmptyState
            title="No Deductions Yet"
            description="Add a deduction when there is an advance, feed bill, medicine, or other expense."
            action={<LinkButton href="/deductions/new">Add Deduction</LinkButton>}
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
              {deductions.map((deduction) => (
                <tr
                  key={deduction._id}
                  className="transition hover:bg-[var(--danger-light)]/45"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-[var(--text)]">
                    {formatDate(deduction.date)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                      {deduction.type?.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-[var(--danger)]">
                    {formatCurrency(deduction.amount)}
                  </td>
                  <td className="min-w-56 px-5 py-4 text-[var(--text-secondary)]">
                    {deduction.note || "-"}
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

export default RecentDeductions;
