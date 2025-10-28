import { connectTodb, FeePayment, NotificationLog, Student } from "@repo/db";
import { smsSender } from "../lib/twilioClient";
import { whatsappSender } from "../lib/whatsappClient";
import { getTodayDate } from "../utils/dateUtils";
import { IStudent, IFeePayment } from "@repo/types";


export class FeeAutomationService {
  static async generateMonthlyFees(): Promise<void> {
    const today = getTodayDate();
    await connectTodb();

    const activeStudents = await Student.find({ isActivate: true });

    for (const student of activeStudents) {
      const shouldGenerate = await this.shouldGenerateNewFee(student, today);
      console.log("Should generate new fee record", shouldGenerate);
      if (shouldGenerate) {
        await this.createFeeRecord(student, today);
      }
    }
  }

  private static async shouldGenerateNewFee(student: IStudent, today: Date) {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const feeExists = await FeePayment.findOne({
      studentId: student._id,
      dueDate: {
        $gte: new Date(Date.UTC(currentYear, currentMonth, 1)),
        $lt: new Date(Date.UTC(currentYear, currentMonth + 1, 1)),
      },
    });

    if (feeExists) return false;

    const dueDate = new Date(
      Date.UTC(currentYear, currentMonth, student.feeDay)
    );

    const todayDate = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );

    return todayDate >= dueDate;
  }

  private static async createFeeRecord(student: IStudent, today: Date) {
    const dueDate = new Date(
      Date.UTC(today.getFullYear(),
      today.getMonth(),
      student.feeDay)
    );

    const reminderDate = new Date(dueDate);
    reminderDate.setDate(reminderDate.getDate() - 1);

    await new FeePayment({
      studentId: student._id,
      teacherId: student.teacherId,
      amount: student.monthlyFee,
      status: "pending",
      dueDate: dueDate,
      reminderCount: 0,
      nextReminderAt: reminderDate,
    }).save();

    await Student.findByIdAndUpdate(student._id, { lastFeeDueDate: dueDate });

    console.log(
      `[✅] Fee record created for ${student.name} due ${dueDate.toDateString()}`
    );
  }

  static async sendFeeReminders(): Promise<void> {
    await connectTodb();
    const students = await Student.find({ isActivate: true });

    for (const student of students) {
      await this.processStudentReminders(student);
    }
  }

  private static async processStudentReminders(
    student: IStudent
  ): Promise<void> {
    const now = getTodayDate();
    const pendingFees = await FeePayment.find({
      studentId: student._id,
      status: "pending",
    });

    for (const fee of pendingFees) {
      if (fee.reminderCount >= 3) {
        await FeePayment.findByIdAndUpdate(fee._id, { status: "overdue" });
        console.log(
          `[⚠️] Marked overdue: ${student.name}, Due: ${fee.dueDate.toDateString()}`
        );
        continue;
      }


      if (fee.nextReminderAt && fee.nextReminderAt <= now) {
        await this.sendNotification(student, fee, "reminder");

        const nextReminderAt = getTodayDate();
        nextReminderAt.setDate(nextReminderAt.getDate() + 1);

        fee.reminderCount++;
        fee.lastReminderAt = now;
        fee.nextReminderAt = nextReminderAt;

        await fee.save();
        console.log(
          `[🔔] Reminder sent to ${student.name}, next on ${nextReminderAt.toDateString()}`
        );
      }
    }
  }

  private static async sendNotification(
    student: IStudent,
    fee: IFeePayment,
    type: "reminder" | "overdue" | "payment_received"
  ): Promise<void> {
    const channel = "whatsapp";

    const log = await NotificationLog.create({
      teacherId: student.teacherId,
      studentId: student._id,
      feePaymentId: fee._id,
      channel: channel,
      type: type,
      status: "pending",
    });

    try {
      await this.sendNotificationViaChannel(student, fee, type, channel);

      log.status = "sent";
      log.sentAt = getTodayDate();
      await log.save();

      console.log(`[📣] ${type} sent to ${student.contact} via ${channel}`);
    } catch (err) {
      log.status = "failed";
      log.errorMessage = err instanceof Error ? err.message : "Unknown";
      await log.save();

      console.error(`[❌] Failed to send ${type}:`, err);
    }
  }

  private static async sendNotificationViaChannel(
    student: IStudent,
    fee: IFeePayment,
    type: string,
    channel: string
  ): Promise<void> {
    // const message = this.generateNotificationMessage(student, fee, type);

    switch (channel) {
      case "sms":
        smsSender(student.contact);
        console.log(`Sending SMS to ${student.contact}`);
        break;
      case "whatsapp":
        console.log(`Sending WhatsApp to ${student.name}`);
        whatsappSender({
          name: student.name,
          contact: student.contact,
          teacherId: student.teacherId
        }, {dueDate:fee.dueDate, amount: fee.amount}, type);
        break;
      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }
  }

  // private static generateNotificationMessage(
  //   student: IStudent,
  //   fee: IFeePayment,
  //   type: string
  // ): string {
  //   const dueDate = fee.dueDate.toDateString();
  //   switch (type) {
  //     case "reminder":
  //       return `Reminder: ${student.name}'s fee of ₹${fee.amount} is due on ${dueDate}.`;
  //     case "overdue":
  //       return `Overdue Alert: ${student.name}'s fee of ₹${fee.amount} was due on ${dueDate}.`;
  //     case "payment_received":
  //       return `Payment Received: ${student.name} paid ₹${fee.amount} for ${dueDate}.`;
  //     default:
  //       return `Fee update for ${student.name}.`;
  //   }
  // }
}

export const cronJobs = {
  generateMonthlyFees: () => FeeAutomationService.generateMonthlyFees(),
  sendsendFeeReminders: () => FeeAutomationService.sendFeeReminders(),
};
