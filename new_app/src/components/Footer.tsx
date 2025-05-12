"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos"; // Ensure AOS is initialized

export default function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Animation runs only once
    });
  }, []);

  return (
    <div
      className="container-fluid bg-dark text-body footer mt-5 pt-5 px-0"
      data-aos-delay="100"
    >
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6" data-aos="fade-up">
            <h3 className="text-light mb-4">Address</h3>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary me-3"></i>
              51 Goldhill Plaza #07-07, Singapore 308900
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt text-primary me-3"></i>
              +65 82023432
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary me-3"></i>
              Project.sales@2Fresources.com
            </p>
            <div className="d-flex pt-2">
              <a className="btn btn-square btn-outline-body me-1" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-square btn-outline-body me-1" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-square btn-outline-body me-1" href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a className="btn btn-square btn-outline-body me-0" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div
            className="col-lg-3 col-md-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-light mb-4">Services</h3>
            <a className="btn btn-link" href="#">
              Architecture
            </a>
            <a className="btn btn-link" href="#">
              3D Animation
            </a>
            <a className="btn btn-link" href="#">
              House Planning
            </a>
            <a className="btn btn-link" href="#">
              Interior Design
            </a>
            <a className="btn btn-link" href="#">
              Construction
            </a>
          </div>

          <div
            className="col-lg-3 col-md-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3 className="text-light mb-4">Quick Links</h3>
            <a className="btn btn-link" href="#">
              About Us
            </a>
            <a className="btn btn-link" href="#">
              Contact Us
            </a>
            <a className="btn btn-link" href="#">
              Our Services
            </a>
            <a className="btn btn-link" href="#">
              Terms & Condition
            </a>
            <a className="btn btn-link" href="#">
              Support
            </a>
          </div>

          <div
            className="col-lg-3 col-md-6"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <h3 className="text-light mb-4">Newsletter</h3>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            <div
              className="position-relative mx-auto"
              style={{ maxWidth: 400 }}
            >
              <input
                className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                type="text"
                placeholder="Your email"
              />
              <button
                type="button"
                className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <Link href="#">www.2fresources.com</Link>, All Right
              Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
