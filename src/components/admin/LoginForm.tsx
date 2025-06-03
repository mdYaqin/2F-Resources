"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Container, Form, Button, Alert, Card, Modal } from "react-bootstrap";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [resetError, setResetError] = useState("");
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push(callbackUrl);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus("loading");
    setResetError("");

    try {
      // Replace this with your actual password reset API call
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      setResetStatus("success");
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
            <Alert variant="danger">
              <div className="d-flex justify-content-center">
                <i className="fa-solid fa-hand-middle-finger" />
                <i className="fa-solid fa-hand-middle-finger" />
                <i className="fa-solid fa-hand-middle-finger" />
              </div>
              <div className="text-center mt-2">{error}</div>
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
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
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotPassword}
        onHide={() => setShowForgotPassword(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetStatus === "success" ? (
            <Alert variant="success">
              Password reset link has been sent to your email if an account
              exists.
            </Alert>
          ) : (
            <>
              <p>
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <Form onSubmit={handleForgotPassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
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
