import { User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { sendOTP } from "../../../../helpers/sendOTP";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json(
      {
        success: false,
        message: "Email is required",
      },
      { status: 400 }
    );
  }

  try {
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

    const verificationCode = Math.floor(Math.random() * 10000).toString();

    await User.updateOne(
      { email: body.email },
      {
        $set: {
          verifyCode: verificationCode,
          verifyCodePurpose: "forgot-password",
          verifyCodeExpires: Date.now(),
        },
      }
    );

    const emailResponse = await sendOTP(
      user.email,
      verificationCode,
      user.name
    );
    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        message: emailResponse.message,
      });
    }

    return NextResponse.json({message: "OTP sended successfully"}, {status: 200});
  } catch (error) {
    console.error("Error Restoring password:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
