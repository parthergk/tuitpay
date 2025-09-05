import mongoose, { Model, Schema, model, models } from "mongoose";
import { IFeePayment } from "@repo/types";

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

const FeePayment = (models.FeePayment as Model<IFeePayment>) || model<IFeePayment>("Reminder", feePaymentSchema);
export default FeePayment;
