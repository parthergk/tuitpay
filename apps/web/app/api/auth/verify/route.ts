import { connectTodb, User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { CodeSchema } from "@repo/validation";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    console.log("Body", body);

    const parsedBody = CodeSchema.safeParse(body);
    

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and verification code are required",
        },
        { status: 400 }
      );
    }
    
    await connectTodb();
    const user = await User.findOne({ email: parsedBody.data.email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No user found with this email",
        },
        { status: 404 }
      );
    }

    if (user.verifyCodePurpose === "register") {
      if (user.isVerified) {
        return NextResponse.json(
          {
            success: true,
            message: "User is already verified",
          },
          { status: 200 }
        );
      }

      if (user.verifyCode !== parsedBody.data.code) {
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
          $set: { isVerified: true },
          $unset: {
            verifyCode: "",
            verifyCodePurpose: "",
            verifyCodeExpires: "",
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
    }

    if (user.verifyCodePurpose === "forgot-password") {    
        
      if (user.verifyCode !== parsedBody.data.code) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid verification code",
          },
          { status: 400 }
        );
      }
      
      if (user.verifyCodeExpires < Date.now()) {
        return NextResponse.json(
          {
            success: false,
            message: "Verification code expired",
          },
          { status: 400 }
        );
      }

      await User.updateOne(
        { email: body.email },
        {
          $set: { verifyCodePurpose: "reset-allowed" },
        }
      );

      return NextResponse.json(
        {
          success: true,
          message: "OTP verified, you can now reset your password",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid OTP purpose",
      },
      { status: 400 }
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
