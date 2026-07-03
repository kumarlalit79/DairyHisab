"use client";
import { useMilkStore } from "@/store/milkStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MilkEntryPage = () => {
  const router = useRouter();

  const { create, loading } = useMilkStore();

  const [date, setDate] = useState("");
  const [shift, setShift] = useState("AM");
  const [milkAmount, setMilkAmount] = useState("");
  const [bonus, setBonus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const success = await create({
      date,
      shift,
      milkAmount: Number(milkAmount),
      bonus: Number(bonus),
    });

    if (success) {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <h2>MilkEntryPage</h2>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <br />
        <input
          className="border"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <br />

        <label>Shift</label>
        <br />

        <select className="border" value={shift} onChange={(e) => setShift(e.target.value)}>
          <option>AM</option>
          <option>PM</option>
        </select>
        <br />
        <br />
        <label>Milk Amount</label>
        <br />
        <input
        className="border"
          type="number"
          value={milkAmount}
          onChange={(e) => setMilkAmount(e.target.value)}
        />
        <br />
        <br />

        <label>Bonus</label>

        <br />

        <input
        className="border"
          type="number"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
        />

        <br />
        <br />

        <button className="bg-pink-500 p-3" type="submit" disabled={loading}>
            {loading ? "Saving...": "Save"}
        </button>

      </form>
    </div>
  );
};

export default MilkEntryPage;
