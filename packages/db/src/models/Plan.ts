import { Model, model, models, Schema } from "mongoose";

export interface IPlan {
  type: "free" | "pro" | "custom";
  price: number;
  studentLimit: number | null;
  durationDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const plansSchema = new Schema<IPlan>(
  {
    type: {
      type: String,
      enum: ["free", "pro", "custom"],
      default: "free",
      required: true,
    },
    price: { type: Number, required: true, min: 0, default: 0 },
    studentLimit: { type: Number, required: false },
    durationDays: { type: Number, required: true },
  },
  { timestamps: true }
);

const Plan = (models.Plan as Model<IPlan>) || model<IPlan>("Plan", plansSchema);

export default Plan;
