import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getActiveSettlement } from "@/lib/settlement";
import MilkEntry from "@/models/MilkEntry";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const userId = await getUserId();

    const settlement = await getActiveSettlement(userId);

    if (!settlement) {
      return errorResponse("No active settlement found.", 404);
    }

    const { id } = await params;

    const { date, shift, milkAmount, bonus } = await req.json();

    const updateData: Record<string, unknown> = {};

    if (date) {
      const entryDate = new Date(date);
      entryDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (entryDate > today) {
        return errorResponse("Future dates are not allowed.", 400);
      }

      updateData.date = entryDate;
    }

    if (shift) {
      if (!["AM", "PM"].includes(shift)) {
        return errorResponse("Invalid shift.", 400);
      }

      updateData.shift = shift;
    }

    if (milkAmount != null) {
      updateData.milkAmount = milkAmount;
    }

    if (bonus != null) {
      updateData.bonus = bonus;
    }

    const entry = await MilkEntry.findOneAndUpdate(
      {
        _id: id,
        userId,
        settlementId: settlement._id,
      },
      updateData,
      {
        new: true,
      },
    );

    if (!entry) {
      return errorResponse("Milk entry not found.", 404);
    }

    return successResponse("Milk entry updated successfully.", entry);
  } catch (error: any) {
    if (error.code === 11000) {
      return errorResponse("Milk entry already exists for this shift.", 409);
    }

    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const userId = await getUserId();

    const settlement = await getActiveSettlement(userId);

    if (!settlement) {
      return errorResponse("No active settlement found.", 404);
    }

    const { id } = await params;

    const entry = await MilkEntry.findOneAndDelete({
      _id: id,
      userId,
      settlementId: settlement._id,
    });

    if (!entry) {
      return errorResponse("Milk entry not found.", 404);
    }

    return successResponse("Milk entry deleted successfully.");
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
