import mongoose, { Schema, model, models } from "mongoose";

export interface IReminder {
  userId: mongoose.ObjectId;
  studentId: mongoose.ObjectId;
  paymentId?: mongoose.ObjectId;
  type: "payment_due" | "custom";
  message: string;
  sendAt: Date;
  status: "pending" | "sent" | "failed";
  month: string;
  reminderCount: number;
  lastReminderAt: Date;
  nextReminderAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reminderSchema = new Schema<IReminder>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  studentId: { type: mongoose.Types.ObjectId, ref: "Student", required: true },
  paymentId: { type: mongoose.Types.ObjectId, ref: "Payment" },
  type: { type: String, enum: ["payment_due", "custom"], required: true },
  message: { type: String, required: true },
  sendAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
    required: true
  },
  month: { type: String, required: true },
  reminderCount: { type: Number, default: 0 },
  lastReminderAt: { type: Date },
  nextReminderAt: { type: Date },
}, { timestamps: true });

const Reminder = models.Reminder || model<IReminder>("Reminder", reminderSchema);

export default Reminder;
