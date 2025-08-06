import { connectTodb, User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { sendOTP } from "../../../../helpers/sendOTP";

export async function POST(req: NextRequest) {
  const body = await req.json();
  await connectTodb();

  if (!body.email) {
    return NextResponse.json(
      {
        success: false,
        message: "Email is required",
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

  try {
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    user.set({
      verifyCode: verificationCode,
      verifyCodePurpose: "register",
      verifyCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
      isVerified: false,
    });
    await user.save();

    const emailResponse = await sendOTP(
      user.email,
      user.name,
      verificationCode
    );

    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        message: emailResponse.message,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "New OTP sent",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending new OTP:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
