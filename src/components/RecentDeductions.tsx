import React from "react";

interface Props {
  deductions: any[];
}


const RecentDeductions = ({deductions}: any[]) => {
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
          {deductions.length ===0 ? (
                          <td colSpan={4}>
                No Deductions
              </td>

          ) : (
            deductions.map((deduction) => (
              <tr key={deduction._id}>
                <td>
                  {new Date(
                    deduction.date
                  ).toLocaleDateString()}
                </td>
                <td>{deduction.type}</td>
                <td>{deduction.amount}</td>
                <td>{deduction.note}</td>
              </tr>
            ))
          )}
          <tr>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentDeductions;
