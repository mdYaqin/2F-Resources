"use client";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PageHeader from "@/components/PageHeader"; // Adjust path as needed

export default function ProjectDetails() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <PageHeader title="Project Details" />
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

          <div
            className="row g-5 align-items-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {/* Image */}
            <div className="col-lg-6">
              <div
                style={{ position: "relative", width: "100%", height: "500px" }}
              >
                <Image
                  src="/img/project-1.jpeg" // Change to your actual image path
                  alt="Project"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="col-lg-6">
              <h2 className="mb-3">Cozy Victorian</h2>

              <ul className="list-unstyled mb-4">
                <li>
                  <strong>Consultant:</strong> Marsiling Team
                </li>
                <li>
                  <strong>Job Scope:</strong> Whole Unit
                </li>
                <li>
                  <strong>Style:</strong> White Victorian
                </li>
                <li>
                  <strong>Timeline:</strong> Just 10 Weeks
                </li>
                <li>
                  <strong>Location:</strong> Woodlands
                </li>
              </ul>

              <p>
                The Cozy Victorian project is a celebration of warmth, history,
                and personal storytelling through design. Inspired by the
                grandeur and intimacy of Victorian aesthetics, this home is
                intentionally filled with layered textures, intricate detailing,
                and an eclectic mix of beloved treasures. Every corner is
                thoughtfully curated to evoke nostalgia and personal
                connections.
              </p>
            </div>
            {/* <div className="col-lg-6">
              <h1 className="mb-3">25 Years Of Experience In Architecture Industry</h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos...
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Design Approach
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Innovative Solutions
              </p>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Project Management
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
