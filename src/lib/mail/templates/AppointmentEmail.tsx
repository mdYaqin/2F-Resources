import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from "@react-email/components";

type AppointmentEmailProps = {
  name: string;
  email: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  message?: string;
};

export default function AppointmentEmail({
  name,
  email,
  mobile,
  service,
  date,
  time,
  message,
}: AppointmentEmailProps) {
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
          {/* Header with logo and title */}
          <Section
            style={{
              textAlign: "center",
              paddingBottom: 30,
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
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
            New Appointment Request
          </Heading>

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
              <strong style={{ color: "#1e40af" }}>Name:</strong>{" "}
              <span style={{ color: "#4b5563" }}>{name}</span>
            </Text>
            <Text
              style={{
                marginBottom: 15,
                fontSize: "15px",
                color: "#1e40af",
              }}
            >
              <strong style={{ color: "#1e40af" }}>Email:</strong>{" "}
              <Link
                href={`mailto:${email}`}
                style={{
                  color: "#f97316",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                {email}
              </Link>
            </Text>
            <Text
              style={{
                marginBottom: 15,
                fontSize: "15px",
                color: "#1e40af",
              }}
            >
              <strong style={{ color: "#1e40af" }}>Mobile:</strong>{" "}
              <span style={{ color: "#4b5563" }}>{mobile}</span>
            </Text>
            <Text
              style={{
                marginBottom: 15,
                fontSize: "15px",
                color: "#1e40af",
              }}
            >
              <strong style={{ color: "#1e40af" }}>Service:</strong>{" "}
              <span style={{ color: "#4b5563" }}>{service}</span>
            </Text>
            <Text
              style={{
                marginBottom: 15,
                fontSize: "15px",
                color: "#1e40af",
              }}
            >
              <strong style={{ color: "#1e40af" }}>Date:</strong>{" "}
              <span style={{ color: "#4b5563" }}>{date}</span>
            </Text>
            <Text
              style={{
                marginBottom: 15,
                fontSize: "15px",
                color: "#1e40af",
              }}
            >
              <strong style={{ color: "#1e40af" }}>Time:</strong>{" "}
              <span style={{ color: "#4b5563" }}>{time}</span>
            </Text>
            {message && (
              <>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: "15px",
                    color: "#1e40af",
                  }}
                >
                  <strong style={{ color: "#1e40af" }}>Message:</strong>
                </Text>
                <Text
                  style={{
                    whiteSpace: "pre-wrap",
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    marginTop: "10px",
                    fontSize: "15px",
                    color: "#4b5563",
                    lineHeight: "1.6",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {message}
                </Text>
              </>
            )}
          </Section>

          <Hr style={{ borderColor: "#e2e8f0", marginBottom: "25px" }} />

          <Section style={{ textAlign: "center" }}>
            <Text
              style={{
                fontSize: "13px",
                color: "#4b5563",
                marginBottom: 0,
                lineHeight: "1.5",
              }}
            >
              This appointment request was sent from{" "}
              <Link
                href="https://2fresources.com"
                style={{
                  color: "#f97316",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                2fresources.com
              </Link>
            </Text>
            <Text
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "10px",
                marginBottom: 0,
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
