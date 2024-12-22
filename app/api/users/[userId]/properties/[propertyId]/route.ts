import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PropertyRequestBody = {
  title: string;
  description: string;
  price: number;
  images: string[];
};

export async function PUT(
  request: Request,
  { params }: { params: { userId: string, propertyId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const propertyId = parseInt(params.propertyId, 10);

    if (isNaN(userId) || isNaN(propertyId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user or property ID' },
        { status: 400 }
      );
    }

    const body: PropertyRequestBody = await request.json();

    const { title, description, price, images } = body;

    if (!title || !description || !price || !Array.isArray(images)) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields or incorrect format' },
        { status: 400 }
      );
    }

    const property = await prisma.property.findFirst({
      where: { id: propertyId, vendorId: userId }
    });

    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Property not found or unauthorized' },
        { status: 404 }
      );
    }

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        title,
        description,
        price,
        images
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Property updated successfully',
        data: {
          id: updatedProperty.id,
          title: updatedProperty.title,
          description: updatedProperty.description,
          price: updatedProperty.price,
          images: updatedProperty.images,
          createdAt: updatedProperty.createdAt.toISOString(),
          updatedAt: updatedProperty.updatedAt.toISOString()
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 }
    );
  }
}