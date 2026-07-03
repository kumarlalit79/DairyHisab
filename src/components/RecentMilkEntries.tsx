import React from "react";

const RecentMilkEntries = () => {
  return (
    <div>
      <h2>Recent Milk Entries</h2>
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

export default RecentMilkEntries;
