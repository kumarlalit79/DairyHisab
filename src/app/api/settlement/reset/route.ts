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
    today.setHours(0, 0, 0, 0);

    activeSettlement.status = "COMPLETED";
    activeSettlement.endDate = new Date(today);
    activeSettlement.completedAt = new Date(today);
    activeSettlement.markModified("endDate");
    activeSettlement.markModified("completedAt");

    await activeSettlement.save();

    const newSettlement = await Settlement.create({
      userId,
      startDate: new Date(today),
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
