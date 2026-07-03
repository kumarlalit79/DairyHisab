import { connectDB } from "@/lib/db";
import { getUserId } from "@/lib/auth";

import Settlement from "@/models/Settlement";
import MilkEntry from "@/models/MilkEntry";
import Deduction from "@/models/Deduction";

import {
  successResponse,
  errorResponse,
} from "@/utils/response";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const userId = await getUserId();

    const { id } = await params;

    const settlement = await Settlement.findOne({
      _id: id,
      userId,
    });

    if (!settlement) {
      return errorResponse(
        "Settlement not found.",
        404
      );
    }

    const milkEntries = await MilkEntry.find({
      settlementId: settlement._id,
    }).sort({
      date: -1,
    });

    const deductions = await Deduction.find({
      settlementId: settlement._id,
    }).sort({
      date: -1,
    });

    return successResponse(
      "Settlement fetched successfully.",
      {
        settlement,
        milkEntries,
        deductions,
      }
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      "Internal server error.",
      500
    );
  }
}