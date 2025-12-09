/**
 * Payments API Route
 * Handles CRUD operations for payments
 * GET: Fetch all payments
 * POST: Create a new payment
 */

import { NextRequest, NextResponse } from "next/server";
import { paymentSchema, createPaymentSchema } from "@/lib/validations";
import { getCorsHeaders } from "@/lib/utils/cors";
import type { Payment } from "@/types/payment";

// Mock data store (in production, this would be a database)
const payments: Payment[] = [
  {
    id: "728ed521",
    amount: 134,
    status: "pending",
    username: "John Doe",
    email: "johndoe@gmail.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "728ed522",
    amount: 124,
    status: "success",
    username: "Jane Doe",
    email: "janedoe@gmail.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "728ed523",
    amount: 167,
    status: "success",
    username: "Mike Galloway",
    email: "mikegalloway@gmail.com",
    createdAt: new Date().toISOString(),
  },
];

// Use getCorsHeaders to construct appropriate CORS headers per request

/**
 * GET /api/payments
 * Fetch all payments
 */
export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(payments, { status: 200, headers: cors });
  } catch (error) {
    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500, headers: cors }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const cors = getCorsHeaders(request.headers.get("origin") || undefined);
  return NextResponse.json({}, { status: 204, headers: cors });
}

/**
 * POST /api/payments
 * Create a new payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createPaymentSchema.parse(body);

    // Create new payment (mock representation)
    const newPayment: Payment = {
      id: `payment-${Date.now()}`,
      amount: validatedData.amount,
      status: "pending",
      username: "Unknown", // Mock data field
      email: "unknown@example.com", // Mock data field
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    payments.push(newPayment);

    const cors = getCorsHeaders(request.headers.get("origin") || undefined);
    return NextResponse.json(newPayment, { status: 201, headers: cors });
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
      { error: "Failed to create payment" },
      { status: 500, headers: cors }
    );
  }
}
