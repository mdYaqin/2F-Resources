// app/admin/login/page.tsx
import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";
import Pageloader from "@/components/Pageloader";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<Pageloader />}>
      <LoginForm />
    </Suspense>
  );
}
