import { connectTodb, Contact } from "@repo/db";
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Body:", body);

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input. Please fill all required fields correctly." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;


    await connectTodb();
    await Contact.create({ name, email, subject, message });

    await transporter.sendMail({
      from: process.env.BREVO_FROM,
      to: "gauravkumar81464@gmail.com", // you can change this to a dynamic admin email later
      subject: subject || "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error handling contact form:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
