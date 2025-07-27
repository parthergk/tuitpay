import { Model, model, models, Schema } from "mongoose";
import {IPlan} from "@repo/types"

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
