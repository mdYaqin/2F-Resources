"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Architect Name",
    role: "Designation",
    img: "/img/team-1.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "#" },
      { icon: "fab fa-twitter", url: "#" },
      { icon: "fab fa-instagram", url: "#" },
    ],
    delay: "100",
  },
  {
    name: "Architect Name",
    role: "Designation",
    img: "/img/team-2.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "#" },
      { icon: "fab fa-twitter", url: "#" },
      { icon: "fab fa-instagram", url: "#" },
    ],
    delay: "300",
  },
  {
    name: "Architect Name",
    role: "Designation",
    img: "/img/team-3.jpg",
    socials: [
      { icon: "fas fa-envelope", url: "#" },
      { icon: "fab fa-whatsapp", url: "#" },
    ],
    delay: "500",
  },
  {
    name: "Architect Name",
    role: "Designation",
    img: "/img/team-4.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "#" },
      { icon: "fab fa-twitter", url: "#" },
      { icon: "fab fa-instagram", url: "#" },
    ],
    delay: "700",
  },
];

export default function TeamMembers() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ maxWidth: 600 }}
        >
          <h4 className="section-title">Team Members</h4>
          <h1 className="display-5 mb-4">
            We Are Creative Architecture Team For Your Dream Home
          </h1>
        </div>
        <div className="row g-0 team-items">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay={member.delay}
            >
              <div className="team-item position-relative">
                <div className="position-relative">
                  <Image
                    src={member.img}
                    alt={member.name}
                    className="img-fluid"
                    width={500}
                    height={600}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="team-social text-center position-absolute top-50 start-50 translate-middle">
                    {member.socials.map((social, idx) => (
                      <Link
                        key={idx}
                        href={social.url}
                        className="btn btn-square me-1"
                      >
                        <i className={social.icon}></i>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="bg-light text-center p-4">
                  <h3 className="mt-2">{member.name}</h3>
                  <span className="text-primary">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
