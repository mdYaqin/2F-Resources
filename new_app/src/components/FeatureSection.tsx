"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function WhyChooseUsSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          {/* Text Column */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h4 className="section-title">Why Choose Us!</h4>
            <h1 className="display-5 mb-4">
              Why You Should Trust Us? Learn More About Us!
            </h1>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet.
            </p>

            <div className="row g-4">
              {/* Feature 1 */}
              <div className="col-12 d-flex align-items-start">
                <Image
                  src="/img/icons/icon-2.png"
                  alt="Icon"
                  width={50}
                  height={50}
                  className="flex-shrink-0"
                />
                <div className="ms-4">
                  <h3>Design Approach</h3>
                  <p className="mb-0">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="col-12 d-flex align-items-start">
                <Image
                  src="/img/icons/icon-3.png"
                  alt="Icon"
                  width={50}
                  height={50}
                  className="flex-shrink-0"
                />
                <div className="ms-4">
                  <h3>Innovative Solutions</h3>
                  <p className="mb-0">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="col-12 d-flex align-items-start">
                <Image
                  src="/img/icons/icon-4.png"
                  alt="Icon"
                  width={50}
                  height={50}
                  className="flex-shrink-0"
                />
                <div className="ms-4">
                  <h3>Project Management</h3>
                  <p className="mb-0">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
            <div className="feature-img d-flex flex-wrap gap-3">
              <Image
                src="/img/about-2.jpg"
                alt="About 2"
                className="img-fluid"
                width={500}
                height={300}
              />
              <Image
                src="/img/about-1.jpg"
                alt="About 1"
                className="img-fluid"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
