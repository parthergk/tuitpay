import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6), 
})