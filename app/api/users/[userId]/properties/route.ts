import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PropertyRequestBody = {
  title: string;
  description: string;
  price: number;
  images: string[];
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 },
      );
    }

    const body: PropertyRequestBody = await request.json();
    const { title, description, price, images } = body;
    if (!title || !description || !price || !Array.isArray(images)) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields or incorrect format' },
        { status: 400 },
      );
    }

    const vendor = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    const property = await prisma.property.create({
      data: {
        vendorId: userId,
        title,
        description,
        price,
        images,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Property created successfully',
        data: {
          id: property.id,
          title: property.title,
          description: property.description,
          price: property.price,
          images: property.images,
          createdAt: property.createdAt.toISOString(),
          updatedAt: property.updatedAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}