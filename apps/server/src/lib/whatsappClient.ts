import { User } from "@repo/db";
import twilio from "twilio";
import {IStudent, IFeePayment} from "@repo/types"


function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export async function whatsappSender(student: IStudent, fee: IFeePayment) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);

  const teacher = await User.findById(student.teacherId);
  if (!teacher) {
    throw new Error("Teacher not found for this student");
  }

  try {
    const contentVariables = {
      "1": student.name,
      "2": formatDate(fee.dueDate),
      "3": fee.amount.toString(),
      "4": formatDate(fee.dueDate),
      "5": student.name,
      "6": teacher.name,
      "7": teacher.tuitionClassName || "Your Tuition",
      "8": teacher.phone
    };
    const response = await client.messages.create({
      from: "whatsapp:+14155238886",
      contentSid: "HX68372c8616d5bbc2a34f597697febc94",
      contentVariables: JSON.stringify(contentVariables),
      to: `whatsapp:+91${student.contact}`,
    });
  } catch (error) {
    console.log("Error:", error);
  }
}
