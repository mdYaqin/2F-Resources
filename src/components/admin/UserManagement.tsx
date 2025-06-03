"use client";

import { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { User } from "@prisma/client"; // adjust if you use a custom User type
import CreateUserForm from "@/components/admin/CreateUserForm";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      console.log(data);

      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = () => {
    // setShowForm(false);
    fetchUsers(); // Refresh list after adding user
  };

  const handleDeleteUser = async (id: string) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Current Users</h4>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Hide Form" : "Add New User"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-4">
          <CreateUserForm onSuccess={handleUserCreated} />
        </div>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Name
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Email
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Role
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Created
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name ?? "-"}</td>
                <td>{user.email}</td>
                <td>{user.role ?? "user"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <Button
                    variant="link"
                    className="p-0"
                    style={{ color: "red" }}
                    aria-label="Delete user"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <i className="fa-solid fa-user-xmark"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
