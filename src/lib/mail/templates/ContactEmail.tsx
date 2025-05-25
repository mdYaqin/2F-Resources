// lib/mail/templates/ContactEmail.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#f5f7fa",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "20px auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: 600,
          }}
        >
          {/* Header title instead of image */}
          <Section style={{ textAlign: "center", paddingBottom: 20 }}>
            <Heading
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#00024f",
                margin: 0,
                fontFamily:
                  "Teko,'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              2F Resources
            </Heading>
          </Section>

          <Heading
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            New Contact Form Submission
          </Heading>

          <Text style={{ fontSize: "16px", color: "#555", marginBottom: 20 }}>
            You’ve received a new message from your website contact form:
          </Text>

          <Section
            style={{
              backgroundColor: "#f0f4f8",
              padding: "15px",
              borderRadius: "6px",
              marginBottom: 20,
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text>
              <strong>Message:</strong>
            </Text>
            <Text
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "#ffffff",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                marginTop: "5px",
              }}
            >
              {message}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#ddd", marginBottom: "15px" }} />

          <Text
            style={{
              fontSize: "12px",
              color: "#999",
              textAlign: "center",
              marginBottom: 0,
            }}
          >
            This email was sent from your website contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
