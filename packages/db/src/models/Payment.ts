import mongoose, { Model, Schema, model, models } from "mongoose";
import { IPayment } from "@repo/types";

const paymentSchema = new Schema<IPayment>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Types.ObjectId, ref: "Plan", required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String},
  amount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
    required: true
  },
}, { timestamps: true });

const Payment = (models.Payment as Model<IPayment>) || model<IPayment>("Payment", paymentSchema);

export default Payment;
