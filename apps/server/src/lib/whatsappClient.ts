import { User } from "@repo/db";
import twilio from "twilio";
import { Schema } from "mongoose";

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function whatsappSender(
  student: { name: string; contact: string; teacherId: Schema.Types.ObjectId },
  fee: { dueDate: Date; amount: number },
  type:string
): Promise<{ success: boolean; message: string; error?: any }> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error("Twilio credentials are missing in environment variables.");
    }

    const client = twilio(accountSid, authToken);
    const teacher = await User.findById(student.teacherId);

    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found for this student.",
      };
    }

    const contentVariables = {
      "1": student.name,
      "2": formatDate(fee.dueDate),
      "3": fee.amount.toString(),
      "4": formatDate(fee.dueDate),
      "5": student.name,
      "6": teacher.name,
      "7": teacher.tuitionClassName || "Your Tuition",
      "8": teacher.phone,
    };

    const response = await client.messages.create({
      from: "whatsapp:+14155238886",
      contentSid:
        type === "reminder"
          ? "HX68372c8616d5bbc2a34f597697febc94"
          : "HX34d8a3c7d84adedfb4c13bf6f657132d",
      contentVariables: JSON.stringify(contentVariables),
      to: `whatsapp:+91${student.contact}`,
    });

    if (response.sid) {
      return {
        success: true,
        message: "WhatsApp reminder sent successfully.",
      };
    } else {
      return {
        success: false,
        message: "Failed to send WhatsApp reminder. No response SID returned.",
      };
    }
  } catch (error: any) {
    console.error("Error sending WhatsApp reminder:", error.message || error);

    return {
      success: false,
      message: "Error sending WhatsApp reminder.",
      error: error.message || error,
    };
  }
}
