import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { generateRandomPassword } from "@/lib/utils";
import { hash } from "bcryptjs";
import { Resend } from "resend";
import UserCreationEmail from "@/lib/mail/templates/UserCreationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch all users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Verify admin role
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized - Admin access required" },
      { status: 403 }
    );
  }

  try {
    const { name, email } = await request.json();

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Generate random password
    const tempPassword = generateRandomPassword(12);
    const hashedPassword = await hash(tempPassword, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: "ADMIN", // Default role for new users
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "2F Resources <no-reply@2fresources.com>",
      to: email,
      subject: "Your New Account",
      react: UserCreationEmail({
        email,
        userName: name,
        tempPassword,
        loginUrl: `${process.env.NEXTAUTH_URL}/login`,
      }),
    });

    if (error) {
      await prisma.user.delete({
        where: { email },
      });
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: `Failed to add User: ${name}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        user: newUser,
        message: "User created successfully. Temporary password sent to email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
