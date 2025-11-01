import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  // verifyCode: z.string().min(4),
  // isVerifyed: z.boolean()
});

export const UserUpdateSchema = z.object({
  name: z.string().min(5),
  phone: z.string().min(10),
  tuitionClassName: z.string(),
  email: z.string().email(),
});

export const StudentSchema = z.object({
  name: z.string(),
  class: z.string(),
  subject: z.string(),
  contact: z.string().min(10),
  monthlyFee: z.number(),
  isActivate: z.boolean(),
  joinDate: z.string(),
  feeDay: z.string().optional(),
});

export const StudentUpdateSchema = z.object({
  name: z.string(),
  contact: z.string().min(10),
  class: z.string(),
  monthlyFee: z.number(),
  dueDate: z.number(),
});

export const CodeSchema = z.object({
  email: z.string().email(),
  code: z.string(),
});

export const PlanSchema = z.object({
  type: z.enum(["free", "pro", "custom"]),
  price: z.number(),
  studentLimit: z.number(),
});

export const ContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});
