/**
 * User type definitions
 * Used for type safety across the application
 */

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCreateInput {
  username: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
}

export interface UserUpdateInput {
  username?: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: UserRole;
}

