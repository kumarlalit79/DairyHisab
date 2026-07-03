import { Card, formatCurrency } from "@/components/ui";
import { Banknote, Droplets, ReceiptText, WalletCards } from "lucide-react";
import React from "react";

interface DashboardSummaryProps {
  dashboard: {
    today?: {
      milkAmount?: number;
      bonus?: number;
    };
    currentSettlement?: {
      milkAmount?: number;
      bonus?: number;
      deductions?: number;
      expectedMilkPayment?: number;
    };
    currentSettement?: {
      milkAmount?: number;
      bonus?: number;
      deductions?: number;
      expectedMilkPayment?: number;
    };
  };
}

const DashboardSummary = ({ dashboard }: DashboardSummaryProps) => {
  const settlement = dashboard?.currentSettlement ?? dashboard?.currentSettement;

  const cards = [
    {
      label: "Today's Milk",
      value: formatCurrency(dashboard?.today?.milkAmount),
      meta: "Collected today",
      icon: Droplets,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      label: "Today's Bonus",
      value: formatCurrency(dashboard?.today?.bonus),
      meta: "Bonus earned",
      icon: Banknote,
      tone: "bg-[var(--primary-light)] text-[var(--primary)]",
    },
    {
      label: "Current Settlement",
      value: formatCurrency(settlement?.milkAmount),
      meta: `${formatCurrency(settlement?.bonus)} bonus`,
      icon: ReceiptText,
      tone: "bg-violet-50 text-violet-700",
    },
    {
      label: "Expected Payment",
      value: formatCurrency(settlement?.expectedMilkPayment),
      meta: `${formatCurrency(settlement?.deductions)} deductions`,
      icon: WalletCards,
      tone: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.label}
            className="group p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">
                  {item.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-[var(--text)]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {item.meta}
                </p>
              </div>
              <div className={`rounded-2xl p-3 ${item.tone}`}>
                <Icon className="size-5" aria-hidden="true" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardSummary;
