import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@repo/validation/types";
import { connectTodb, User } from "@repo/db";
import { sendVerificationEmail } from "../../../../helpers/sendOTP";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedBody = UserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid Inputs",
      },
      { status: 400 }
    );
  }

  try {
    await connectTodb();

    const existingUser = await User.findOne({ email: parsedBody.data.email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User already exists with this Email",
        },
        { status: 409 }
      );
    }

    const user = await User.create({
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      isVerified: false,
      verifyCodePurpose: "register"
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const verificationUrl = `${process.env.CLIENT_URL}/verify?token=${token}`;

    const emailResponse = await sendVerificationEmail(
      parsedBody.data.email,
      verificationUrl
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          error: emailResponse.error,
        },
        { status: emailResponse.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
          plan: user.planType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
