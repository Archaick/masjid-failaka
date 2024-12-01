import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { IconCloud, IconMapPin, IconCopyright } from "@tabler/icons-react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Section */}
            <div className="col-md-6">
              <h5 className="footer-title">Masjid Failaka</h5>
              <div className="icon-text">
                <IconMapPin size={20} stroke={2} className="icon-fix" />
                <span>
                  Jl. Palmerah Utara No.7, RT.3/RW.6, Palmerah, Kec. Palmerah,
                  Kota Jakarta Barat, Jakarta 11480
                </span>
              </div>
              <div className="icon-text">
                <IconCloud size={20} />
                <span>APIs Used:</span>
                <a
                  href="https://aladhan.com/prayer-times-api"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aladhan.com
                </a>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-6">
              <div className="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7067.403447745346!2d106.79319951221551!3d-6.204710039087115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6b89b400805%3A0xbfbcc376e9d09acb!2sMasjid%20Failaka!5e0!3m2!1sen!2sid!4v1732119162394!5m2!1sen!2sid"
                  title="Masjid Location"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="sub-footer">
        <div className="container">
          <div className="sub-footer-content">
            <IconCopyright size={16} className="copyright-icon" />
            <span>
              {new Date().getFullYear()} Masjid Failaka. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
