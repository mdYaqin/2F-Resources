// src/app/admin/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Navbar, Container } from "react-bootstrap";
import LogoutButton from "@/components/LogoutButton";
import Pageloader from "@/components/Pageloader";
import ProjectImageUploadForm from "@/components/ProjectImageUploadForm";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Pageloader />;
  }

  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin/dashboard");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/admin/dashboard">Admin Dashboard</Navbar.Brand>
          <div className="ms-auto">
            <LogoutButton />
          </div>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h1>Welcome, {session.user.email}</h1>
        <p>You have successfully accessed the admin dashboard.</p>
        <ProjectImageUploadForm />
      </Container>
    </>
  );
}
