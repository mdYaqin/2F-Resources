"use client";

import AboutSection from "@/components/AboutSection";
import Carousel from "@/components/Carousel";
import FactsSection from "@/components/FactsSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureSection from "@/components/FeatureSection";
import ProjectsSection from "@/components/ProjectsSection";
import TeamMembers from "@/components/TeamMembers";
import Testimonials from "@/components/Testimonials";
import PageHeader from "@/components/PageHeader";
import AppointmentSection from "@/components/AppointmentSection";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <>
      <PageHeader title="Contact Us" />

      {/* Contact Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5"
            data-aos="fade-up"
            data-aos-delay="100"
            style={{ maxWidth: "600px" }}
          >
            <h4 className="section-title">Contact Us</h4>
            <h1 className="display-5 mb-4">
              If You Have Any Query, Please Feel Free Contact Us
            </h1>
          </div>
          <div className="row g-5">
            {/* Left Column */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="d-flex flex-column justify-content-between h-100">
                {/* Address */}
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-map-marker-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Address</p>
                    <h3 className="mb-0">
                      51 Goldhill Plaza #07-07, Singapore 308900
                    </h3>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-phone-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Call Us Now</p>
                    <h3 className="mb-0">+65 82023432</h3>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-light d-flex align-items-center w-100 p-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-envelope-open text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Mail Us Now</p>
                    <h3 className="mb-0">Project.sales@2Fresources.com</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
              <p className="mb-4">
                The contact form is currently inactive. Get a functional and
                working contact form with Ajax & PHP in a few minutes.{" "}
                <a href="https://htmlcodex.com/contact-form">Download Now</a>.
              </p>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Start */}
      <div
        className="container-xxl pt-5 px-0"
        data-aos="fade-in"
        data-aos-delay="100"
      >
        <iframe
          src="https://www.google.com/maps?q=51+Goldhill+Plaza+%2307-07,+Singapore+308900&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {/* Google Map End */}
    </>
  );
}
