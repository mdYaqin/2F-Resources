// /app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 }
      );
    }

    // 🔐 Hash the received token to match DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 🔎 Find the user with the hashed token and unexpired expiry
    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExp: {
          gte: new Date(), // still valid
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // 🔐 Hash the new password
    const hashedPassword = await hash(newPassword, 12);

    // ✅ Update password & clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return NextResponse.json(
      { message: "Password reset successful." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
