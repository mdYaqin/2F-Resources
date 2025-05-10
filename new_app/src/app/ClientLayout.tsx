// src/app/ClientLayout.tsx
"use client";

import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Pageloader from "./components/Pageloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const spinner = () => {
      setTimeout(() => {
        const spinnerEl = document.getElementById("spinner");
        if (spinnerEl) spinnerEl.classList.remove("show");
      }, 100);
    };
    spinner();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const stickyTop = document.querySelector(
        ".sticky-top"
      ) as HTMLElement | null;
      const backToTop = document.querySelector(
        ".back-to-top"
      ) as HTMLElement | null;

      if (scrollY > 300) {
        stickyTop?.classList.add("shadow-sm");
        if (stickyTop) stickyTop.style.top = "0px";
        backToTop?.classList.add("show");
      } else {
        stickyTop?.classList.remove("shadow-sm");
        if (stickyTop) stickyTop.style.top = "-100px";
        backToTop?.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Pageloader />
      <Topbar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
