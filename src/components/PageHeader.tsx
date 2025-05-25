"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PageHeader({ title = "" }) {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div
      className="container-fluid page-header py-5 mb-5"
      data-aos="fade-in"
      data-aos-delay="100"
    >
      <div className="container py-5">
        <h1 className="display-1 text-white" data-aos="slide-down">
          {title}
        </h1>
      </div>
    </div>
  );
}
