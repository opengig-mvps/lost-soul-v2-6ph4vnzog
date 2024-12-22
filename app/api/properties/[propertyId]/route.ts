import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { propertyId: string } },
) {
  try {
    const propertyId = parseInt(params.propertyId, 10);
    if (isNaN(propertyId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid property ID' },
        { status: 400 },
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        images: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Property not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Property details fetched successfully',
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
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}