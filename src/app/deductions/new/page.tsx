"use client"

import { useDeductionStore } from "@/store/deductionStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddDeductionPage = () => {
  const router = useRouter();

  const { create, loading } = useDeductionStore();

  const [date, setDate] = useState("");
  const [type, setType] = useState("ADVANCE");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const success = await create({
      date,
      type,
      amount: Number(amount),
      note,
    });

    if (success) {
      router.push("/dashboard");
    } else {
      alert("Failed to add deduction.");
    }
  }

  return (
    <div>
      <h2>Add Deduction</h2>
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

        <label>Type</label>
        <br />
        <select className="border" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ADVANCE">Advance</option>
          <option value="COW_FEED">Cow Feed</option>
          <option value="MILK">Milk</option>
          <option value="GHEE">Ghee</option>
          <option value="MEDICINE">Medicine</option>
          <option value="OTHERS">Others</option>
        </select>
        <br />
        <br />

        <label>Amount</label>
        <br />
        <input
        className="border"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <br />

        <label>Note</label>
        <br />
        <textarea
        className="border"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <br />
        <br />

        <button className="border" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddDeductionPage;
