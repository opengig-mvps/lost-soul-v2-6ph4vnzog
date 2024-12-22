import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/modules/stripe";
import prisma from "@/lib/prisma";
import { sendEmail } from '@/lib/email-service';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: any;

  try {
    if (!sig) {
      throw new Error("Missing Stripe signature");
    }
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const intent: any = event.data.object;
      const bookingId = parseInt(intent.metadata.bookingId, 10);
      const amount = intent.amount_received / 100;

      const payment = await prisma.payment.updateMany({
        where: { bookingId },
        data: {
          amount,
          paymentStatus: 'succeeded',
          paymentDate: new Date().toISOString(),
        },
      });

      if (payment.count > 0) {
        const booking = await prisma.booking.findFirst({
          where: { id: bookingId },
          include: { buyer: true },
        });

        if (booking) {
          await sendEmail({
            to: booking.buyer.email,
            template: {
              subject: 'Payment Successful',
              html: `<h1>Your payment of $${amount} was successful</h1>`,
              text: `Your payment of $${amount} was successful`,
            },
          });
        }
      }
      break;
    default:
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
  }
  return NextResponse.json({ received: true });
}