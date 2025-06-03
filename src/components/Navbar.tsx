"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Offcanvas,
} from "react-bootstrap";

export default function AppNavbar() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleClose = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      bg="white"
      variant="light"
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded}
      className="py-lg-0 px-lg-5"
      data-aos="fade-in"
      data-aos-delay="100"
    >
      <Container fluid className="px-0 px-md-3">
        <Link
          href="/"
          className="navbar-brand ps-2 ps-lg-0 ms-0 ms-lg-0"
          onClick={handleClose}
        >
          <h1 className="text-primary m-0 d-flex align-items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={80}
              height={80}
              className="me-2 me-lg-3"
            />
            <span>2F Resources</span>
          </h1>
        </Link>

        <Navbar.Toggle aria-controls="main-navbar" className="me-2" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto p-4 p-lg-0">
            <Link href="/" className="nav-link" onClick={handleClose}>
              Home
            </Link>
            <Link href="/about" className="nav-link" onClick={handleClose}>
              About
            </Link>
            <Link href="/projects" className="nav-link" onClick={handleClose}>
              Our Projects
            </Link>
            <Link href="/theme" className="nav-link" onClick={handleClose}>
              Our Themes
            </Link>
            <Link href="/contact" className="nav-link" onClick={handleClose}>
              Contact
            </Link>
            <Link
              href="/appointment"
              className="btn btn-primary m-auto"
              onClick={handleClose}
            >
              Appointment
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
