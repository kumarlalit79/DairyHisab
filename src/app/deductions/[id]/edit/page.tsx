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
import { useDeductionStore } from "@/store/deductionStore";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditDeductionPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { update, fetch, deductions, loading } = useDeductionStore();

  const [date, setDate] = useState("");
  const [type, setType] = useState("ADVANCE");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (deductions.length === 0) {
      fetch().then(() => {
        setIsInitializing(false);
      });
    } else {
      setIsInitializing(false);
    }
  }, [deductions.length, fetch]);

  useEffect(() => {
    if (!isInitializing) {
      const deductionToEdit = deductions.find(d => d._id === id);
      if (deductionToEdit) {
        const formattedDate = new Date(deductionToEdit.date).toISOString().split('T')[0];
        setDate(formattedDate);
        setType(deductionToEdit.type);
        setAmount(deductionToEdit.amount.toString());
        setNote(deductionToEdit.note || "");
      } else {
        setError("Deduction not found.");
      }
    }
  }, [isInitializing, deductions, id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");

    const success = await update(id, {
      date,
      type,
      amount: Number(amount),
      note,
    });

    if (success) {
      router.replace("/deductions");
      router.refresh();
    } else {
      setError("Failed to update deduction. Please check the details and try again.");
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
           <Skeleton className="h-14 w-full mb-5" />
           <Skeleton className="h-32 w-full" />
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        eyebrow="Deduction"
        title="Edit Deduction"
        description="Update details for this deduction."
        action={
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <CardHeader title="Deduction Details" description="Modify the deduction amount and type." />
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {error ? <Alert title="Could not update">{error}</Alert> : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Date">
              <input
                className={inputClassName}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
              />
            </Field>

            <Field label="Type">
              <select
                className={inputClassName}
                value={type}
                onChange={(e) => setType(e.target.value)}
                disabled={loading}
              >
                <option value="ADVANCE">Advance</option>
                <option value="COW_FEED">Cow Feed</option>
                <option value="MILK">Milk</option>
                <option value="GHEE">Ghee</option>
                <option value="MEDICINE">Medicine</option>
                <option value="OTHERS">Others</option>
              </select>
            </Field>
          </div>

          <Field label="Amount" hint="Enter deduction amount in rupees.">
            <input
              className={inputClassName}
              type="number"
              min="0"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              disabled={loading}
            />
          </Field>

          <Field label="Note" hint="Optional context for this deduction.">
            <textarea
              className={`${inputClassName} min-h-32 resize-y`}
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a short note"
              disabled={loading}
            />
          </Field>

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

export default EditDeductionPage;
