import React from "react";

const DashboardSummary = ({ dashboard }) => {
  return (
    <div>
      <h2>Todays summary</h2>

      <p>Todays milk amount: {dashboard?.today?.milkAmount}</p>
      <p>Todays bonus: {dashboard?.today?.bonus}</p>

      <hr />

      <h2>Current Settlement</h2>

      <p>Milk amount : {dashboard?.currentSettlement?.milkAmount}</p>

      <p>Bonus : {dashboard?.currentSettlement?.bonus}</p>

      <p>Total Deduciton : {dashboard?.currentSettlement?.deductions}</p>

      <p>
        Expected Milk Payment :{" "}
        {dashboard?.currentSettlement?.expectedMilkPayment}
      </p>
    </div>
  );
};

export default DashboardSummary;
