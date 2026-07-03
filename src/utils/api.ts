import { connectDB } from "@/lib/db";

export async function connectToDatabase() {
    await connectDB();
}