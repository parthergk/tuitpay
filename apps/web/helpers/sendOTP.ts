import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS,
  },
});

export async function sendOTP(
  email: string,
  name: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  try {
    await transporter.sendMail({
      from: process.env.SENDGRID_FROM,
      to: email,
      subject: "Your Verification Code",
      html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2c3e50; margin-top: 0;">Hi ${name},</h2>
          <p>Thank you for signing up for <strong>Tuition Fee Tracker</strong>! To verify your email and activate your account, please use the code below:</p>
          <div style="margin: 24px 0; padding: 16px; background-color: #f1f5f9; border: 1px dashed #bbb; text-align: center;">
          <strong style="font-size: 24px; letter-spacing: 2px; color: #2c3e50;">${code}</strong>
          </div>
  
          <p>This code will expire in 10 minutes. If you didn’t sign up, please ignore this email or let us know right away.</p>
  
          <p>Thanks for choosing us to make your fee tracking hassle-free!</p>
  
          <p>Best wishes,<br />The Tuition Fee Tracker Team</p>
  
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
  
          <p style="font-size: 12px; color: #888;">
          This email was sent to ${email}. For help, reach out to us at support@tuitionfeetracker.in
          </p>
          </div>

        `,
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
}
