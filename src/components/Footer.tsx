"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import { socialLinks, contactInfo } from "@/data/socials";

export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-dark text-light pt-5" data-aos-delay="100">
      <Container>
        <Row className="g-4 pb-5 justify-content-md-center">
          <Col lg={5} md={6} xs={12} data-aos="fade-up">
            <h5 className="text-light mb-4">Address</h5>
            <p>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-danger me-2"
              />
              <a
                href={contactInfo.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light text-decoration-none"
                aria-label="View address on map"
              >
                {contactInfo.address}
              </a>
            </p>
            <p>
              <FontAwesomeIcon
                icon={faPhoneAlt}
                className="text-success me-2"
              />
              <a
                href={contactInfo.phoneHref}
                className="text-light text-decoration-none"
                aria-label={`Call us at ${contactInfo.phone}`}
              >
                {contactInfo.phone}
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="text-info me-2" />
              <a
                href={contactInfo.emailHref}
                className="text-light text-decoration-none"
                aria-label={`Email us at ${contactInfo.email}`}
              >
                {contactInfo.email}
              </a>
            </p>
          </Col>

          <Col lg={2} sm={3} xs={6} data-aos="fade-up" data-aos-delay="200">
            <h5 className="text-light mb-4">Services</h5>
            <ul className="list-unstyled text-secondary">
              <li>Interior Design</li>
              <li>3D Drawing</li>
              <li>Layout Planning</li>
              <li>Renovation</li>
            </ul>
          </Col>

          <Col lg={2} sm={3} xs={6} data-aos="fade-up" data-aos-delay="400">
            <h5 className="text-light mb-4">Quick Links</h5>
            <div className="d-flex flex-column text-secondary">
              <Link href="/about" className="text-decoration-none">
                About Us
              </Link>
              <Link href="/contact" className="text-decoration-none">
                Contact Us
              </Link>
            </div>
          </Col>

          <Col lg={2} sm={3} data-aos="fade-up" data-aos-delay="600">
            <h5 className="text-light mb-4">Follow Us</h5>
            <div className="d-flex gap-2">
              <SocialMediaLinks links={socialLinks} />
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bg-black py-3">
        <Container>
          <Row>
            <Col className="text-center">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="#" className="text-light text-decoration-none">
                {contactInfo.website}
              </Link>
              , All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
