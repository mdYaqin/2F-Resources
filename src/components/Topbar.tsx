"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { socialLinks, contactInfo } from "@/data/socials";
import SocialMediaLinks from "@/components/SocialMediaLinks";

export default function Topbar() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className="bg-dark text-light py-2 d-none d-lg-block"
      data-aos="fade-in"
      data-aos-delay="100"
    >
      <nav aria-label="Top contact bar">
        <Container fluid>
          <Row className="gx-0 align-items-center">
            {/* Contact info */}
            <Col lg={7} className="px-4 text-start">
              <div className="d-inline-flex align-items-center">
                <a
                  className="text-light me-4 text-decoration-none"
                  href={contactInfo.phoneHref}
                  aria-label="Call us at +65 82023432"
                >
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="text-success me-2"
                  />
                  {contactInfo.phone}
                </a>
                <a
                  className="text-light text-decoration-none"
                  href={contactInfo.emailHref}
                  aria-label="Email us at Project.sales@2Fresources.com"
                >
                  <FontAwesomeIcon
                    icon={faEnvelopeOpen}
                    className="text-info me-2"
                  />
                  {contactInfo.email}
                </a>
              </div>
            </Col>

            {/* Social media */}
            <Col lg={5} className="text-end px-0 ">
              <SocialMediaLinks links={socialLinks} size="sm" align="end" />
            </Col>
          </Row>
        </Container>
      </nav>
    </div>
  );
}
