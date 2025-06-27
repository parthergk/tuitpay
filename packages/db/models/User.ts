import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  plan: "free" | "pro" | "custom";
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
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
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
