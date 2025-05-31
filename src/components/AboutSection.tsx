// components/AboutUs.tsx
"use client";
import Image from "next/image";
import CountUp from "react-countup";

export default function AboutUs() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="about-img d-flex gap-3">
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
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
            <h4 className="section-title">About Us</h4>
            <h1 className="display-5 mb-4">
              A Creative Interior Design Agency For Your Dream Home
            </h1>
            <p>
              We are a passionate team of designers and project managers
              committed to turning your dream home into reality. With creativity
              at our core and precision in every detail, we craft spaces that
              blend beauty, functionality, and timeless elegance. Our
              collaborative approach ensures your vision takes center stage,
              while our expertise transforms challenges into innovative
              solutions. From concept to completion, we strive to deliver
              exceptional design that reflects your unique story. Let’s build
              something extraordinary together.
            </p>
            <div className="d-flex align-items-center mb-5">
              <div
                className="d-flex flex-shrink-0 align-items-center justify-content-center border border-5 border-primary"
                style={{ width: 120, height: 120 }}
              >
                <h1 className="display-1 mb-n2">
                  {/* To Do: fix count to start when on scroll view  */}
                  <CountUp end={10} duration={4.5} />
                </h1>
              </div>
              <div className="ps-4">
                <h3>Years</h3>
                <h3>Working</h3>
                <h3 className="mb-0">Experience</h3>
              </div>
            </div>
            {/* <a className="btn btn-primary py-3 px-5" href="/about">
              Read More
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
