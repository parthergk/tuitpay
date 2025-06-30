import mongoose, { model, models, Schema } from "mongoose";
import { bcryptjs } from "@repo/auth";
import { Model } from "mongoose";

export interface IUser {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  plan: "free" | "pro" | "custom";
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ["free", "pro", "custom"], default: "free" },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
