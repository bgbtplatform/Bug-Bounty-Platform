import React from "react";
import { Link } from "react-router-dom";
import pic from "../assets/pic.png";

export default function HomePage() {
  const headingFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.035em",
  };

  const trustItems = [
    "Responsible Disclosure",
    "Visible Program Scope",
    "Clear Reward Structure",
  ];

  const featuredPrograms = [
    { name: "Google", id: "69edfa9d697d61d873242d0c" },
    { name: "Meta", id: "69edfbfb697d61d873242d0f" },
    { name: "Stripe", id: "69edf67a5825484a0f4b14df" }
  ];
  return (
    <div className="min-vh-100" style={{ background: "#f8f5ef" }}>
      <section className="container py-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div
              className="h-100 rounded-4 p-4 p-lg-5"
              style={{
                background: "#f2eadf",
                border: "1px solid #e5dccf",
              }}
            >
              <span
                className="d-inline-block px-3 py-2 rounded-pill mb-4"
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  letterSpacing: "0.06em",
                }}
              >
                BUGNEST PLATFORM
              </span>

              <h1
                className="fw-bold mb-4"
                style={{
                  ...headingFont,
                  fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
                  lineHeight: "0.98",
                  color: "#111827",
                  maxWidth: "720px",
                }}
              >
                Bug bounty, presented with more clarity.
              </h1>

              <p
                className="mb-4"
                style={{
                  maxWidth: "640px",
                  color: "#4b5563",
                  fontSize: "1.12rem",
                  lineHeight: "1.8",
                }}
              >
                BugNest gives researchers and companies a cleaner way to
                explore programs, review scope, and navigate responsible
                security workflows without the page feeling noisy or difficult
                to follow.
              </p>

              <div className="d-flex gap-3 flex-wrap mb-4">
                <Link
                  to="/programs"
                  className="btn px-4 py-2"
                  style={{
                    background: "#111827",
                    color: "#ffffff",
                    fontWeight: "600",
                  }}
                >
                  Explore Programs
                </Link>
                <Link
                  to="/company"
                  className="btn px-4 py-2"
                  style={{
                    border: "1px solid #111827",
                    color: "#111827",
                    fontWeight: "600",
                  }}
                >
                  Explore Companies
                </Link>
              </div>

              <div className="d-flex flex-wrap gap-2">
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: "#fffaf2",
                      border: "1px solid #ddd1c0",
                      color: "#374151",
                      fontSize: "0.92rem",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="row g-4 h-100">
              <div className="col-12">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    background: "#111827",
                    color: "#ffffff",
                    minHeight: "210px",
                  }}
                >
                  <small
                    className="d-block mb-3"
                    style={{ color: "#cbd5e1", letterSpacing: "0.08em" }}
                  >
                    PLATFORM IDEA
                  </small>
                  <h3 className="fw-bold mb-3" style={headingFont}>
                    Clearer program pages, cleaner browsing experience.
                  </h3>
                  <p className="mb-0" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                    A bug bounty platform should feel structured and readable,
                    especially when researchers are comparing companies,
                    rewards, and expectations.
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div
                  className="rounded-4 p-3"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <img
                    src={pic}
                    alt="Bug bounty platform preview"
                    className="img-fluid rounded-4"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 pb-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="h-100 rounded-4 p-4"
                style={{
                  background: "#ffffff",
                  border: "1px solid #ece6da",
                }}
              >
                <small className="text-uppercase text-muted d-block mb-3">
                  Bounties Paid
                </small>
                <h2 className="fw-bold mb-2" style={{ ...headingFont, color: "#111827" }}>
                  $12M+
                </h2>
                <p className="text-muted mb-0">
                  Rewarded through responsible security reports.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 rounded-4 p-4"
                style={{
                  background: "#ffffff",
                  border: "1px solid #ece6da",
                }}
              >
                <small className="text-uppercase text-muted d-block mb-3">
                  Researchers
                </small>
                <h2 className="fw-bold mb-2" style={{ ...headingFont, color: "#111827" }}>
                  50K+
                </h2>
                <p className="text-muted mb-0">
                  Active hunters reviewing programs and assets.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 rounded-4 p-4"
                style={{
                  background: "#e85d3f",
                  color: "#ffffff",
                }}
              >
                <small
                  className="text-uppercase d-block mb-3"
                  style={{ color: "#ffe3dc" }}
                >
                  Programs
                </small>
                <h2 className="fw-bold mb-2" style={headingFont}>
                  1,200+
                </h2>
                <p className="mb-0" style={{ color: "#fff1ed" }}>
                  Opportunities visible across companies and scopes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-end g-4 mb-5">
            <div className="col-lg-7">
              <small
                className="d-block mb-3"
                style={{ color: "#6b7280", letterSpacing: "0.08em" }}
              >
                FEATURED PROGRAMS
              </small>
              <h2
                className="fw-bold mb-0"
                style={{ ...headingFont, fontSize: "clamp(2rem, 4vw, 3.3rem)" }}
              >
                A sharper look at the programs researchers notice first.
              </h2>
            </div>

            <div className="col-lg-5">
              <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                These cards keep the same content as before, but present it in a
                more structured way so the homepage feels less like a default
                template and more like a real product.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {featuredPrograms.map((item, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="h-100 rounded-4 p-4"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #ece6da",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <small className="text-uppercase text-muted d-block mb-2">
                        Featured Program
                      </small>
                      <h4 className="fw-bold mb-0">{item.name}</h4>
                    </div>

                    <span
                      className="px-3 py-2 rounded-pill"
                      style={{
                        background: "#f2eadf",
                        color: "#111827",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                      }}
                    >
                      Active
                    </span>
                  </div>

                  <p className="text-muted mb-4" style={{ lineHeight: "1.8" }}>
                    Review rewards, compare program expectations, and explore
                    the type of bounty opportunities available in {item.name}.
                  </p>

                  <Link
                    to={`/company/${item.id}`}
                    className="btn btn-sm"
                    style={{
                      background: "#111827",
                      color: "#ffffff",
                      fontWeight: "600",
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

      <section className="py-5">
        <div className="container">
          <div
            className="rounded-4 p-4 p-lg-5"
            style={{
              background: "#ffffff",
              border: "1px solid #ece6da",
            }}
          >
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <small
                  className="d-block mb-3"
                  style={{ color: "#6b7280", letterSpacing: "0.08em" }}
                >
                  GET STARTED
                </small>
                <h2 className="fw-bold mb-3" style={{ ...headingFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  Start exploring bug bounty opportunities with a clearer view.
                </h2>
                <p className="text-muted mb-0" style={{ lineHeight: "1.8", maxWidth: "720px" }}>
                  Browse companies, compare programs, and move through the
                  platform with a layout that feels more readable and less
                  generic.
                </p>
              </div>

              <div className="col-lg-4 text-lg-end">
                <Link
                  to="/register"
                  className="btn px-4 py-2"
                  style={{
                    background: "#e85d3f",
                    color: "#ffffff",
                    fontWeight: "600",
                  }}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
