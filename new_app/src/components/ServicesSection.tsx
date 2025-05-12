"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export default function ServicesSection() {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000, // Animation duration
        once: true, // Animate only once
      });
    }
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ maxWidth: "600px" }}
        >
          <h4 className="section-title">Our Services</h4>
          <h1 className="display-5 mb-4">
            We Focused On Modern Architecture And Interior Design
          </h1>
        </div>
        <div className="row g-4">
          {/* Service 1: Interior Design */}
          <div
            className="col-lg-6 col-md-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="service-item d-flex position-relative text-center h-100">
              <Image
                src="/img/service-1.jpg"
                alt="Interior Design"
                className="bg-img"
                width={500}
                height={300}
              />
              <div className="service-text p-5">
                <Image
                  className="mb-4"
                  src="/img/icons/icon-5.png"
                  alt="Icon"
                  width={50}
                  height={50}
                />
                <h3 className="mb-3">Interior Design</h3>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="#">
                  <i className="fa fa-plus text-primary me-3"></i>Read More
                </a>
              </div>
            </div>
          </div>

          {/* Service 2: 3D Drawing */}
          <div
            className="col-lg-6 col-md-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="service-item d-flex position-relative text-center h-100">
              <Image
                src="/img/service-2.jpg"
                alt="3D Drawing"
                className="bg-img"
                width={500}
                height={300}
              />
              <div className="service-text p-5">
                <Image
                  className="mb-4"
                  src="/img/icons/icon-6.png"
                  alt="Icon"
                  width={50}
                  height={50}
                />
                <h3 className="mb-3">3D Drawing</h3>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="#">
                  <i className="fa fa-plus text-primary me-3"></i>Read More
                </a>
              </div>
            </div>
          </div>

          {/* Service 3: Layout Planning */}
          <div
            className="col-lg-6 col-md-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="service-item d-flex position-relative text-center h-100">
              <Image
                src="/img/service-3.jpg"
                alt="Layout Planning"
                className="bg-img"
                width={500}
                height={300}
              />
              <div className="service-text p-5">
                <Image
                  className="mb-4"
                  src="/img/icons/icon-7.png"
                  alt="Icon"
                  width={50}
                  height={50}
                />
                <h3 className="mb-3">Layout Planning</h3>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="#">
                  <i className="fa fa-plus text-primary me-3"></i>Read More
                </a>
              </div>
            </div>
          </div>

          {/* Service 4: Renovation */}
          <div
            className="col-lg-6 col-md-6 mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="service-item d-flex position-relative text-center h-100">
              <Image
                src="/img/service-4.jpg"
                alt="Renovation"
                className="bg-img"
                width={500}
                height={300}
              />
              <div className="service-text p-5">
                <Image
                  className="mb-4"
                  src="/img/icons/icon-8.png"
                  alt="Icon"
                  width={50}
                  height={50}
                />
                <h3 className="mb-3">Renovation</h3>
                <p className="mb-4">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet.
                </p>
                <a className="btn" href="#">
                  <i className="fa fa-plus text-primary me-3"></i>Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
