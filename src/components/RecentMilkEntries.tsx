import React from "react";

interface Props {
  entries: any[];
}

export default function RecentMilkEntries({
  entries
}: Props){
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
          {entries.length === 0 ? (
            <tr>

              <td colSpan={4}>
                No Milk Entries
              </td>

            </tr>

          ) : (
            entries.map((entry) => (
              <tr key={entry._id}>
                <td>
                  {
                    new Date(
                      entry.date
                    ).toLocaleDateString()
                  }
                </td>
                <td>{entry.shift}</td>
                <td>{entry.milkAmount}</td>
                <td>{entry.bonus}</td>
              </tr>
            ))
          )}
        
        </tbody>
      </table>
    </div>
  );
};