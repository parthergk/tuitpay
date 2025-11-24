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

export async function sendVerificationEmail(
  email: string,
  verificationUrl: string
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  status: number;
}> {
  try {
    await transporter.sendMail({
      from: process.env.BREVO_FROM,
      to: email,
      subject: "Verify Your Email - Tuition Fee Tracker",
      html: `
<div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; padding: 32px; border-radius: 12px; border: 1px solid #f2f2f2; color: #1a1a1a;">

  <!-- Logo / Title -->
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #F97216;">Yadxy</h1>
  </div>

  <!-- Greeting -->
  <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600;">Hi ${email.split("@")[0]},</h2>

  <!-- Main Message -->
  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
    Thanks for signing up for <strong>Yadxy</strong>!  
    You're just one step away from activating your account.
  </p>

  <p style="margin: 0 0 24px 0;">Click the button below to verify your email:</p>

  <!-- Button -->
  <div style="text-align: center; margin: 32px 0;">
    <a href="${verificationUrl}"
       style="
         background: #F97216;
         color: #ffffff;
         padding: 12px 28px;
         border-radius: 6px;
         font-size: 16px;
         font-weight: 600;
         text-decoration: none;
         display: inline-block;">
      Verify Email
    </a>
  </div>

  <!-- Info -->
  <p style="margin: 0 0 24px 0;">
    This link expires in <strong>15 minutes</strong>.  
    If you didn’t request this, simply ignore the email.
  </p>

  <!-- Footer -->
  <p style="margin: 0 0 8px 0;">Thanks for joining the smarter way to manage reminders!</p>

  <p style="margin: 0 0 32px 0;">Warm regards,<br><strong>The Yadxy Team</strong></p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />

  <p style="font-size: 12px; color: #888;">
    This email was sent to ${email}.  
    If you need help, reach out: <a href="mailto:team@yadxy.com" style="color: #F97216;">team@yadxy.com</a>
  </p>

</div>

      `,
    });

    return {
      success: true,
      message: "Verification email sent successfully.",
      status: 201,
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      error: "Failed to send verification email.",
      status: 500,
    };
  }
}
