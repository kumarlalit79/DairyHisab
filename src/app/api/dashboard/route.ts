import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getActiveSettlement } from "@/lib/settlement";
import Deduction from "@/models/Deduction";
import MilkEntry from "@/models/MilkEntry";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    await connectDB();

    const userId = await getUserId();

    const settlement = await getActiveSettlement(userId);
    if (!settlement) {
      return successResponse("Dashboard fetched successfully.", {
        today: {
          milkAmount: 0,
          bonus: 0,
        },

        currentSettlement: {
          milkAmount: 0,
          bonus: 0,
          deductions: 0,
          expectedMilkPayment: 0,
        },

        recentMilkEntries: [],
        recentDeductions: [],
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const milkEntries = await MilkEntry.find({
      settlementId: settlement._id,
    });

    const recentMilkEntries = [...milkEntries]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    const deductions = await Deduction.find({
      settlementId: settlement._id,
    });

    const recentDeductions = [...deductions]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    let todayMilkAmount = 0;
    let todayBonus = 0;

    let totalMilkAmount = 0;
    let totalBonus = 0;

    let totalDeductions = 0;

    for (const entry of milkEntries) {
      totalMilkAmount += entry.milkAmount;
      totalBonus += entry.bonus;

      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      if (entryDate.getTime() === today.getTime()) {
        todayMilkAmount += entry.milkAmount;
        todayBonus += entry.bonus;
      }
    }

    for (const deduction of deductions) {
      totalDeductions += deduction.amount;
    }
    console.log("NEW DASHBOARD API");
    return successResponse("Dashboard fetched successfully.", {
      today: {
        milkAmount: todayMilkAmount,
        bonus: todayBonus,
      },

      currentSettlement: {
        milkAmount: totalMilkAmount,
        bonus: totalBonus,
        deductions: totalDeductions,
        expectedMilkPayment: totalMilkAmount - totalDeductions,
      },
      recentMilkEntries,
      recentDeductions,
    });
  } catch (error) {
    console.error(error);

    return errorResponse("Internal Server Error", 500);
  }
}
