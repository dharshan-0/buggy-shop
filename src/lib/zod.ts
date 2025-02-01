import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(1, "Username is required")
    .max(20, "Username must be less than 20 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});
