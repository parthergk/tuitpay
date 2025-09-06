import { NextRequest, NextResponse } from "next/server";
import { connectTodb, User } from "@repo/db";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token missing" },
        { status: 400 }
      );
    }

    let decoded: { id: string; email: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
      };
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    await connectTodb();

    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (user.verifyCodePurpose === "register") {
      if (user.isVerified) {
        return NextResponse.json(
          { success: false, error: "User already verified" },
          { status: 400 }
        );
      }

      user.isVerified = true;
      await user.save();
      return NextResponse.json(
        { success: true, message: "verifyed successfully" },
        { status: 201 }
      );
    }

    if (user.verifyCodePurpose === "forgot-password") {
      await User.updateOne(
        { email: user.email },
        {
          $set: { verifyCodePurpose: "reset-allowed" },
        }
      );

      return NextResponse.json(
        {
          success: true,
          message: "verified, you can now reset your password",
          purpose: user.verifyCodePurpose,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid purpose",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 400 }
    );
  }
}
