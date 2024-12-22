import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const properties = await prisma.property.findMany({
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

    return NextResponse.json(
      {
        success: true,
        message: 'Properties fetched successfully',
        data: properties,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { success: false, message: 'Error while fetching properties' },
      { status: 500 }
    );
  }
}