import { z } from "zod";

/**
 * User Validation Schemas
 */
export const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  role: z.enum(["user", "admin", "moderator"]).optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  phone: true,
  role: true,
});

export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

/**
 * Payment Validation Schemas
 */
export const paymentSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().length(3).default("USD"),
  status: z
    .enum(["pending", "processing", "completed", "failed"])
    .default("pending"),
  paymentMethod: z.enum([
    "credit_card",
    "bank_transfer",
    "paypal",
    "cryptocurrency",
  ]),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createPaymentSchema = paymentSchema.pick({
  userId: true,
  amount: true,
  paymentMethod: true,
  description: true,
  currency: true,
});

export const updatePaymentSchema = createPaymentSchema.partial();

export type Payment = z.infer<typeof paymentSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

/**
 * Pagination Validation
 */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

/**
 * Generic Paginated Response
 */
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: z.array(schema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    hasMore: z.boolean(),
  });

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};
