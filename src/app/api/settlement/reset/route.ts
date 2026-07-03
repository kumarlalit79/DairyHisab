import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Settlement from "@/models/Settlement";
import { errorResponse, successResponse } from "@/utils/response";

export async function POST() {
  try {
    await connectDB();

    const userId = await getUserId();

    const activeSettlement = await Settlement.findOne({
      userId,
      status: "ACTIVE",
    });

    if (!activeSettlement) {
      return errorResponse("No active settlement found", 404);
    }

    const today = new Date();

    activeSettlement.status = "COMPLETED";
    activeSettlement.entryDate = today;
    activeSettlement.completedAt = today;

    await activeSettlement.save();

    const newSettlement = await Settlement.create({
      userId,
      startDate: today,
    });

    return successResponse(
      "Settlement reset successfully.",
      newSettlement,
      201,
    );
  } catch (error) {
    console.error(error);

    return errorResponse("Internal Server Error.", 500);
  }
}
