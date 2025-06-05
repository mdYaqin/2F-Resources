"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Pageloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <div
        className="spinner-border position-relative text-primary"
        style={{ width: "6rem", height: "6rem" }}
        role="status"
      />
      <Image
        src="/logo.svg"
        alt="Icon"
        className="position-absolute top-50 start-50 translate-middle"
        width={60}
        height={60}
      />
    </div>
  );
}
