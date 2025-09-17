import { bcryptjs } from "@repo/auth";
import { connectTodb, User } from "@repo/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const token = await getToken({
    req: { cookies: req.cookies, headers: req.headers } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.email) {
    return NextResponse.json(
      { error: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  const body = await req.json();
  if (!body.password) {
    return NextResponse.json(
      { error: "Password is required", success: false },
      { status: 400 }
    );
  }

  try {
    await connectTodb();

    const existUser = await User.findOne({ email: token.email });
    if (!existUser) {
      return NextResponse.json(
        { error: "User not found with this email", success: false },
        { status: 404 }
      );
    }

    const hashedPassword = await bcryptjs.hash(body.password, 10);

    await existUser.updateOne({
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Password updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Server side error, please try again";
    return NextResponse.json(
      { error: errorMsg, success: false },
      { status: 500 }
    );
  }
}
