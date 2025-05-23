import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/db";
import { sendContactEmail } from "@/lib/mail/mail";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await saveMessage({ name, email, subject, message });
    await sendContactEmail({ name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
