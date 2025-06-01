"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { Container, Row, Col } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function AboutUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  return (
    <Container fluid className="py-5">
      <Container>
        <Row className="g-5">
          <Col lg={6} data-aos="fade-up" data-aos-delay="100">
            <div className="d-flex gap-3">
              <Image
                className="img-fluid w-50"
                src="/img/about-1.jpg"
                alt="About 1"
                width={500}
                height={500}
              />
              <Image
                className="img-fluid w-50"
                src="/img/about-2.jpg"
                alt="About 2"
                width={500}
                height={500}
              />
            </div>
          </Col>

          <Col lg={6} data-aos="fade-up" data-aos-delay="500">
            <h4 className="section-title">About Us</h4>
            <h1 className="display-5 mb-4">
              A Creative Interior Design Agency For Your Dream Home
            </h1>
            <p>
              We are a passionate team of designers and project managers
              committed to turning your dream home into reality...
            </p>

            <div className="d-flex align-items-center mb-5" ref={ref}>
              <div
                className="d-flex flex-shrink-0 align-items-center justify-content-center border border-5 border-primary"
                style={{ width: 120, height: 120 }}
              >
                <h1 className="display-1 mb-n2">
                  {startCount && <CountUp end={10} duration={4.5} />}
                </h1>
              </div>
              <div className="ps-4">
                <h3>Years</h3>
                <h3>Working</h3>
                <h3 className="mb-0">Experience</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
