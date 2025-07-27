import mongoose, { model, models, Schema, Model } from "mongoose";
import { bcryptjs } from "@repo/auth";
import { IUser } from "@repo/types";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false, required: true },
    tuitionClassName: { type: String, required: true },

    verifyCode: { type: String, minlength: 4 },
    verifyCodePurpose: { type: String },
    verifyCodeExpires: { type: Number },

    planId: { type: mongoose.Types.ObjectId, ref: "Plan" },
    planType: {
      type: String,
      enum: ["free", "pro", "custom"],
      default: "free",
    },
    planStatus: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    planActivatedAt: { type: Date },
    planExpiresAt: { type: Date },
    studentLimit: { type: Number, default: 10 },
    planPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
