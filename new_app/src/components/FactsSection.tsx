"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import facts from "@/data/facts.json";

export default function FactsSection() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container pt-5">
        <div className="row g-4">
          {facts.map((fact, index) => (
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={fact.delay} // Convert "0.1s" to 100ms
              key={index}
            >
              <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                <div className="fact-icon mb-4">
                  <Image
                    src={fact.icon}
                    alt={fact.title}
                    width={64}
                    height={64}
                    className="img-fluid"
                  />
                </div>
                <h3 className="mb-3">{fact.title}</h3>
                <p className="mb-0">{fact.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
