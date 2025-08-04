import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  tuitionClassName: string;

  verifyCode: string;
  verifyCodePurpose: string;
  verifyCodeExpires: number;

  planId?: mongoose.ObjectId;
  planType: "free" | "pro" | "custom";
  planStatus: "active" | "expired" | "canceled";
  planActivatedAt: Date;
  planExpiresAt: Date;
  studentLimit: number;
  planPrice: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface IStudent {
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

export interface IPlan {
  _id: mongoose.ObjectId
  type: "free" | "pro" | "custom";
  price: number;
  studentLimit: number | null;
  durationDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  userId: mongoose.ObjectId;
  planId: mongoose.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationLog {
  _id: mongoose.ObjectId;
  teacherId: mongoose.ObjectId;
  studentId: mongoose.ObjectId;
  feePaymentId: mongoose.ObjectId;
  type: "reminder" | "overdue" | "payment_received";
  channel: "email" | "sms" | "whatsapp" | "push";
  status: "sent" | "failed" | "pending";
  sentAt?: Date;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeePayment {
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