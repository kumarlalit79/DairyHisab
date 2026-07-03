export interface DashboardData {
  today: {
    milkAmount: number;
    bonus: number;
  };

  currentSettement: {
    milkAmount: number;
    bonus: number;
    deductions: number;
    expectedMilkPayment: number;
  };

  recentMilkEntries: any[];

  recentDeductions: any[];
}
