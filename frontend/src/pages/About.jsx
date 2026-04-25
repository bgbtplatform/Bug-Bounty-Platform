function About() {
  const headingFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  const developerCards = [
    {
      name: "Developer One",
      role: "Frontend Developer",
      text: "Focused on building clean user interfaces that make bug bounty workflows easier to understand and use.",
    },
    {
      name: "Developer Two",
      role: "Backend Developer",
      text: "Worked on the platform logic and data flow to support program listings, company details, and reporting features.",
    },
    {
      name: "Developer Three",
      role: "Full Stack Developer",
      text: "Helped connect the platform experience end to end so researchers and companies can interact in a smoother way.",
    },
  ];

  const statCards = [
    { label: "Focus", value: "Responsible Disclosure" },
    { label: "Goal", value: "Clearer Program Discovery" },
    { label: "Purpose", value: "Simpler Bounty Workflows" },
  ];

  return (
    <div className="py-5" style={{ background: "#f8f5ef" }}>
      <section className="container mb-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-8">
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
                ABOUT BUGSEEK
              </span>

              <h1
                className="fw-bold mb-4"
                style={{
                  ...headingFont,
                  fontSize: "clamp(2.7rem, 5vw, 4.8rem)",
                  lineHeight: "1.02",
                  color: "#111827",
                  maxWidth: "760px",
                }}
              >
                Building a simpler space for bug bounty collaboration.
              </h1>

              <p
                className="mb-0"
                style={{
                  maxWidth: "700px",
                  color: "#4b5563",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
              >
                BugSeek is designed to connect ethical hackers with companies in
                a cleaner, more accessible environment where vulnerabilities can
                be explored, reviewed, and understood with more clarity.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="row g-4 h-100">
              {statCards.map((item, index) => (
                <div className={index === 2 ? "col-12" : "col-6"} key={item.label}>
                  <div
                    className="rounded-4 p-4 h-100"
                    style={{
                      background: index === 2 ? "#111827" : "#ffffff",
                      border: index === 2 ? "none" : "1px solid #ece6da",
                      color: index === 2 ? "#ffffff" : "#111827",
                    }}
                  >
                    <small
                      className="d-block mb-2 text-uppercase"
                      style={{
                        color: index === 2 ? "#cbd5e1" : "#6b7280",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {item.label}
                    </small>
                    <div className="fw-semibold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <div
              className="rounded-4 p-4 p-lg-5 h-100"
              style={{
                background: "#ffffff",
                border: "1px solid #ece6da",
              }}
            >
              <small
                className="d-block mb-3"
                style={{ color: "#6b7280", letterSpacing: "0.08em" }}
              >
                OUR MISSION
              </small>
              <h2 className="fw-bold mb-3" style={{ ...headingFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Make bug bounty participation feel more approachable.
              </h2>
              <p className="text-muted mb-3" style={{ lineHeight: "1.8" }}>
                BugSeek is built around the idea that security collaboration
                should feel easier to read and navigate. Researchers need
                clearer program views, and companies need a cleaner way to
                present scope, assets, and reward expectations.
              </p>
              <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                Instead of a scattered experience, the platform should guide
                both sides through exploration and reporting with more
                confidence.
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-md-6">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #ece6da",
                  }}
                >
                  <h4 className="fw-bold mb-3">For Researchers</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                    Explore programs, understand rewards, review scope, and get
                    a cleaner overview of what is worth testing.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #ece6da",
                  }}
                >
                  <h4 className="fw-bold mb-3">For Companies</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                    Present policies, eligible assets, and program expectations
                    in a way that feels easier to scan at a glance.
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    background: "#e85d3f",
                    color: "#ffffff",
                  }}
                >
                  <h4 className="fw-bold mb-3">Why It Matters</h4>
                  <p className="mb-0" style={{ color: "#fff1ed", lineHeight: "1.8" }}>
                    Bug bounty programs support responsible disclosure and help
                    organizations identify weaknesses early. A well-structured
                    platform makes that process easier to navigate for both
                    sides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-2">
        <div className="row align-items-end g-4 mb-5">
          <div className="col-lg-7">
            <small
              className="d-block mb-3"
              style={{ color: "#6b7280", letterSpacing: "0.08em" }}
            >
              DEVELOPERS
            </small>
            <h2 className="fw-bold mb-0" style={{ ...headingFont, fontSize: "clamp(2rem, 4vw, 3.3rem)" }}>
              Meet the team behind BugSeek's product and platform experience.
            </h2>
          </div>
          <div className="col-lg-5">
            <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
              Our team brings together design, development, and product
              thinking to create a platform that feels clear, reliable, and
              purposeful for both researchers and organizations.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {developerCards.map((developer) => (
            <div className="col-md-4" key={developer.name}>
              <div
                className="h-100 rounded-4 p-4"
                style={{
                  background: "#ffffff",
                  border: "1px solid #ece6da",
                }}
              >
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center fw-semibold mb-4"
                  style={{
                    width: "92px",
                    height: "92px",
                    background: "#f2eadf",
                    color: "#111827",
                    border: "1px dashed #cbbba5",
                  }}
                >
                  Photo
                </div>
                <h5 className="fw-bold mb-1">{developer.name}</h5>
                <p className="fw-semibold mb-3" style={{ color: "#e85d3f" }}>
                  {developer.role}
                </p>
                <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                  {developer.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


export default About;
