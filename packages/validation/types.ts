import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6), 
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
    feeDay: z.string()
})


export const CodeSchema = z.object({
    email: z.string().email(),
    code: z.string()
})