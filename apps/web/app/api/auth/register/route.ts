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
        message: "Invalid Inputs",
        errors: parsedBody.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    await connectTodb();

    const existingUser = await User.findOne({
      $or: [{ email: parsedBody.data.email }, { phone: parsedBody.data.phone }],
    });

    if (existingUser) {
      const field =
        existingUser.email === parsedBody.data.email ? "email" : "phone";

      return NextResponse.json(
        {
          success: false,
          message: `User already exists with this ${field}`,
        },
        { status: 409 }
      );
    }

    const verificationCode = Math.floor(Math.random() * 10000).toString();

    const user = await User.create({
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      phone: parsedBody.data.phone,
      verifyCode: verificationCode,
      verifyCodePurpose: "register",
      verifyCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
      isVerified: false,
    });

    const emailResponse = await sendOTP(
      parsedBody.data.email,
      parsedBody.data.name,
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
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
