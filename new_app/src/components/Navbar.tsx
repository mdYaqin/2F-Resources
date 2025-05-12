"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5"
      data-aos="fade-in"
      data-aos-delay="100"
    >
      <Link href="/" className="navbar-brand ms-4 ms-lg-0">
        <h1 className="text-primary m-0 d-flex align-items-center">
          <Image
            src="/img/icons/Logo1.svg"
            alt="Logo"
            width={80}
            height={80}
            className="me-3"
          />
          2F Resources
        </h1>
      </Link>

      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link href="/" className="nav-item nav-link active">
            Home
          </Link>
          <Link href="/about" className="nav-item nav-link">
            About
          </Link>
          <Link href="/project" className="nav-item nav-link">
            Our Projects
          </Link>

          {/* <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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
          </div> */}

          <Link href="/contact" className="nav-item nav-link">
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
