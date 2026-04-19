import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #020617, #0f172a)",
        color: "#e5e7eb",
        minHeight: "100vh",
      }}
    >
      
      <section className="container py-5">
        <div className="row align-items-center min-vh-100">

          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-3 fw-bold" style={{ lineHeight: "1.2" }}>
              Secure the{" "}
              <span style={{ color: "#3b82f6" }}>
                Internet
              </span>
              <br />
              Find Bugs Faster
            </h1>

            <p className="mt-4" style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
              A modern bug bounty platform connecting ethical hackers with companies.
            </p>

            <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
              
              <Link
                to="/programs"
                className="btn"
                style={{
                  background: "#3b82f6",
                  color: "#020617",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  fontWeight: "600",
                }}
              >
                Explore Programs
              </Link>

              <Link
                to="/report"
                className="btn"
                style={{
                  border: "1px solid #1f2937",
                  color: "#e5e7eb",
                  padding: "12px 28px",
                  borderRadius: "8px",
                }}
              >
                Report Bug
              </Link>

            </div>
          </div>

          <div className="col-lg-6 d-none d-lg-flex justify-content-center">
            <div
              style={{
                width: "420px",
                height: "420px",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(96,165,250,0.08))",
                border: "1px solid #1f2937",
                backdropFilter: "blur(20px)",
              }}
            />
          </div>

        </div>
      </section>

      <section
        className="py-5 text-center"
        style={{ borderTop: "1px solid #1f2937" }}
      >
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h2 style={{ color: "#3b82f6" }}>$12M+</h2>
              <p style={{ color: "#94a3b8" }}>Bounties Paid</p>
            </div>
            <div className="col-md-4">
              <h2 style={{ color: "#3b82f6" }}>50K+</h2>
              <p style={{ color: "#94a3b8" }}>Researchers</p>
            </div>
            <div className="col-md-4">
              <h2 style={{ color: "#3b82f6" }}>1,200+</h2>
              <p style={{ color: "#94a3b8" }}>Programs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Featured Programs</h2>

          <div className="row g-4">
            {["Google", "Meta", "Stripe"].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="p-4 h-100"
                  style={{
                    background: "#111827",
                    borderRadius: "12px",
                    border: "1px solid #1f2937",
                  }}
                >
                  <h5>{item}</h5>
                  <p style={{ color: "#94a3b8" }}>
                    Find vulnerabilities and earn rewards from {item}.
                  </p>
                  <Link
                    to={`/programs/${item.toLowerCase()}`}
                    className="btn btn-sm mt-3"
                    style={{
                      background: "#3b82f6",
                      color: "#020617",
                      borderRadius: "6px",
                      padding: "6px 16px",
                      fontWeight: "500",
                    }}
                  >
                    View Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">Start Bug Hunting Today</h2>
          <p className="mt-3" style={{ color: "#94a3b8" }}>
            Join a global community of ethical hackers.
          </p>

          <Link
            to="/register"
            className="btn mt-4"
            style={{
              background: "#3b82f6",
              color: "#020617",
              padding: "12px 32px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Join Now
          </Link>
        </div>
      </section>

    </div>
  );
}