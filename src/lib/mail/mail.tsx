import { Resend } from "resend";
import { render } from "@react-email/render";
import ContactEmail from "@/lib/mail/templates/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = data;

  const html = await render(
    <ContactEmail
      name={name}
      email={email}
      subject={subject}
      message={message}
    />
  );

  const response = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [process.env.EMAIL_TO!],
    subject: `New Contact Submission: ${subject}`,
    html,
    replyTo: email,
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Resend email response:", response);
  }

  return response;
}
