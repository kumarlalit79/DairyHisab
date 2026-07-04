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
import { useMilkStore } from "@/store/milkStore";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TODAY = new Date().toISOString().split("T")[0];

const MilkEntryPage = () => {
  const router = useRouter();

  const { create, loading } = useMilkStore();

  const [date, setDate] = useState("");
  const [shift, setShift] = useState("AM");
  const [milkAmount, setMilkAmount] = useState("");
  const [bonus, setBonus] = useState("");
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
      shift,
      milkAmount: Number(milkAmount),
      bonus: Number(bonus),
    });

    if (success) {
      router.replace("/dashboard");
      router.refresh();
    } else {
      setError("Failed to save milk entry. Please check the details and try again.");
    }
  }

  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        eyebrow="Milk Entry"
        title="Add Milk Entry"
        description="Record milk quantity and bonus for the selected shift."
        action={
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <CardHeader title="Entry Details" description="All values are saved to the current settlement." />
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
              {loading ? "Saving" : "Save Entry"}
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
};

export default MilkEntryPage;
