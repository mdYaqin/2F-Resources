import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components";

interface UserCreationEmail {
  email: string;
  userName: string;
  tempPassword: string;
  loginUrl: string;
}

export default function UserCreationEmail({
  email,
  userName,
  tempPassword,
  loginUrl,
}: UserCreationEmail) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#f8fafc",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "40px auto",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            maxWidth: 600,
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Header */}
          <Section
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              margin: "-40px -40px 30px -40px",
              padding: "40px 40px 30px 40px",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Heading
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#ffffff",
                margin: 0,
                fontFamily:
                  "Teko,'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              2F Resources
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                color: "#e2e8f0",
                marginTop: "8px",
                fontStyle: "italic",
              }}
            >
              Building Excellence, Delivering Quality
            </Text>
          </Section>

          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Welcome, {userName}!
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              color: "#4b5563",
              marginBottom: 30,
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            Your account has been created by an administrator. Please find your
            login credentials below and change your password after logging in.
          </Text>

          <Section
            style={{
              backgroundColor: "#f8fafc",
              padding: "25px",
              borderRadius: "8px",
              marginBottom: 30,
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Text
              style={{
                marginBottom: 15,
                fontSize: "15px",
                color: "#1e40af",
              }}
            >
              <strong>Email:</strong>{" "}
              <span style={{ color: "#4b5563" }}>{email}</span>
            </Text>
            <Text
              style={{
                marginBottom: 15,
                fontSize: "15px",
                color: "#1e40af",
              }}
            >
              <strong>Temporary Password:</strong>{" "}
              <span style={{ color: "#4b5563" }}>{tempPassword}</span>
            </Text>
          </Section>

          <Text
            style={{
              fontSize: "14px",
              color: "#b91c1c",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Please change your password after your first login.
          </Text>

          <Section style={{ textAlign: "center", marginBottom: 30 }}>
            <Button
              href={loginUrl}
              style={{
                backgroundColor: "#1e40af",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Login to Your Account
            </Button>
          </Section>

          <Hr style={{ borderColor: "#e2e8f0", marginBottom: "25px" }} />

          <Section style={{ textAlign: "center" }}>
            <Text
              style={{
                fontSize: "13px",
                color: "#4b5563",
                lineHeight: "1.5",
              }}
            >
              If you didn&apos;t request this account, please contact our
              support team immediately.
            </Text>
            <Text
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "10px",
              }}
            >
              © {new Date().getFullYear()} 2F Resources. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
