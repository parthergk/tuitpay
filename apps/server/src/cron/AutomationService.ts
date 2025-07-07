import { connectTodb, FeePayment, Student, User } from "@repo/db";
import mongoose from "mongoose";

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
  createdAt: Date;
  updatedAt: Date;
}

interface IFeePayment {
  _id: mongoose.ObjectId;
  studentId: mongoose.ObjectId;
  teacherId: mongoose.ObjectId;
  amount: number;
  paidAmount: number;
  dueDate: Date;
  paidDate?: Date;
  status: "pending" | "paid" | "overdue" | "partial";
  paymentMethod?: "cash" | "card" | "upi" | "bank_transfer" | "other";
  reminderCount: number;
  lastReminderAt: Date;
  nextReminderAt: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class FeeAutomationService {
  static async generateMonthlyFees(): Promise<void> {
    try {
      await connectTodb();

      const activeStudents = await Student.find({ isActivate: true });
      const today = new Date();

      for (const student of activeStudents) {
        const shouldGenerateFee = await this.shouldGenerateNewFee(
          student,
          today
        );

        if (shouldGenerateFee) {
          await this.createFeeRecord(student, today);
        }
      }
    } catch (error) {
      console.error("Error generating monthly fees:", error);
    }
  }

  private static async shouldGenerateNewFee(student: IStudent, today: Date) {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const existingFee = await FeePayment.findOne({
      studentId: student._id,
      dueDate: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    if (existingFee) {
      return false;
    }

    const dueDate = new Date(currentYear, currentMonth, student.feeDay);
    return today >= dueDate;
  }

  private static async createFeeRecord(student: IStudent, today: Date) {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const dueDate = new Date(currentYear, currentMonth, student.feeDay);

    const firstReminderDate = new Date(dueDate);
    firstReminderDate.setDate(firstReminderDate.getDate() - 1);

    const feePayment = new FeePayment({
      studentId: student._id,
      teacherId: student.teacherId,
      amount: student.monthlyFee,
      status: "pending",
      dueDate: dueDate,
      reminderCount: 0,
      nextReminderAt: firstReminderDate,
    });
    await feePayment.save();

    await Student.findByIdAndUpdate(student._id, {
      lastFeeDueDate: dueDate,
    });

    console.log(
      `Fee record created for student ${student.name} - Due: ${dueDate.toDateString()}`
    );
  }

  static async sendFeeReminders(): Promise<void> {
    try {
      const students = await Student.find({ isVerified: true });

      for (const student of students) {
        await this.processStudentReminders(student);
      }
    } catch (error) {
      console.error("Error sending fee reminders:", error);
    }
  }

  private static async processStudentReminders(
    student: IStudent
  ): Promise<void> {
    const upcomingFees = await FeePayment.find({
      studentId: student._id,
      status: "pending",
      reminderCount: {
        $lte: 3,
      },
    });

    const overdueFees = await FeePayment.find({
      studentId: student._id,
      status: "pending",
      reminderCount: {
        $gte: 3,
      },
    });

    if (overdueFees.length > 0) {
      await FeePayment.updateMany(
        {
          studentId: student._id,
          status: "pending",
          reminderCount: {
            $gte: 3,
          },
        },
        { status: "overdue" }
      );
    }

    for (const fee of upcomingFees) {
      await this.sendNotification(student, fee, "reminder");
    }
  }

  private static async sendNotification(student: IStudent, feePayment: IFeePayment, 
    type: 'reminder' | 'overdue' | 'payment_received'): Promise<void> {

    }
}
