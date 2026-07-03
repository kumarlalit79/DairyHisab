import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      mobile,
      password,
      address,
      village,
      dairyCode,
      secretaryName,
    } = body;

    if (
      !name ||
      !mobile ||
      !password ||
      !address ||
      !village ||
      !dairyCode
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields are mandatory.",
        },
        {
          status: 400,
        }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number must be 10 digits.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({
      mobile,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number already registered.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      mobile: mobile.trim(),
      password: hashedPassword,
      address: address.trim(),
      village: village.trim(),
      dairyCode: dairyCode.trim(),
      secretaryName: secretaryName?.trim() || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration Successful",
        data: {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}