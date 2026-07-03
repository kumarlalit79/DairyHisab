"use client";

import { Button, Card, CardHeader } from "@/components/ui";
import { useSettlementStore } from "@/store/settlementStore";
import { Clock3, Milk, Receipt, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const { reset, loading } = useSettlementStore();

  async function handleReset() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset this settlement?",
    );

    if (!confirmReset) return;

    const success = await reset();

    if (success) {
      alert("Settlement reset successfully.");
      router.refresh();

      router.push("/dashboard");
    } else {
        alert("Failed to reset settlement.")
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Quick Actions"
        description="Fast paths for daily dairy accounting."
      />
      <div className="grid gap-3 p-5 sm:p-6">
        <Button
          type="button"
          className="justify-start"
          onClick={() => {
            router.push("/milk-entries/new");
          }}
        >
          <Milk className="size-4" aria-hidden="true" />
          Add Milk Entry
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="justify-start"
          onClick={() => {
            router.push("/deductions/new");
          }}
        >
          <Receipt className="size-4" aria-hidden="true" />
          Add Deduction
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="justify-start"
          onClick={() => {
            router.push("/history");
          }}
        >
          <Clock3 className="size-4" aria-hidden="true" />
          History
        </Button>

        <Button
          type="button"
          onClick={handleReset}
          disabled={loading}
          loading={loading}
          variant="danger"
          className="justify-start"
        >
          {!loading ? <RotateCcw className="size-4" aria-hidden="true" /> : null}
          {loading ? "Resetting" : "Reset Settlement"}
        </Button>
      </div>
    </Card>
  );
}
