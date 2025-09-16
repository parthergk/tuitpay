import { connectTodb, User } from "@repo/db";
import { UserUpdateSchema } from "@repo/validation/types";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  console.log("Route called");

  const body = await req.json();

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

  const parsedBody = UserUpdateSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid inputs", success: false },
      { status: 400 }
    );
  }

  try {
    await connectTodb();

    const existUser = await User.findOne({ email: token.email });
    if (!existUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: token.email },
      {
        name: parsedBody.data.name,
        phone: parsedBody.data.phone,
        tuitionClassName: parsedBody.data.tuitionClassName,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        data: {
          name: updatedUser?.name,
          phone: updatedUser?.phone,
          tuitionClassName: updatedUser?.tuitionClassName,
        },
        message: "User updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Internal server error. Please try again later.";
    return NextResponse.json(
      { error: errorMsg, success: false },
      { status: 500 }
    );
  }
}
