"use client";

import { useSettlementStore } from "@/store/settlementStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const SettlementDetailsPage = () => {
  const { id } = useParams();

  const { settlementDetails, loading, fetchSettlementDetails } =
    useSettlementStore();

  useEffect(() => {
    fetchSettlementDetails(id as string);
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (!settlementDetails) {
    return <h2>No data</h2>;
  }
  console.log("settlementDetails-",settlementDetails);

  return (
    <div>
      <h2>Settlement Details Page</h2>
      <h3>Settlement</h3>

      <p>Status : {settlementDetails?.settlement?.status}</p>
      

      <p>
        Start :{" "}
        {new Date(settlementDetails?.settlement?.startDate).toLocaleDateString()}
      </p>

      <hr />

      <h2>Milk Entries</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Date</th>

            <th>Shift</th>

            <th>Milk</th>

            <th>Bonus</th>
          </tr>
        </thead>

        <tbody>
          {settlementDetails?.milkEntries?.map((entry: any) => (
            <tr key={entry._id}>
              <td>{new Date(entry.date).toLocaleDateString()}</td>

              <td>{entry.shift}</td>

              <td>{entry.milkAmount}</td>

              <td>{entry.bonus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Deductions</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Date</th>

            <th>Type</th>

            <th>Amount</th>

            <th>Note</th>
          </tr>
        </thead>

        <tbody>
          {settlementDetails?.deductions?.map((item: any) => (
            <tr key={item._id}>
              <td>{new Date(item.date).toLocaleDateString()}</td>

              <td>{item.type}</td>

              <td>{item.amount}</td>

              <td>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SettlementDetailsPage;
