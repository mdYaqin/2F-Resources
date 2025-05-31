"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const testimonials = [
  {
    text: "Clita clita tempor justo dolor ipsum amet kasd amet duo...",
    name: "Client Name",
    profession: "Profession",
    image: "/img/testimonial-1.jpg",
  },
  {
    text: "Clita clita tempor justo dolor ipsum amet kasd amet duo...",
    name: "Client Name",
    profession: "Profession",
    image: "/img/testimonial-2.jpg",
  },
  {
    text: "Clita clita tempor justo dolor ipsum amet kasd amet duo...",
    name: "Client Name",
    profession: "Profession",
    image: "/img/testimonial-3.jpg",
  },
];

export default function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5"
          data-aos="fade-up"
          style={{ maxWidth: 600 }}
        >
          <h4 className="section-title">Testimonial</h4>
          <h1 className="display-5 mb-4">
            Thousands Of Customers Who Trust Us And Our Services
          </h1>
        </div>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={true}
          className="testimonial-carousel"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className="testimonial-item text-center px-4"
                data-aos="fade-up"
              >
                <p className="fs-5">{testimonial.text}</p>
                <h3>{testimonial.name}</h3>
                <span className="text-primary">{testimonial.profession}</span>
                <div className="mt-4 d-flex justify-content-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-circle"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
