import React from "react";

const RecentDeductions = () => {
  return (
    <div>
      <h2>Recent Deduction</h2>
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
          <tr>
            <td>Loading...</td>

            <td>-</td>

            <td>-</td>

            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentDeductions;
