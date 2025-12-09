import { apiClient, ApiError } from "@/lib/api/client";
import type { User, CreateUserInput, UpdateUserInput } from "@/lib/validations";
import {
  userSchema,
  createUserSchema,
  updateUserSchema,
} from "@/lib/validations";

/**
 * User Service - Business logic layer for user operations
 * Handles validation, API calls, and error handling
 */
export class UserService {
  private static readonly BASE_PATH = "/users";

  /**
   * Fetch all users with pagination
   */
  static async getUsers(page: number = 1, limit: number = 10) {
    try {
      const response = await apiClient.get<
        import("@/lib/validations").PaginatedResponse<
          import("@/lib/validations").User
        >
      >(`${this.BASE_PATH}?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Fetch a single user by ID
   */
  static async getUserById(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }

    try {
      const user = await apiClient.get<User>(`${this.BASE_PATH}/${id}`);
      return userSchema.parse(user);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Create a new user
   */
  static async createUser(input: CreateUserInput) {
    try {
      const validatedInput = createUserSchema.parse(input);
      const user = await apiClient.post<User>(
        `${this.BASE_PATH}`,
        validatedInput
      );
      return userSchema.parse(user);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Update an existing user
   */
  static async updateUser(id: string, input: UpdateUserInput) {
    if (!id) {
      throw new Error("User ID is required");
    }

    try {
      const validatedInput = updateUserSchema.parse(input);
      const user = await apiClient.put<User>(
        `${this.BASE_PATH}/${id}`,
        validatedInput
      );
      return userSchema.parse(user);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Delete a user
   */
  static async deleteUser(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }

    try {
      await apiClient.delete(`${this.BASE_PATH}/${id}`);
      return { success: true };
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Search users by query
   */
  static async searchUsers(query: string) {
    if (!query.trim()) {
      throw new Error("Search query is required");
    }

    try {
      const response = await apiClient.get(
        `${this.BASE_PATH}/search?q=${encodeURIComponent(query)}`
      );
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to search users: ${error.message}`);
      }
      throw error;
    }
  }
}
