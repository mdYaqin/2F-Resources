"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    // Enable Bootstrap dropdowns manually if needed
    const dropdowns = document.querySelectorAll(".dropdown-toggle");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", (e) => e.preventDefault());
    });
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <Link href="/" className="navbar-brand ms-4 ms-lg-0">
        <h1 className="text-primary m-0">
          <img className="me-3" src="/img/icons/Logo1.svg" alt="Icon" />
          2F Resources
        </h1>
      </Link>

      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link
            href="/"
            className={`nav-item nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`nav-item nav-link ${
              pathname === "/about" ? "active" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/service"
            className={`nav-item nav-link ${
              pathname === "/service" ? "active" : ""
            }`}
          >
            Services
          </Link>

          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Pages
            </a>
            <div className="dropdown-menu border-0 m-0">
              <Link href="/feature" className="dropdown-item">
                Our Features
              </Link>
              <Link href="/project" className="dropdown-item">
                Our Projects
              </Link>
              <Link href="/team" className="dropdown-item">
                Team Members
              </Link>
              <Link href="/appointment" className="dropdown-item">
                Appointment
              </Link>
              <Link href="/testimonial" className="dropdown-item">
                Testimonial
              </Link>
              <Link href="/404" className="dropdown-item">
                404 Page
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            className={`nav-item nav-link ${
              pathname === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </Link>
        </div>

        <Link
          href="/appointment"
          className="btn btn-primary py-2 px-4 d-none d-lg-block"
        >
          Appointment
        </Link>
      </div>
    </nav>
  );
}
