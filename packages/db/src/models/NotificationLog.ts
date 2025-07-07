import mongoose, { Model, model, models, Schema } from "mongoose";

interface INotificationLog {
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

const notificationLogSchema = new Schema<INotificationLog>(
  {
    teacherId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    studentId: { type: mongoose.Types.ObjectId, ref: "Student", required: true },
    feePaymentId: { type: mongoose.Types.ObjectId, ref: "FeePayment", required: true },
    type: { 
      type: String, 
      enum: ["reminder", "overdue", "payment_received"], 
      required: true 
    },
    channel: { 
      type: String, 
      enum: ["email", "sms", "whatsapp", "push"], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["sent", "failed", "pending"], 
      default: "pending" 
    },
    sentAt: { type: Date },
    errorMessage: { type: String },
  },
  { timestamps: true }
);

const NotificationLog = (models.NotificationLog as Model<INotificationLog>) || model<INotificationLog>("NotificationLog", notificationLogSchema);

export default NotificationLog;