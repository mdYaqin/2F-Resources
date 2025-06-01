"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const TITLES = [
  "Expert Design & Planning Solutions",
  "Transforming Spaces with Innovative Designs",
  "Best Design And Build Services",
];

export default function VideoSection() {
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % TITLES.length);
    }, 3000); // rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col className="p-0">
          <div className="position-relative">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-100"
              style={{ height: "500px", objectFit: "cover" }}
            >
              <source src="/reno_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            >
              <h1 className="text-white fw-bold display-4 text-center">
                {TITLES[currentTitle]}
              </h1>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
