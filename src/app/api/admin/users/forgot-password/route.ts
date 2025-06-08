// /app/api/auth/forgot-password/route.tsx
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/lib/mail/templates/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with that email" },
        { status: 404 }
      );
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExp = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    // Save to user
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExp },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Send email
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "2F Resources <no-reply@2fresources.com>",
      to: [email],
      subject: "Reset Your Password",
      react: ForgotPasswordEmail({ resetUrl, userName: user.name || "there" }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return NextResponse.json(
        { error: "Failed to send reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
