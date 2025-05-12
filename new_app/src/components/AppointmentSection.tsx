"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AppointmentSection() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h4 className="section-title">Appointment</h4>
            <h1 className="display-5 mb-4">
              Make An Appointment To Start Your Dream Project
            </h1>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </p>
            <div className="row g-4">
              <div className="col-12">
                <div className="d-flex">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-light"
                    style={{ width: 65, height: 65 }}
                  >
                    <i className="fa fa-2x fa-phone-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Call Us Now</p>
                    <h3 className="mb-0">+012 345 6789</h3>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-light"
                    style={{ width: 65, height: 65 }}
                  >
                    <i className="fa fa-2x fa-envelope-open text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Mail Us Now</p>
                    <h3 className="mb-0">info@example.com</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  style={{ height: 55 }}
                />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  style={{ height: 55 }}
                />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Mobile"
                  style={{ height: 55 }}
                />
              </div>
              <div className="col-12 col-sm-6">
                <select className="form-select" style={{ height: 55 }}>
                  <option defaultValue>Choose Service</option>
                  <option value="1">Service 1</option>
                  <option value="2">Service 2</option>
                  <option value="3">Service 3</option>
                </select>
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Choose Date"
                  style={{ height: 55 }}
                />
              </div>
              <div className="col-12 col-sm-6">
                <input
                  type="time"
                  className="form-control"
                  placeholder="Choose Time"
                  style={{ height: 55 }}
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
