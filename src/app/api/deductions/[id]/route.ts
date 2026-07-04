import { DEDUCTION_TYPE } from "@/constants/enums";
import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getActiveSettlement } from "@/lib/settlement";
import Deduction from "@/models/Deduction";
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

    const { date, type, amount, note } = await req.json();

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

    if (type) {
      if (!Object.values(DEDUCTION_TYPE).includes(type)) {
        return errorResponse("Invalid deduction type.", 400);
      }

      updateData.type = type;
    }

    if (amount != null) {
      if (amount <= 0) {
        return errorResponse("Amount must be greater than zero.", 400);
      }

      updateData.amount = amount;
    }

    if (note !== undefined) {
      updateData.note = note.trim();
    }

    const deduction = await Deduction.findOneAndUpdate(
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

    if (!deduction) {
      return errorResponse("Deduction not found.", 404);
    }

    return successResponse("Deduction updated successfully.", deduction);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const userId = await getUserId();

    const settlement = await getActiveSettlement(userId);

    if (!settlement) {
      return errorResponse(
        "No active settlement found.",
        404
      );
    }

    const { id } = await params;

    const deduction = await Deduction.findOneAndDelete({
      _id: id,
      userId,
      settlementId: settlement._id,
    });

    if (!deduction) {
      return errorResponse(
        "Deduction not found.",
        404
      );
    }

    return successResponse(
      "Deduction deleted successfully."
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      "Internal server error.",
      500
    );
  }
}