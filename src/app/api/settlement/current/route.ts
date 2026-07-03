import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getActiveSettlement } from "@/lib/settlement";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    await connectDB();
    const userId = await getUserId();
    const settlement = await getActiveSettlement(userId);

    if (!settlement) {
      return successResponse("No active settlement found", null);
    }

    return successResponse(
      "Current settlement fetched successfully",
      settlement,
    );
  } catch {
    return errorResponse("Unauthorized", 401);
  }
}
