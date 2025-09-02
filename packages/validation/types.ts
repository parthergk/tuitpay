import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(10).optional(),
  password: z.string().min(6).optional(),
  tuitionClassName: z.string().optional() 
  // verifyCode: z.string().min(4),
  // isVerifyed: z.boolean()
})

export const StudentSchema = z.object({
    name: z.string(),
    class: z.string(),
    sub: z.string(),
    contact: z.string().min(10),
    monthlyFee: z.number(),
    isActivate: z.boolean(),
    joinDate: z.string(),
    feeDay: z.string().optional()
})


export const CodeSchema = z.object({
    email: z.string().email(),
    code: z.string()
})

export const PlanSchema = z.object({
  type: z.enum(["free", "pro", "custom"]),
  price: z.number(),
  studentLimit: z.number()
})