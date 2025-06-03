"use client";
import { Container, Navbar } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminNavbar() {
  const pathname = usePathname();
  const isChangePasswordPage = pathname === "/admin/change-password";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/admin/dashboard">Admin Portal</Navbar.Brand>
        {!isChangePasswordPage && (
          <small>
            <Link
              href="/admin/change-password"
              className="fst-italic text-secondary"
            >
              (Change Password)
            </Link>
          </small>
        )}
        <div className="ms-auto">
          <LogoutButton />
        </div>
      </Container>
    </Navbar>
  );
}
