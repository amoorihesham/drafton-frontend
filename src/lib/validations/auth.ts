import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  deviceId: z.string().uuid("Invalid device ID"),
});

export const verifyEmailSchema = z.object({
  email: z.email("Please enter a valid email address"),
  otp: z.string().min(1, "Otp is required"),
});
