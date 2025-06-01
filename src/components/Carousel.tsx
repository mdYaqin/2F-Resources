"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselData from "@/data/carousel.json";
import { useEffect, useState } from "react";

export default function Carousel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <div
        style={{
          width: isMobile ? 40 : 60,
          height: isMobile ? 40 : 60,
          borderRadius: 6,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Image
          src={carouselData[i].image}
          alt={`dot-${i}`}
          width={isMobile ? 40 : 60}
          height={isMobile ? 40 : 60}
          style={{
            objectFit: "cover",
            opacity: 0.4,
            border: "3px solid transparent",
            borderRadius: 6,
            transition: "opacity 0.3s ease, border-color 0.3s ease",
          }}
          className="carousel-dot-img"
        />
      </div>
    ),
    dotsClass: `slick-dots custom-dot-style`,
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .slick-dots li.slick-active .carousel-dot-img {
        opacity: 1 !important;
        border-color: #232121 !important;
      }
    `;
    document.head.appendChild(style);
    return () => void document.head.removeChild(style);
  }, []);

  return (
    <div className="container-fluid p-0 pb-5 position-relative">
      <div style={{ position: "relative" }}>
        <Slider {...settings}>
          {carouselData.map((item, index) => (
            <div key={index} className="position-relative">
              <div style={{ filter: "brightness(0.4)" }}>
                <Image
                  src={item.image}
                  alt={`carousel-${index}`}
                  width={1920}
                  height={1080}
                  className="img-fluid w-100"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
              </div>
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-12 col-lg-8">
                      <h1
                        className={`${isMobile ? "display-6" : "display-1"} text-white animated slideInDown`}
                      >
                        {item.title}
                      </h1>
                      <p
                        className={`${isMobile ? "fs-sm-1" : "fs-5"} fw-medium text-white mb-4 pb-3`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Dynamically position dots */}
        <style jsx global>{`
          .custom-dot-style {
            position: absolute;
            z-index: 10;
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex !important;
            ${isMobile
              ? `
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
      `
              : `
        top: 50%;
        right: 4%;
        transform: translateY(-50%);
        flex-direction: column;
        align-items: flex-end;
        gap: 2.8rem;
      `}
          }
        `}</style>
      </div>
    </div>
  );
}
