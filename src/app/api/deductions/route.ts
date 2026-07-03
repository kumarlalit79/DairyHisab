import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getActiveSettlement, getOrCreateSettlement } from "@/lib/settlement";
import Deduction from "@/models/Deduction";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import { DEDUCTION_TYPE } from "@/constants/enums";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserId();

    const { date, type, amount, note } = await req.json();

    if (!date || !type || amount == null) {
      return errorResponse("All required fields are mandatory.", 400);
    }

    if (!Object.values(DEDUCTION_TYPE).includes(type)) {
      return errorResponse("Invalid deduction type.", 400);
    }

    if (amount <= 0) {
      return errorResponse("Amount must be greater than zero.", 400);
    }

    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const settlement = await getOrCreateSettlement(userId, entryDate);

    const deduction = await Deduction.create({
      userId,
      settlementId: settlement._id,
      date: entryDate,
      type,
      amount,
      note: note?.trim() || "",
    });

    return successResponse("Deduction added successfully.", deduction, 201);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal Server Error.", 500);
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

    const deductions = await Deduction.find({
      settlementId: settlement._id,
    }).sort({
      date: -1,
    });

    return successResponse("Deductions fetched successfully.", deductions);
  } catch (error) {
    console.error(error);

    return errorResponse("Unauthorized.", 401);
  }
}
