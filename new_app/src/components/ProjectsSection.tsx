"use client";
import { useEffect } from "react";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container-xxl project py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ maxWidth: "600px" }}
        >
          <h4 className="section-title">Our Projects</h4>
          <h1 className="display-5 mb-4">
            Visit Our Latest Projects And Our Innovative Works
          </h1>
        </div>
        <div className="row g-4" data-aos="fade-up" data-aos-delay="300">
          <div className="col-lg-4">
            <div className="nav nav-pills d-flex flex-column">
              {[
                "Jurong West ST 81",
                "Bukit Timah Rd",
                "Tampines Ave 8",
                "Yishun St 51",
              ].map((label, i) => (
                <button
                  key={i}
                  className={`nav-link text-start p-4 mb-3 ${
                    i === 0 ? "active" : ""
                  }`}
                  data-bs-toggle="pill"
                  data-bs-target={`#tab-pane-${i + 1}`}
                  type="button"
                >
                  <h3 className="m-0">{`0${i + 1}. ${label}`}</h3>
                </button>
              ))}
            </div>
          </div>
          <div className="col-lg-8">
            <div className="tab-content">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`tab-pane fade ${i === 1 ? "show active" : ""}`}
                  id={`tab-pane-${i}`}
                >
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <Image
                          src={`/img/project-${i}.jpeg`}
                          alt={`Project ${i}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h1 className="mb-3">
                        25 Years Of Experience In Architecture Industry
                      </h1>
                      <p className="mb-4">
                        With over two decades of hands-on experience, we’ve
                        built a reputation for excellence in delivering timeless
                        design and high-quality renovations. Our approach blends
                        creativity, innovation, and expert project management to
                        bring your vision to life — beautifully and efficiently.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Design
                        Approach
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Innovative Solutions
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Project
                        Management
                      </p>
                      <Link
                        href="/projects/5243"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
