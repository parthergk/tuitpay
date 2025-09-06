import { connectTodb, User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "../../../../helpers/sendOTP";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json(
      {
        success: false,
        error: "Email is required",
      },
      { status: 400 }
    );
  }

  try {
    await connectTodb();
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "No user found with this email",
        },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const verificationUrl = `${process.env.CLIENT_URL}/verify?token=${token}`;

    await User.updateOne(
      { email: body.email },
      {
        $set: {
          verifyCodePurpose: "forgot-password",
        },
      }
    );

    const emailResponse = await sendVerificationEmail(
      user.email,
      verificationUrl
    );
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          error: emailResponse.message,
        },
        {
          status: emailResponse.status,
        }
      );
    }

    return NextResponse.json(
      { success: true, message: "New Verification link sended" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Restoring password:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
