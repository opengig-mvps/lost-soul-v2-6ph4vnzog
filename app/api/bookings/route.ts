import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type BookingRequestBody = {
  buyerId: number;
  propertyId: number;
};

export async function POST(request: Request) {
  try {
    const body: BookingRequestBody = await request.json();
    const { buyerId, propertyId } = body;

    if (!buyerId || !propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const [buyer, property] = await Promise.all([
      prisma.user.findFirst({ where: { id: buyerId } }),
      prisma.property.findFirst({ where: { id: propertyId } }),
    ]);

    if (!buyer) {
      return NextResponse.json(
        { success: false, message: 'Buyer not found' },
        { status: 404 }
      );
    }

    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Property not found' },
        { status: 404 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        buyerId,
        propertyId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: {
          id: booking.id,
          bookingDate: booking.bookingDate.toISOString(),
          buyerId: booking.buyerId,
          propertyId: booking.propertyId,
          createdAt: booking.createdAt.toISOString(),
          updatedAt: booking.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}