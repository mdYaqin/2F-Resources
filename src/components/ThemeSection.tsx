"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import moodBoardThemes from "@/data/moodBoardTheme.json";

export default function Theme() {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % moodBoardThemes.length);
  };

  const goToPrev = () =>
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + moodBoardThemes.length) % moodBoardThemes.length
    );

  return (
    <>
      <section
        style={{
          backgroundColor: "#222",
          padding: "40px 0",
          minHeight: "100vh",
        }}
      >
        <Container data-aos="fade-up" data-aos-delay="200">
          <Row className="g-4">
            {moodBoardThemes.map((theme, index) => (
              <Col
                key={index}
                xs={12}
                md={6}
                onClick={() => handleImageClick(index)}
              >
                <div
                  style={{
                    border: "1px solid #444",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    backgroundColor: "#333",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "3 / 2" }}>
                    <Image
                      src={theme.src}
                      alt={`Theme ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      quality={100}
                      priority={index < 2}
                    />
                  </div>
                  <div
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      backgroundColor: "#333",
                      borderTop: "1px solid #444",
                      color: "#fff",
                      fontSize: "0.9rem",
                    }}
                  >
                    Theme {index + 1} of {moodBoardThemes.length}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="xl"
        aria-labelledby="theme-image-modal"
      >
        <Modal.Body
          style={{
            backgroundColor: "#222",
            padding: 0,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="dark"
            onClick={goToPrev}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              opacity: 0.7,
            }}
          >
            &#8592;
          </Button>

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              aspectRatio: "3 / 2",
              margin: "0 auto",
            }}
          >
            <Image
              src={moodBoardThemes[currentIndex].src}
              alt={`Theme ${currentIndex + 1}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          <Button
            variant="dark"
            onClick={goToNext}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              opacity: 0.7,
            }}
          >
            &#8594;
          </Button>
        </Modal.Body>

        <Modal.Footer
          style={{
            backgroundColor: "#333",
            color: "#fff",
            justifyContent: "center",
          }}
        >
          Theme {currentIndex + 1} of {moodBoardThemes.length}
        </Modal.Footer>
      </Modal>
    </>
  );
}
