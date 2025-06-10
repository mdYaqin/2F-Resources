import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/lib/mail/templates/ContactEmail";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database using Prisma
    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
        status: "PENDING",
        updatedBy: "SYSTEM",
      },
    });

    const toRecipients = [process.env.EMAIL_TO, process.env.EMAIL_CC].filter(
      (r): r is string => typeof r === "string"
    );

    if (toRecipients.length === 0) {
      // Rollback DB if email config is bad
      await prisma.contactSubmission.delete({
        where: { id: contactSubmission.id },
      });
      return NextResponse.json(
        { error: "No email recipients configured" },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "2F Resources <no-reply@2fresources.com>",
      to: toRecipients,
      subject: `New Contact Form Submission: ${subject}`,
      react: ContactEmail({
        name,
        email,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Failed to send contact email:", error);
      await prisma.contactSubmission.delete({
        where: { id: contactSubmission.id },
      });

      return NextResponse.json(
        { error: "Failed to send contact email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        data: contactSubmission,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const deleteAll = searchParams.get("deleteAll");

    if (deleteAll === "true") {
      await prisma.contactSubmission.deleteMany();
      return NextResponse.json({
        success: true,
        message: "All messages deleted",
      });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
