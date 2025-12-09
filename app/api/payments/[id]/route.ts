/**
 * Payment Detail API Route
 * Handles operations for a single payment
 * GET: Fetch payment by ID
 * PATCH: Update payment
 * DELETE: Delete payment
 */

import { NextRequest, NextResponse } from "next/server";
import { updatePaymentSchema } from "@/lib/validations";
import type { Payment } from "@/types/payment";

// Import mock data (in production, this would be a database query)
// For now, we'll use a simple in-memory store
// In a real app, this would be imported from a database service

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

/**
 * GET /api/payments/[id]
 * Fetch payment by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payment = payments.find((p) => p.id === id);

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch payment" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/payments/[id]
 * Update payment
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validatedData = updatePaymentSchema.parse(body);

    const paymentIndex = payments.findIndex((p) => p.id === id);

    if (paymentIndex === -1) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Update payment
    payments[paymentIndex] = {
      ...payments[paymentIndex],
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(payments[paymentIndex], { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/payments/[id]
 * Delete payment
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const paymentIndex = payments.findIndex((p) => p.id === id);

    if (paymentIndex === -1) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    payments.splice(paymentIndex, 1);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete payment" },
      { status: 500 }
    );
  }
}
