"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Topbar() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="bg-dark text-light py-2 d-none d-lg-block"
      data-aos="fade-in"
      data-aos-delay="100"
    >
      <Container fluid>
        <Row className="gx-0 align-items-center">
          <Col lg={7} className="px-4 text-start">
            <div className="d-inline-flex align-items-center">
              <a
                className="text-light me-4 text-decoration-none"
                href="tel:+6582023432"
              >
                <i className="fa fa-phone-alt text-primary me-2" />
                +65 82023432
              </a>
              <a
                className="text-light text-decoration-none"
                href="mailto:Project.sales@2Fresources.com"
              >
                <i className="fa fa-envelope-open text-primary me-2" />
                Project.sales@2Fresources.com
              </a>
            </div>
          </Col>

          <Col lg={5} className="px-4 text-end">
            <div className="d-inline-flex align-items-center">
              <a
                className="btn btn-sm btn-outline-light rounded-circle me-2"
                href="https://www.facebook.com/profile.php?id=61572212326307"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-sm btn-outline-light rounded-circle"
                href="https://www.instagram.com/2f_resources/"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
