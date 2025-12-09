/**
 * Payment type definitions
 * Used for type safety across the application
 */

export type PaymentStatus = "pending" | "processing" | "success" | "failed";

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentCreateInput {
  amount: number;
  status: PaymentStatus;
  username: string;
  email: string;
}

export interface PaymentUpdateInput {
  amount?: number;
  status?: PaymentStatus;
  username?: string;
  email?: string;
}

