import mongoose, { Model, Schema, model, models } from "mongoose";

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

const feePaymentSchema = new Schema<IFeePayment>(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    teacherId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0 },
    dueDate: { type: Date, required: true },
    paidDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "paid", "overdue", "partial"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer", "other"],
    },
    reminderCount: { type: Number, default: 0 },
    lastReminderAt: { type: Date },
    nextReminderAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

const FeePayment = (models.feePaymentSchema as Model<IFeePayment>) || model<IFeePayment>("Reminder", feePaymentSchema);

export default FeePayment;
