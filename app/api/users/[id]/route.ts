/**
 * User Detail API Route
 * Handles operations for a single user
 * GET: Fetch user by ID
 * PATCH: Update user
 * DELETE: Delete user
 */

import { NextRequest, NextResponse } from "next/server";
import { updateUserSchema } from "@/lib/validations";
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

/**
 * GET /api/users/[id]
 * Fetch user by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users/[id]
 * Update user
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validatedData = updateUserSchema.parse(body);

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user
    const updatedUser: User = {
      ...users[userIndex],
      username: validatedData.name || users[userIndex].username,
      location: users[userIndex].location,
      email: validatedData.email || users[userIndex].email,
      phone: validatedData.phone || users[userIndex].phone,
      role: (validatedData.role as UserRole) || users[userIndex].role,
      updatedAt: new Date().toISOString(),
    };
    users[userIndex] = updatedUser;

    return NextResponse.json(users[userIndex], { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Delete user
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    users.splice(userIndex, 1);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
