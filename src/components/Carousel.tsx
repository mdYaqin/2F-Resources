"use client";

import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.scss";
import carouselData from "@/data/carousel.json";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <div className={styles.dotWrapper}>
        <Image
          src={carouselData[i].image}
          alt={`dot-${i}`}
          width={60}
          height={60}
          className={styles.dotImage}
        />
      </div>
    ),
    dotsClass: `slick-dots ${styles.customDots}`,
  };

  return (
    <div className="container-fluid p-0 pb-5">
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <div className={styles.slide} key={index}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt="carousel"
                width={1920}
                height={1080}
                className="img-fluid w-100"
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
            <div className={`carousel-inner ${styles.textOverlay}`}>
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-1 text-white animated slideInDown">
                      {item.title}
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-3">
                      {item.description}
                    </p>
                    {/* <a
                      href={item.link}
                      className="btn btn-primary py-3 px-5 animated slideInLeft"
                    >
                      Read More
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
