"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { User } from "@prisma/client"; // adjust if you use a custom User type
import CreateUserForm from "@/components/admin/CreateUserForm";
import Pageloader from "../Pageloader";

export default function UserManagement() {
  const { data: session, status } = useSession();
  const currentUserId = session?.user?.id || null;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = () => {
    fetchUsers(); // Refresh list after adding user
  };

  const handleDeleteUser = async (id: string) => {
    if (!id || id === currentUserId) return; // prevent deleting self

    setDeletingUserId(id);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setError("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUsers();
    }
  }, [status]);

  if (status === "loading") {
    return <Pageloader fullScreen={true} />;
  }

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

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {loading ? (
        <Pageloader fullScreen={false} />
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isCurrentUser = user.id === currentUserId;
              return (
                <tr key={user.id}>
                  <td>{user.name ?? "-"}</td>
                  <td>{user.email}</td>
                  <td>{user.role ?? "user"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="link"
                      className="p-0"
                      style={{
                        color: isCurrentUser ? "gray" : "red",
                        cursor: isCurrentUser ? "not-allowed" : "pointer",
                      }}
                      disabled={deletingUserId === user.id || isCurrentUser}
                      onClick={() =>
                        !isCurrentUser && handleDeleteUser(user.id)
                      }
                      title={
                        isCurrentUser
                          ? "You cannot delete your own user account."
                          : "Delete user"
                      }
                      aria-label={
                        isCurrentUser
                          ? "Cannot delete current user"
                          : "Delete user"
                      }
                    >
                      {deletingUserId === user.id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <i className="fa-solid fa-user-xmark"></i>
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
