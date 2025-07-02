import { bcryptjs } from "@repo/auth";
import { connectTodb, User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email || !body.resetPassword) {
    return NextResponse.json(
      { success: false, message: "Email and new password are required" },
      { status: 400 }
    );
  }

  try {
    await connectTodb();
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "No user found with this email" },
        { status: 404 }
      );
    }

    if (user.verifyCodePurpose !== "reset-allowed") {
      return NextResponse.json(
        { success: false, message: "You are not allowed to reset the password. Please verify the OTP first." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(body.resetPassword, 10);

    await User.updateOne(
      { email: body.email },
      {
        $set: { password: hashedPassword },
        $unset: {
          verifyCode: "",
          verifyCodePurpose: "",
          verifyCodeExpires: "",
        },
      }
    );

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
