import { connectTodb, User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

   await connectTodb();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        success: true,
        exists: true,
        message: "User exists, redirect to login",
      });
    } else {
      return NextResponse.json({
        success: true,
        exists: false,
        message: "User not found, redirect to register",
      });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}