import { NextResponse } from "next/server";
import { saveMessage, deleteMessage, deleteAllMessages } from "@/lib/db";
import { sendContactEmail } from "@/lib/mail/mail";

export async function POST(req: Request) {
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const deleteAll = searchParams.get("deleteAll");

    if (deleteAll === "true") {
      await deleteAllMessages();
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

    await deleteMessage(id);
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
