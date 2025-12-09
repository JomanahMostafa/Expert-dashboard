/**
 * Users API Route
 * Handles CRUD operations for users
 * GET: Fetch all users
 * POST: Create a new user
 */

import { NextRequest, NextResponse } from "next/server";
import { userSchema, createUserSchema } from "@/lib/validations";
import { getCorsHeaders } from "@/lib/utils/cors";
import type { User, UserRole } from "@/types/user";

// Mock data store (in production, this would be a database)
const users: User[] = [
  {
    id: "user-1",
    username: "Mohamed",
    email: "Mohamed@gmail.com",
    phone: "+01224058523",
    location: "Egypt",
    role: "admin",
    avatar: "https://avatars.githubusercontent.com/u/1486366",
    createdAt: new Date().toISOString(),
  },
];

// Note: Use getCorsHeaders to return allowed origin headers based on env

/**
 * GET /api/users
 * Fetch all users
 */
export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(users, { status: 200, headers: cors });
  } catch (error) {
    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500, headers: cors }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const cors = getCorsHeaders(request.headers.get("origin") || undefined);
  return NextResponse.json({}, { status: 204, headers: cors });
}

/**
 * POST /api/users
 * Create a new user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createUserSchema.parse(body);

    // Create new user (mock representation)
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: validatedData.name, // Map name to username
      location: "Unknown", // Default location for new users
      email: validatedData.email,
      phone: validatedData.phone || "",
      role: (validatedData.role as UserRole) || "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(newUser, { status: 201, headers: cors });
  } catch (error) {
    if (error instanceof Error) {
      const cors = getCorsHeaders(request.headers.get("origin") || undefined);
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: cors }
      );
    }
    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500, headers: cors }
    );
  }
}
