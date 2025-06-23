// /app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/lib/mail/templates/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const trimmedEmail = email?.trim().toLowerCase();

    if (!trimmedEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    // 🔒 Don't reveal if user exists
    if (!user) {
      // Always return 200 to avoid email enumeration
      return NextResponse.json(
        { message: "If this email is registered, a reset link will be sent." },
        { status: 200 }
      );
    }

    // 🔐 Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExp = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    // 💾 Save hashed token and expiry
    await prisma.user.update({
      where: { email: trimmedEmail },
      data: {
        resetToken: resetTokenHash,
        resetTokenExp,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    const { error: emailError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "2F Resources <no-reply@2fresources.com>",
      to: [trimmedEmail],
      subject: "Reset Your Password",
      react: ForgotPasswordEmail({
        resetUrl,
        userName: user.name || "there",
      }),
    });

    if (emailError) {
      console.error("Resend failed:", emailError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "If this email is registered, a reset link will be sent.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
