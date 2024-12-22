import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { OAuth2Client } from "google-auth-library";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    let user = await prisma?.user?.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma?.user?.create({
        data: {
          email,
          name,
          username: email?.split("@")[0],
        },
      });
    }

    const token = jwt.sign(
      {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        role: user?.role,
      },
      SECRET_KEY,
      { expiresIn: "10d" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User successfully authenticated",
        data: { user, token },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
      },
      { status: 500 }
    );
  }
}

export async function POSTGoogleAuth(req: NextRequest) {
  try {
    const body: any = await req.json();
    const { googleIdToken } = body;

    const ticket = await client.verifyIdToken({
      idToken: googleIdToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket?.getPayload();
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid Google token" },
        { status: 400 }
      );
    }

    const { sub: googleId, email, name } = payload;

    if (!email || !googleId) {
      return NextResponse.json(
        { success: false, message: "Google token missing required information" },
        { status: 400 }
      );
    }

    let user = await prisma?.user?.findFirst({
      where: { googleId },
    });

    if (!user) {
      user = await prisma?.user?.create({
        data: {
          email,
          username: email?.split("@")[0],
          name: name || "",
          googleId,
          role: "vendor" as any,
          isVerified: true,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Google authentication successful",
        data: {
          userId: user?.id,
          email: user?.email,
          role: user?.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during Google authentication:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}