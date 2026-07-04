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
} from "@/components/ui";
import { useDeductionStore } from "@/store/deductionStore";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TODAY = new Date().toISOString().split("T")[0];

const AddDeductionPage = () => {
  const router = useRouter();

  const { create, loading } = useDeductionStore();

  const [date, setDate] = useState("");
  const [type, setType] = useState("ADVANCE");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (date > TODAY) {
      setError("Future dates are not allowed.");
      return;
    }

    const success = await create({
      date,
      type,
      amount: Number(amount),
      note,
    });

    if (success) {
      router.replace("/dashboard");
      router.refresh();
    } else {
      setError("Failed to add deduction. Please check the details and try again.");
    }
  }

  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        eyebrow="Deduction"
        title="Add Deduction"
        description="Record advances, feed, medicine, milk, ghee, or other settlement deductions."
        action={
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <CardHeader title="Deduction Details" description="This amount will reduce the expected payment." />
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {error ? <Alert title="Could not save">{error}</Alert> : null}

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
              {loading ? "Saving" : "Save Deduction"}
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
};

export default AddDeductionPage;
