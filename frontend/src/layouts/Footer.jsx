import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#000000",
        color: "#ffffff",
        borderTop: "1px solid #e5e7eb",
      }}
      className="pt-5"
    >
      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold"> BugSeek</h5>
            <p className="mt-3" style={{ color: "#ffffff" }}>
              A modern platform connecting ethical hackers with companies to secure applications and earn rewards.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="#" style={{ color: "#ffffff" }}><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" style={{ color: "#ffffff" }}><i className="bi bi-twitter fs-5"></i></a>
              <a href="#" style={{ color: "#ffffff" }}><i className="bi bi-instagram fs-5"></i></a>
              <a href="#" style={{ color: "#ffffff" }}><i className="bi bi-linkedin fs-5"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled mt-3">
              <li><Link to="/about" style={{ color: "#ffffff", textDecoration: "none" }}>About</Link></li>
              <li><Link to="/careers" style={{ color: "#ffffff", textDecoration: "none" }}>Careers</Link></li>
              <li><Link to="/blog" style={{ color: "#ffffff", textDecoration: "none" }}>Blog</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold">Support</h6>
            <ul className="list-unstyled mt-3">
              <li><Link to="/help" style={{ color: "#ffffff", textDecoration: "none" }}>Help Center</Link></li>
              <li><Link to="/privacy" style={{ color: "#ffffff", textDecoration: "none" }}>Privacy</Link></li>
              <li><Link to="/terms" style={{ color: "#ffffff", textDecoration: "none" }}>Terms</Link></li>
              <li><Link to="/contact" style={{ color: "#ffffff", textDecoration: "none" }}>Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold">Stay Updated</h6>
            <p className="mt-3" style={{ color: "#ffffff" }}>
              Get updates on new programs and security insights.
            </p>

            <div className="d-flex mt-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                style={{
                  background: "#ffffff",
                  border: "1px solid #d1d5db",
                  color: "#111827",
                }}
              />
              <button
                className="btn ms-2"
                style={{
                  background: "#ffffff",
                  color: "#111827",
                  border: "1px solid #d1d5db",
                  fontWeight: "600",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <hr style={{ borderColor: "#e5e7eb" }} className="my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3">
          <p style={{ color: "#6b7280" }} className="mb-2 mb-md-0">
            © {new Date().getFullYear()} BugSeek. All rights reserved.
          </p>

          <div>
            <Link to="/privacy" style={{ color: "#6b7280", marginRight: "15px", textDecoration: "none" }}>
              Privacy
            </Link>
            <Link to="/terms" style={{ color: "#6b7280", marginRight: "15px", textDecoration: "none" }}>
              Terms
            </Link>
            <Link to="/sitemap" style={{ color: "#6b7280", textDecoration: "none" }}>
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;