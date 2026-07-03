import { connectDB } from "@/lib/db";
import { getUserId } from "@/lib/auth";

import Settlement from "@/models/Settlement";

import {
  successResponse,
  errorResponse,
} from "@/utils/response";

export async function GET() {
  try {
    await connectDB();

    const userId = await getUserId();

    const settlements = await Settlement.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return successResponse(
      "Settlements fetched successfully.",
      settlements
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      "Internal server error.",
      500
    );
  }
}