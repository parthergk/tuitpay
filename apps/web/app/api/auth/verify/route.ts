import { User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email || !body.code) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and verification code are required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: body.email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No user found with this email",
        },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        {
          success: true,
          message: "User is already verified",
        },
        { status: 200 }
      );
    }

    if (user.verifyCode !== body.code) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      );
    }

    await User.updateOne(
      { email: body.email },
      {
        $set: {
          isVerified: true,
        },
        $unset: {
          verifyCode: "",
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User verified successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
