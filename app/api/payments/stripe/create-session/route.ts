import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { stripeCheckout } from '@/modules/stripe';

type PaymentRequestBody = {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  mode: 'payment';
};

export async function POST(request: Request) {
  try {
    const body: PaymentRequestBody = await request.json();
    const { priceId, successUrl, cancelUrl, mode } = body;

    if (!priceId || !successUrl || !cancelUrl || !mode) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const session = await stripeCheckout.createOneTimePaymentSession({
      amount: parseFloat(priceId),
      successUrl,
      cancelUrl,
    });

    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(priceId),
        paymentStatus: 'pending',
        buyerId: 0, // Placeholder, replace with actual buyer ID logic
        bookingId: 0, // Placeholder, replace with actual booking ID logic
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Payment session created successfully',
        data: {
          sessionId: session.id,
          sessionUrl: session.url,
          paymentId: payment.id,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error creating payment session:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}