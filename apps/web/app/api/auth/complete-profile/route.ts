import { connectTodb, User } from "@repo/db";
import { UserSchema, UserUpdateSchema } from "@repo/validation/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = req.body;
  const parsedBody = UserUpdateSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, error: "Invalid inputs" },
      { status: 400 }
    );
  }

  try {
    await connectTodb();

    const existingUser = await User.findOne({ email: parsedBody.data.email });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    await existingUser.updateOne(
      {
        name: parsedBody.data.name,
        phone: parsedBody.data.phone,
        tuitionClassName: parsedBody.data.className,
      },
      {
        runValidators: true,
      }
    );

    return NextResponse.json(
      { success: true, message: "Profile completed successfully" },
      { status: 201 }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.name : "Internal server error."
    if (errorMsg === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
        },
        { status: 400 }
      );
    }

    if (errorMsg === "MongoServerError") {
      return NextResponse.json(
        {
          success: false,
          error: "Duplicate data found",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
