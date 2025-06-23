"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Container, Form, Button, Alert, Card, Modal } from "react-bootstrap";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [resetError, setResetError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const trimmedEmail = email.trim().toLowerCase();

    const result = await signIn("credentials", {
      email: trimmedEmail,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (result?.error) {
      if (result.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Request cannot be completed. Please try again later.");
      }
    } else {
      router.push(callbackUrl);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus("loading");
    setResetError("");

    try {
      const response = await fetch("/api/admin/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail.trim().toLowerCase() }),
      });

      if (!response.ok) throw new Error("Failed to send reset email");

      setResetStatus("success");

      // Close modal after short delay and show confirmation
      setTimeout(() => {
        setShowForgotPassword(false);
        setShowConfirmation(true);
        setResetEmail("");
        setResetStatus("idle");
      }, 1500);
    } catch (err) {
      setResetStatus("error");
      setResetError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Admin Login</Card.Title>

          {error && (
            <Alert variant="danger" className="text-center mt-2">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="current-password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="mb-3 text-end">
              <Button
                variant="link"
                onClick={() => setShowForgotPassword(true)}
                className="p-0"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Optional reset confirmation */}
      {showConfirmation && (
        <Alert
          variant="info"
          className="position-fixed top-0 start-50 translate-middle-x mt-3 w-auto"
          dismissible
          onClose={() => setShowConfirmation(false)}
          style={{ zIndex: 1051 }}
        >
          Password reset link sent (if account exists).
        </Alert>
      )}

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotPassword}
        onHide={() => {
          setShowForgotPassword(false);
          setResetEmail("");
          setResetStatus("idle");
          setResetError("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetStatus === "success" ? (
            <Alert variant="success">
              A reset link has been sent to your email if it exists.
            </Alert>
          ) : (
            <>
              <p>
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
              <Form onSubmit={handleForgotPassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="email"
                    aria-label="Reset email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                {resetStatus === "error" && (
                  <Alert variant="danger" className="mt-2">
                    {resetError}
                  </Alert>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={resetStatus === "loading"}
                >
                  {resetStatus === "loading" ? "Sending..." : "Send Reset Link"}
                </Button>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
