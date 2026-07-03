import { connectDB } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { mobile, password } = await req.json();

    if (!mobile || !password) {
      return NextResponse.json(
        { success: false, message: "Mobile number and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number or password.",
        },
        {
          status: 401,
        },
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number or password.",
        },
        {
          status: 401,
        },
      );
    }

    const token = generateToken(user._id.toString());

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        data: {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
        },
      },
      {
        status: 200,
      },
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
