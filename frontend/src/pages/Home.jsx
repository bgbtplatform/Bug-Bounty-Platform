import React from "react";
import { Link } from "react-router-dom";
import pic from "../assets/pic.png";

export default function HomePage() {
  return (
    <div className="min-vh-100">

      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center min-vh-100">

          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-3 fw-bold">
              Secure the Internet <br />
              Find Bugs Faster
            </h1>

            <p className="mt-4 text-muted">
              A modern bug bounty platform connecting ethical hackers with companies.
            </p>

            <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
              <Link to="/programs" className="btn btn-primary">
                Explore Programs
              </Link>

              <Link to="/report" className="btn btn-outline-secondary">
                Report Bug
              </Link>
            </div>
          </div>

          <div className="col-lg-6 d-none d-lg-flex justify-content-center">
            <img
              src={pic}
              alt="hero"
              className="img-fluid rounded"
              style={{ maxWidth: "420px" }}
            />
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="py-5 text-center border-top">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h2>$12M+</h2>
              <p className="text-muted">Bounties Paid</p>
            </div>
            <div className="col-md-4">
              <h2>50K+</h2>
              <p className="text-muted">Researchers</p>
            </div>
            <div className="col-md-4">
              <h2>1,200+</h2>
              <p className="text-muted">Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Featured Programs</h2>

          <div className="row g-4">
            {["Google", "Meta", "Stripe"].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="p-4 h-100 border rounded">
                  <h5>{item}</h5>
                  <p className="text-muted">
                    Find vulnerabilities and earn rewards from {item}.
                  </p>
                  <Link
                    to={`/programs/${item.toLowerCase()}`}
                    className="btn btn-sm btn-primary mt-3"
                  >
                    View Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">Start Bug Hunting Today</h2>
          <p className="mt-3 text-muted">
            Join a global community of ethical hackers.
          </p>

          <Link to="/register" className="btn btn-primary mt-4">
            Join Now
          </Link>
        </div>
      </section>

    </div>
  );
}