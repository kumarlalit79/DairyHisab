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
import { useDeductionStore } from "@/store/deductionStore";
import { useDashboardStore } from "@/store/dashboardStore";
import toast from "react-hot-toast";

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
  const { remove } = useDeductionStore();
  const { fetchDashboard } = useDashboardStore();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this deduction?")) {
      const success = await remove(id);
      if (success) {
        toast.success("Deduction deleted successfully.");
        fetchDashboard();
      } else {
        toast.error("Failed to delete deduction.");
      }
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Recent Deductions"
        description="Latest advances, feed, medicine, and other deductions."
        action={
          <div className="flex gap-2">
            <LinkButton href="/deductions" variant="ghost" className="min-h-10 px-3">
              View All
            </LinkButton>
            <LinkButton href="/deductions/new" variant="secondary" className="min-h-10 px-3">
              <Plus className="size-4" aria-hidden="true" />
              Add
            </LinkButton>
          </div>
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
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
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
  );
};

export default RecentDeductions;
