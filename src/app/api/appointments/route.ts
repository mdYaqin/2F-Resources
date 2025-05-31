import { NextResponse } from "next/server";
import { Resend } from "resend";
import AppointmentEmail from "@/lib/mail/templates/AppointmentEmail";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobile, service, date, time, message } = body;

    // Validate required fields
    if (!name || !email || !mobile || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database using Prisma
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        mobile,
        service,
        date,
        time,
        message,
        status: "PENDING",
        updatedBy: "SYSTEM",
      },
    });

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "2F Resources <no-reply@2fresources.com>",
      to: [process.env.EMAIL_TO || "Project.sales@2Fresources.com"],
      subject: `New Appointment Request: ${service}`,
      react: AppointmentEmail({
        name,
        email,
        mobile,
        service,
        date,
        time,
        message,
      }),
    });

    if (error) {
      console.error("Failed to send appointment email:", error);
      return NextResponse.json(
        { error: "Failed to send appointment email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Appointment request submitted successfully",
        data: appointment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing appointment request:", error);
    return NextResponse.json(
      { error: "Failed to process appointment request" },
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
      await prisma.appointment.deleteMany();
      return NextResponse.json({
        success: true,
        message: "All appointments deleted",
      });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
