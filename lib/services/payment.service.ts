import { apiClient, ApiError } from "@/lib/api/client";
import type { Payment, CreatePaymentInput } from "@/lib/validations";
import { paymentSchema, createPaymentSchema } from "@/lib/validations";

/**
 * Payment Service - Business logic layer for payment operations
 */
export class PaymentService {
  private static readonly BASE_PATH = "/payments";

  /**
   * Fetch all payments with pagination
   */
  static async getPayments(page: number = 1, limit: number = 10) {
    try {
      const response = await apiClient.get(
        `${this.BASE_PATH}?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch payments: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Fetch a single payment by ID
   */
  static async getPaymentById(id: string) {
    if (!id) {
      throw new Error("Payment ID is required");
    }

    try {
      const payment = await apiClient.get<Payment>(`${this.BASE_PATH}/${id}`);
      return paymentSchema.parse(payment);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch payment: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Create a new payment
   */
  static async createPayment(input: CreatePaymentInput) {
    try {
      const validatedInput = createPaymentSchema.parse(input);
      const payment = await apiClient.post<Payment>(
        `${this.BASE_PATH}`,
        validatedInput
      );
      return paymentSchema.parse(payment);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to create payment: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get payments by user ID
   */
  static async getUserPayments(
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiClient.get(
        `${this.BASE_PATH}/user/${userId}?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch user payments: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get payment statistics
   */
  static async getPaymentStats() {
    try {
      const response = await apiClient.get(`${this.BASE_PATH}/stats`);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch payment stats: ${error.message}`);
      }
      throw error;
    }
  }
}
