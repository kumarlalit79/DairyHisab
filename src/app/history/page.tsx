"use client";

import { useSettlementStore } from "@/store/settlementStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HistoryPage = () => {
  const router = useRouter();

  const { settlements, loading, fetchSettlements } = useSettlementStore();

  useEffect(() => {
    fetchSettlements();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Settlement History</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>Status</th>

            <th>Start Date</th>

            <th>End Date</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {settlements.map((item) => (
            <tr key={item._id}>
              <td>{item?.status}</td>

              <td>{new Date(item.startDate).toLocaleDateString()}</td>

              <td>
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <button className="bg-pink-500" onClick={() => router.push(`/history/${item._id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
