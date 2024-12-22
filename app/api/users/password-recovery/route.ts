import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';
import { randomBytes } from 'crypto';

type PasswordRecoveryRequestBody = {
  email: string;
};

export async function POST(request: Request) {
  try {
    const body: PasswordRecoveryRequestBody = await request.json();
    const email = String(body.email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Email not found' },
        { status: 404 },
      );
    }

    const recoveryToken = randomBytes(32).toString('hex');

    await prisma.user.update({
      where: { email },
      data: { verificationToken: recoveryToken },
    });

    await sendEmail({
      to: email,
      template: {
        subject: 'Password Recovery',
        html: `<p>Please use the following token to recover your password: ${recoveryToken}</p>`,
        text: `Please use the following token to recover your password: ${recoveryToken}`,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Password recovery email sent' },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error in password recovery:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}