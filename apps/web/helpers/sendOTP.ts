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
): Promise<{ success: boolean; message?: string; error?: string; status: number }> {
  try {
    await transporter.sendMail({
      from: process.env.BREVO_FROM,
      to: email,
      subject: "Verify Your Email - Tuition Fee Tracker",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2c3e50; margin-top: 0;">Hi ${email.split("@")[0]},</h2>
          <p>Thank you for signing up for <strong>Tuition Fee Tracker</strong>! To verify your email and activate your account, please click the button below:</p>

          <div style="margin: 24px 0; text-align: center;">
            <a href="${verificationUrl}" 
               style="background-color: #2563eb; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; display: inline-block;">
              Verify My Email
            </a>
          </div>

          <p>If the button above doesn’t work, you can also copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; color: #2563eb;">${verificationUrl}</p>

          <p>This verification link will expire in 15 minutes. If you didn’t sign up, please ignore this email or contact us right away.</p>

          <p>Thanks for choosing us to make your fee tracking hassle-free!</p>

          <p>Best wishes,<br />The Tuition Fee Tracker Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />

          <p style="font-size: 12px; color: #888;">
            This email was sent to ${email}. For help, reach out to us at support@tuitionfeetracker.in
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
