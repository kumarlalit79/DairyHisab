"use client";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Field,
  PageHeader,
  PageShell,
  inputClassName,
  Skeleton
} from "@/components/ui";
import { useMilkStore } from "@/store/milkStore";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TODAY = new Date().toISOString().split("T")[0];

const EditMilkEntryPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { update, fetch, entries, loading } = useMilkStore();

  const [date, setDate] = useState("");
  const [shift, setShift] = useState("AM");
  const [milkAmount, setMilkAmount] = useState("");
  const [bonus, setBonus] = useState("");
  const [error, setError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // If entries aren't loaded, fetch them first
    if (entries.length === 0) {
      fetch().then(() => {
        setIsInitializing(false);
      });
    } else {
      setIsInitializing(false);
    }
  }, [entries.length, fetch]);

  useEffect(() => {
    if (!isInitializing) {
      const entryToEdit = entries.find(e => e._id === id);
      if (entryToEdit) {
        // Format date to YYYY-MM-DD for the date input
        const formattedDate = new Date(entryToEdit.date).toISOString().split('T')[0];
        setDate(formattedDate);
        setShift(entryToEdit.shift);
        setMilkAmount(entryToEdit.milkAmount.toString());
        setBonus(entryToEdit.bonus.toString());
      } else {
        setError("Milk entry not found.");
      }
    }
  }, [isInitializing, entries, id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");

    const success = await update(id, {
      date,
      shift,
      milkAmount: Number(milkAmount),
      bonus: Number(bonus),
    });

    if (success) {
      router.replace("/milk-entries");
      router.refresh();
    } else {
      setError("Failed to update milk entry. Please check the details and try again.");
    }
  }

  if (isInitializing) {
    return (
      <PageShell className="max-w-3xl">
        <div className="space-y-4 mb-8">
           <Skeleton className="h-10 w-48" />
           <Skeleton className="h-5 w-72" />
        </div>
        <Card className="p-6">
           <Skeleton className="h-6 w-32 mb-6" />
           <div className="grid gap-5 sm:grid-cols-2 mb-5">
             <Skeleton className="h-14 w-full" />
             <Skeleton className="h-14 w-full" />
           </div>
           <div className="grid gap-5 sm:grid-cols-2 mb-5">
             <Skeleton className="h-14 w-full" />
             <Skeleton className="h-14 w-full" />
           </div>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        eyebrow="Milk Entry"
        title="Edit Milk Entry"
        description="Update milk quantity and bonus for this entry."
        action={
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <CardHeader title="Entry Details" description="Modify the details of this milk entry." />
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {error ? <Alert title="Could not update">{error}</Alert> : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Date">
              <input
                className={inputClassName}
                type="date"
                value={date}
                max={TODAY}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
              />
            </Field>

            <Field label="Shift">
              <select
                className={inputClassName}
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                disabled={loading}
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Milk Amount" hint="Enter quantity in litres.">
              <input
                className={inputClassName}
                type="number"
                min="0"
                step="0.01"
                value={milkAmount}
                onChange={(e) => setMilkAmount(e.target.value)}
                placeholder="0.00"
                disabled={loading}
              />
            </Field>

            <Field label="Bonus" hint="Enter bonus amount in rupees.">
              <input
                className={inputClassName}
                type="number"
                min="0"
                step="1"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                placeholder="0"
                disabled={loading}
              />
            </Field>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => router.back()} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={loading}>
              {!loading ? <Save className="size-4" aria-hidden="true" /> : null}
              {loading ? "Saving" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
};

export default EditMilkEntryPage;
