"use client";

import { useSession } from "next-auth/react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";

export default function ChangePassword() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id; // adjust this based on your session user object shape

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (!userId) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          You must be logged in to change your password.
        </Alert>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (newPassword !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/admin/users/change-password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, currentPassword, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Password change failed");
      setLoading(false);
      return;
    }

    setMessage("Password changed successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirm("");
    setLoading(false);
  };

  return (
    <Container style={{ maxWidth: "500px" }} className="my-5">
      <h2 className="mb-4 text-center">Change Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="currentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </Button>
      </Form>
    </Container>
  );
}
