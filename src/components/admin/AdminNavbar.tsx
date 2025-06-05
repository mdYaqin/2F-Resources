"use client";

import { Container, Navbar } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

const HIDDEN_ROUTES = ["/admin/login"];

export default function AdminNavbar() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  const isChangePasswordPage = pathname === "/admin/change-password";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="d-flex justify-content-between align-items-center w-100">
        {/* Left: Brand and Change Password (responsive) */}
        <div className="d-flex flex-column flex-lg-row align-items-start gap-1 gap-lg-2">
          <Navbar.Brand href="/admin/dashboard" className="mb-0">
            Admin Portal
          </Navbar.Brand>

          {!isChangePasswordPage && (
            <small className="ms-1">
              <Link
                href="/admin/change-password"
                className="fst-italic text-secondary text-decoration-none"
              >
                (Change Password)
              </Link>
            </small>
          )}
        </div>

        {/* Right: Logout */}
        <div className="ms-auto">
          <LogoutButton />
        </div>
      </Container>
    </Navbar>
  );
}
