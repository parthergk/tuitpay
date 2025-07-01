import {z} from "zod";

export const CodeSchema = z.object({
    email: z.string().email(),
    code: z.string().min(4)
})