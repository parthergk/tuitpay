import { connectTodb, FeePayment, NotificationLog, Student } from "@repo/db";
import mongoose from "mongoose";
import { smsSender } from "../lib/twilioClient";
import { whatsappSender } from "../lib/whatsappClient";

interface IStudent {
  _id: mongoose.ObjectId;
  teacherId: mongoose.ObjectId;
  name: string;
  contact: string;
  class: string;
  sub: string;
  monthlyFee: number;
  isActivate: boolean;
  joinDate: Date;
  feeDay: number;
  lastFeeDueDate: Date;
}

interface IFeePayment {
  _id: mongoose.ObjectId;
  studentId: mongoose.ObjectId;
  teacherId: mongoose.ObjectId;
  amount: number;
  paidAmount: number;
  dueDate: Date;
  status: "pending" | "paid" | "overdue" | "partial";
  reminderCount: number;
  lastReminderAt: Date;
  nextReminderAt: Date;
}

export class FeeAutomationService {
  static async start(): Promise<void> {
    await connectTodb();
  }

  static async generateMonthlyFees(): Promise<void> {
    const today = new Date();
    const activeStudents = await Student.find({ isActivate: true });

    for (const student of activeStudents) {
      const shouldGenerate = await this.shouldGenerateNewFee(student, today);
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
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    if (feeExists) return false;

    const dueDate = new Date(currentYear, currentMonth, student.feeDay);
    return today >= dueDate;
  }

  private static async createFeeRecord(student: IStudent, today: Date) {
    const dueDate = new Date(today.getFullYear(), today.getMonth(), student.feeDay);
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

    console.log(`[✅] Fee record created for ${student.name} due ${dueDate.toDateString()}`);
  }

  static async sendFeeReminders(): Promise<void> {
    const students = await Student.find({ isActivate: true });

    for (const student of students) {
      await this.processStudentReminders(student);
    }
  }

  private static async processStudentReminders(student: IStudent): Promise<void> {
    const pendingFees = await FeePayment.find({
      studentId: student._id,
      status: "pending",
    });

    for (const fee of pendingFees) {
      if (fee.reminderCount >= 3) {
        await FeePayment.findByIdAndUpdate(fee._id, { status: "overdue" });
      } else {
        await this.sendNotification(student, fee, "reminder");
      }
    }
  }

  private static async sendNotification(
    student: IStudent,
    fee: IFeePayment,
    type: "reminder" | "overdue" | "payment_received"
  ): Promise<void> {
    const channel = "sms"; // or "whatsapp" based on your app config

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
      log.sentAt = new Date();
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
    const message = this.generateNotificationMessage(student, fee, type);

    switch (channel) {
      case "sms":
        smsSender(student.contact, message);
        console.log(`Sending SMS to ${student.contact}: ${message}`);
        break;
      case "whatsapp":
        whatsappSender(student.contact, message);
        console.log(`Sending WhatsApp to ${student.contact}: ${message}`);
        break;
      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }
  }

  private static generateNotificationMessage(
    student: IStudent,
    fee: IFeePayment,
    type: string
  ): string {
    const dueDate = fee.dueDate.toDateString();
    switch (type) {
      case "reminder":
        return `Reminder: ${student.name}'s fee of ₹${fee.amount} is due on ${dueDate}.`;
      case "overdue":
        return `Overdue Alert: ${student.name}'s fee of ₹${fee.amount} was due on ${dueDate}.`;
      case "payment_received":
        return `Payment Received: ${student.name} paid ₹${fee.amount} for ${dueDate}.`;
      default:
        return `Fee update for ${student.name}.`;
    }
  }
}

