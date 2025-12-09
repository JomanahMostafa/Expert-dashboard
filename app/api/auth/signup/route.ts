import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations/auth";
import { getCorsHeaders } from "@/lib/utils/cors";
import { z } from "zod";
import { findUserByEmail, addMockUser } from "../_mockUsers";

// Backend schema without confirmPassword (reuses validation pieces)
const backendSignupSchema = z.object({
  name: signupSchema.innerType().shape.name,
  email: signupSchema.innerType().shape.email,
  password: signupSchema.innerType().shape.password,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate فقط البيانات المطلوبة للـ API
    const { name, email, password } = backendSignupSchema.parse(body);

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      const cors = getCorsHeaders(request.headers.get("origin") || undefined);
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409, headers: cors }
      );
    }
    const created = addMockUser({
      name,
      email,
      password, // production: hash
      username: name.toLowerCase().replace(/\s+/g, ""),
    });

    const responseData = {
      id: created.id,
      name: created.name,
      email: created.email,
      username: created.username,
      token: `token-${created.id}`,
      createdAt: created.createdAt,
    };

    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(responseData, { status: 201, headers: cors });
  } catch (error) {
    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed" },
      { status: 400, headers: cors }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const cors = getCorsHeaders(request.headers.get("origin") || undefined);
  return NextResponse.json({}, { status: 204, headers: cors });
}
