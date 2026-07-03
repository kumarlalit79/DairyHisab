"use client";

import { useSettlementStore } from "@/store/settlementStore";
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
    <div>
      <h2>Quick Actions</h2>

      <button
        className="bg-pink-500 p-4"
        onClick={() => {
          router.push("/milk-entries/new");
        }}
      >
        Add Milk Entry
      </button>

      <br />
      <br />

      <button
        className="bg-pink-500 p-4"
        onClick={() => {
          router.push("/deductions/new");
        }}
      >
        Add Deduction
      </button>

      <br />
      <br />

      <button
        className="bg-pink-500 p-4"
        onClick={() => {
          router.push("/history");
        }}
      >
        History
      </button>

      <br />
      <br />

      <button onClick={handleReset} disabled={loading} className="bg-pink-500 p-4">{loading ? "Resetting.." :"Reset Settlement"}</button>
    </div>
  );
}
