import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})