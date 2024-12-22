import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type ReviewRequestBody = {
  bookingId: number;
  rating: number;
  comments: string;
};

export async function POST(request: Request) {
  try {
    const body: ReviewRequestBody = await request.json();

    const { bookingId, rating, comments } = body;
    if (!bookingId || !rating || !comments) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    const review = await prisma.review.create({
      data: {
        bookingId,
        rating,
        comments,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully',
        data: {
          id: review.id,
          rating: review.rating,
          comments: review.comments,
          createdAt: review.createdAt.toISOString(),
          updatedAt: review.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}