import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const addExperienceSchema = z.object({
  company: z.string(),
  title: z.string(),
  fromMonth: z.string(),
  fromYear: z.string(),
  isCurrentlyWorking: z.boolean(),
  toMonth: z.string().optional(),
  toYear: z.string().optional(),
  description: z.string(),
});

export const profileUpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  skills: z.array(z.string()),
});

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.any(),
  skills: z.array(z.string()),
  reward: z.any(),
});

export const createSubmissionSchema = z.object({
  demoLinks: z.array(z.string()),
  description: z.any(),
});
