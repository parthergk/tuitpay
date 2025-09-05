import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@repo/validation/types";
import { connectTodb, User } from "@repo/db";
import { sendOTP } from "../../../../helpers/sendOTP";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedBody = UserSchema.safeParse(body);
  
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid Inputs"
      },
      { status: 400 }
    );
  }

  try {
    await connectTodb();

    const existingUser = await User.findOne({email: parsedBody.data.email});

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: `User already exists with this ${existingUser.email}`,
        },
        { status: 409 }
      );
    }

const verificationCode = Math.floor(Math.random() * 10000)
  .toString()
  .padStart(4, "0");


    const user = await User.create({
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      verifyCode: verificationCode,
      verifyCodePurpose: "register",
      verifyCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
      isVerified: false,
    });

    const emailResponse = await sendOTP(
      parsedBody.data.email,
      verificationCode
    );

    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        error: emailResponse.error,
      },{status: emailResponse.status});
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
