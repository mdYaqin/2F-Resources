"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const teamMembers = [
  {
    name: "Fathiin",
    designation: "Interior Designer",
    img: "/img/Fathiin.jpeg",
    socials: [
      { icon: "fab fa-facebook-f", url: "#" },
      { icon: "fab fa-twitter", url: "#" },
      { icon: "fab fa-instagram", url: "#" },
    ],
    aosDelay: "100",
  },
  {
    name: "Syafiq",
    designation: "Interior Designer",
    img: "/img/Syafiq.jpeg",
    socials: [
      { icon: "fab fa-facebook-f", url: "#" },
      { icon: "fab fa-twitter", url: "#" },
      { icon: "fab fa-instagram", url: "#" },
    ],
    aosDelay: "300",
  },
  {
    name: "Yaqin",
    designation: "Interior Designer",
    img: "/img/Yaqin.jpeg",
    socials: [
      { icon: "fas fa-envelope", url: "#" },
      { icon: "fab fa-whatsapp", url: "#" },
    ],
    aosDelay: "500",
  },
  // {
  //   name: "Architect Name",
  //   designation: "Designation",
  //   img: "/img/team-4.jpg",
  //   socials: [
  //     { icon: "fab fa-facebook-f", url: "#" },
  //     { icon: "fab fa-twitter", url: "#" },
  //     { icon: "fab fa-instagram", url: "#" },
  //   ],
  //   aosDelay: "700",
  // },
];

const TeamSection = () => {
  useEffect(() => {
    AOS.init({ once: true });
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
          <h4 className="section-title">Team Members</h4>
          <h1 className="display-5 mb-4">
            We Are Creative Interior Design Team For Your Dream Home
          </h1>
        </div>
        <div
          className="row g-0 team-items"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {teamMembers.map((member, index) => (
            <div
              className="col-lg-3 col-md-6"
              key={index}
              data-aos="fade-up"
              data-aos-delay={member.aosDelay}
            >
              <div className="team-item position-relative">
                <div className="position-relative overflow-hidden">
                  <div
                    className="w-100"
                    style={{ height: "400px", position: "relative" }}
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>

                  <div
                    className="team-social position-absolute start-0 bottom-0 w-100 text-center py-2"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  >
                    {member.socials.map((social, idx) => (
                      <Link
                        key={idx}
                        href={social.url}
                        className="btn btn-square btn-sm text-white mx-1"
                      >
                        <i className={social.icon}></i>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="bg-light text-center p-4">
                  <h3 className="mt-2">{member.name}</h3>
                  <span className="text-primary">{member.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
