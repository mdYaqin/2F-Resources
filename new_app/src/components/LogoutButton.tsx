// src/components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { Button } from "react-bootstrap";

export default function LogoutButton() {
  return (
    <Button
      variant="outline-light"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      Logout
    </Button>
  );
}
