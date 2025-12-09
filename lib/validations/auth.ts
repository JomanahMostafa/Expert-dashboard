import { z } from "zod";

/**
 * Authentication Validation Schemas
 * Used for form validation and API request/response validation
 */

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const authResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
  token: z.string().optional(),
  createdAt: z.string().optional(),
});

export const authErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type AuthError = z.infer<typeof authErrorSchema>;
