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
              A Creative Architecture Agency For Your Dream Home
            </h1>
            <p>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </p>
            <p className="mb-4">
              Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No
              stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo
              nonumy clita sit at, sed sit sanctus dolor eos.
            </p>
            <div className="d-flex align-items-center mb-5">
              <div
                className="d-flex flex-shrink-0 align-items-center justify-content-center border border-5 border-primary"
                style={{ width: 120, height: 120 }}
              >
                <h1 className="display-1 mb-n2">
                  {/* To Do: fix count to start when on scroll view  */}
                  <CountUp end={25} duration={4.5} />
                </h1>
              </div>
              <div className="ps-4">
                <h3>Years</h3>
                <h3>Working</h3>
                <h3 className="mb-0">Experience</h3>
              </div>
            </div>
            <a className="btn btn-primary py-3 px-5" href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
