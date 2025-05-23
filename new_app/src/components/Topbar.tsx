"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Topbar() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="container-fluid bg-dark p-0"
      data-aos="fade-in"
      data-aos-delay="100"
    >
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center py-3 me-3">
            <a className="text-body px-2" href="tel:+65 82023432">
              <i className="fa fa-phone-alt text-primary me-2" />
              +65 82023432
            </a>
            <a className="text-body px-2" href="mailto:Project.sales@2Fresources.com">
              <i className="fa fa-envelope-open text-primary me-2" />
              Project.sales@2Fresources.com

            </a>
          </div>
        </div>

        <div className="col-lg-5 px-5 text-end">
          {/* <div className="h-100 d-inline-flex align-items-center py-3 me-2">
            <a className="text-body px-2" href="#">
              Terms
            </a>
            <a className="text-body px-2" href="#">
              Privacy
            </a>
          </div> */}
          <div className="h-100 d-inline-flex align-items-center">
            <a className="btn btn-sm-square btn-outline-body me-1" href="https://www.facebook.com/profile.php?id=61572212326307">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="btn btn-sm-square btn-outline-body me-0" href="https://www.instagram.com/2f_resources/">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
