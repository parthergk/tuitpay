import mongoose, { Model, model, models, Schema } from "mongoose";
import { INotificationLog } from "@repo/types";

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