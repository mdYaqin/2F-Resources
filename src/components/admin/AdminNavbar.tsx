"use client";
import { Container, Navbar } from "react-bootstrap";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/admin/dashboard">Admin Dashboard</Navbar.Brand>
        <div className="ms-auto">
          <LogoutButton />
        </div>
      </Container>
    </Navbar>
  );
}
