"use client";

import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import AOS from "aos";

import moodBoardThemes from "@/data/moodBoardTheme.json";
import Image from "next/image";

export default function Theme() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % moodBoardThemes.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + moodBoardThemes.length) % moodBoardThemes.length
    );
  };

  return (
    <>
      <PageHeader title="Theme" />
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "40px 20px",
          backgroundColor: "#222222",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "30px",
            width: "100%",
            maxWidth: "1400px",
          }}
        >
          {moodBoardThemes.map((theme, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #444",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                backgroundColor: "#333",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={theme.src}
                alt={`Theme ${index + 1}`}
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                quality={100}
                priority={index < 2}
              />
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
          ))}
        </div>
      </div>

      {/* Modal for enlarged image */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="xl"
        aria-labelledby="image-modal"
      >
        <Modal.Body
          style={{
            backgroundColor: "#222222",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
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

          <Image
            src={moodBoardThemes[currentIndex].src}
            alt={`Theme ${currentIndex + 1}`}
            width={1000}
            height={700}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              maxHeight: "80vh",
            }}
          />

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
