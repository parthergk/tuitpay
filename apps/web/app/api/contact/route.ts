import { Contact } from "@repo/db";
import { ContactSchema } from "@repo/validation/types";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export async function POST(req: NextRequest, res: NextResponse) {
  const body = req.body;
  const parsedbody = ContactSchema.safeParse(body);

  if (!parsedbody.success) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    await Contact.create({
      name: parsedbody.data.name,
      email: parsedbody.data.email,
      subject: parsedbody.data.subject,
      message: parsedbody.data.message,
    });

    return NextResponse.json(
      { message: "Message received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling contact form:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
