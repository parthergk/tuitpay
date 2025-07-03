import mongoose, { Model, model, models, Schema } from "mongoose";

interface IStudent {
  teacherId: mongoose.ObjectId;
  name: string;
  contact: string;
  class: string;
  sub: string;
  monthlyFee: number;
  isActivate: boolean;
  joinDate: Date;
  feeDay: number;
  lastFeeDueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    teacherId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    class: { type: String, required: true },
    sub: { type: String, required: true },
    monthlyFee: { type: Number, required: true },
    isActivate: { type: Boolean, default: true },
    joinDate: { type: Date, required: true },
    feeDay: { type: Number, required: true, min: 1, max: 31, default: 1 },
    lastFeeDueDate: { type: Date },
  },
  { timestamps: true }
);

const Student = (models.Student as Model<IStudent>) || model<IStudent>("Student", studentSchema);

export default Student;
