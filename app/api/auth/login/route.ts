import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { ZodError } from "zod";
import { getCorsHeaders } from "@/lib/utils/cors";
import { findUserByEmail } from "../_mockUsers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Debug: show incoming body but mask password for safety
    const masked = {
      ...body,
      password: body?.password ? "[MASKED]" : undefined,
    };
    console.debug("[auth/login] incoming body:", masked);

    // Validate input against login schema
    const { email, password } = loginSchema.parse(body);

    // Find user (normalized)
    const user = findUserByEmail(email);
    console.debug("[auth/login] found user:", {
      found: !!user,
      email: user?.email,
    });

    // Safe comparison logging: do not log actual passwords, only existence and lengths
    if (!user) {
      console.debug("[auth/login] auth result: no user found for", { email });
    } else {
      console.debug(
        "[auth/login] auth result: user found; storedPasswordLength=",
        user.password?.length,
        "incomingPasswordLength=",
        password?.length
      );
    }

    if (!user || user.password !== password) {
      const cors = getCorsHeaders(request.headers.get("origin") || undefined);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401, headers: cors }
      );
    }

    // Return user data with mock token
    const responseData = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: `token-${user.id}`,
      createdAt: user.createdAt,
    };

    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(responseData, { status: 200, headers: cors });
  } catch (error) {
    const cors = getCorsHeaders(request.headers.get("origin") || undefined);

    // Provide clearer validation info for dev/debugging
    if (error instanceof ZodError) {
      const issues = error.errors.map((e) => ({
        path: e.path,
        message: e.message,
      }));
      console.debug("[auth/login] validation issues:", issues);
      return NextResponse.json(
        { error: "Validation failed", issues },
        { status: 400, headers: cors }
      );
    }

    const message =
      error instanceof Error ? error.message : "Failed to authenticate user";
    console.debug("[auth/login] error:", message);
    return NextResponse.json(
      { error: message },
      { status: 400, headers: cors }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const cors = getCorsHeaders(request.headers.get("origin") || undefined);
  return NextResponse.json({}, { status: 204, headers: cors });
}
