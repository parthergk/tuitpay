import mongoose, { Model, Schema, model, models } from "mongoose";

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

const paymentSchema = new Schema<IPayment>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Types.ObjectId, ref: "Plan", required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },
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
