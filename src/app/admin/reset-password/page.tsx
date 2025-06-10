// app/admin/reset-password/page.tsx
import { Suspense } from "react";
import ResetPassword from "@/components/admin/ResetPassword";
import Pageloader from "@/components/Pageloader";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Pageloader />}>
      <ResetPassword />
    </Suspense>
  );
}
