import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getActiveSettlement, getOrCreateSettlement } from "@/lib/settlement";
import MilkEntry from "@/models/MilkEntry";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserId();
    const { date, shift, milkAmount, bonus } = await req.json();

    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (entryDate > today) {
      return errorResponse(
        "Future dates are not allowed.",
        400
      );
    }

    if (!date || !shift || milkAmount == null || bonus == null) {
      return errorResponse("All fields are required.", 400);
    }

    if (!["AM", "PM"].includes(shift)) {
      return errorResponse("Invalid shift", 400);
    }

    if (milkAmount <= 0) {
      return errorResponse("Milk amount must be greater than 0.", 400);
    }

    if (bonus < 0) {
      return errorResponse("Bonus cannot be negative.", 400);
    }

    const settlement = await getOrCreateSettlement(userId, new Date(date));

    const entry = await MilkEntry.create({
      userId,
      settlementId: settlement._id,
      date: entryDate,
      shift,
      milkAmount,
      bonus,
    });

    return successResponse("Milk entry added successfully.", entry, 201);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return errorResponse("Milk entry already exists for this shift.", 409);
    }

    console.error(error);

    return errorResponse("Internal Server Error", 500);
  }
}

export async function GET() {
  try {
    await connectDB();

    const userId = await getUserId();

    const settlement = await getActiveSettlement(userId);

    if (!settlement) {
      return successResponse("No active settlement found.", []);
    }

    const entries = await MilkEntry.find({
      settlementId: settlement._id,
    }).sort({
      date: -1,
      shift: -1,
    });

    return successResponse("Milk entries fetched successfully.", entries);
  } catch (error) {
    console.error(error);

    return errorResponse("Unauthorized", 401);
  }
}
