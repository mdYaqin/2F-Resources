"use client";

import { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-dark text-light pt-5" data-aos-delay="100">
      <Container>
        <Row className="g-4 pb-5 justify-content-md-center">
          <Col lg={5} md={6} data-aos="fade-up">
            <h5 className="text-light mb-4">Address</h5>
            <p>
              <i className="fa fa-map-marker-alt text-danger me-2" />
              51 Goldhill Plaza #07-07, Singapore 308900
            </p>
            <p>
              <i className="fa fa-phone-alt text-success me-2" />
              +65 82023432
            </p>
            <p>
              <i className="fa fa-envelope text-info me-2" />
              Project.sales@2Fresources.com
            </p>
          </Col>

          <Col lg={2} md={6} data-aos="fade-up" data-aos-delay="200">
            <h5 className="text-light mb-4">Services</h5>
            <ul className="list-unstyled text-secondary">
              <li>Interior Design</li>
              <li>3D Drawing</li>
              <li>Layout Planning</li>
              <li>Renovation</li>
            </ul>
          </Col>

          <Col lg={2} md={6} data-aos="fade-up" data-aos-delay="400">
            <h5 className="text-light mb-4">Quick Links</h5>
            <div className="d-flex flex-column text-primary">
              <Link href="#">About Us</Link>
              <Link href="#">Contact Us</Link>
              <Link href="#">Our Services</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Support</Link>
            </div>
          </Col>

          <Col lg={2} md={6} data-aos="fade-up" data-aos-delay="600">
            <h5 className="text-light mb-4">Follow Us</h5>
            <div className="d-flex gap-2">
              <Button
                variant="outline-light"
                href="https://www.instagram.com/2f_resources/"
                className="rounded-circle"
              >
                <i className="fab fa-instagram" />
              </Button>
              <Button
                variant="outline-light"
                href="https://www.facebook.com/profile.php?id=61572212326307"
                className="rounded-circle"
              >
                <i className="fab fa-facebook-f" />
              </Button>
              {/* Add more icons here if needed */}
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
                www.2fresources.com
              </Link>
              , All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
