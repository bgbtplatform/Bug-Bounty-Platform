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

  return (
    <div className="py-5">
      <section className="container mb-5">
        <div
          className="rounded-4 p-5 text-white"
          style={{
            background:
              "linear-gradient(135deg, #111827 0%, #1f2937 55%, #374151 100%)",
          }}
        >
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-light text-dark mb-3 px-3 py-2">
                About BugSeek
              </span>
              <h1 className="display-5 fw-bold mb-3" style={headingFont}>
                Building a simpler space for bug bounty collaboration
              </h1>
              <p
                className="fs-5 mb-0"
                style={{ maxWidth: "760px", color: "#e5e7eb", lineHeight: "1.7" }}
              >
                BugSeek is designed to connect ethical hackers with companies in
                a cleaner, more accessible environment where vulnerabilities can
                be explored, reported, and reviewed with more clarity.
              </p>
            </div>

            <div className="col-lg-4">
              <div className="row g-3">
                <div className="col-6">
                  <div
                    className="rounded-4 p-3 h-100"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <small
                      className="text-uppercase d-block mb-2"
                      style={{ color: "#d1d5db", letterSpacing: "0.08em" }}
                    >
                      Focus
                    </small>
                    <div className="fw-semibold">Responsible Disclosure</div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="rounded-4 p-3 h-100"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <small
                      className="text-uppercase d-block mb-2"
                      style={{ color: "#d1d5db", letterSpacing: "0.08em" }}
                    >
                      Goal
                    </small>
                    <div className="fw-semibold">Clearer Program Discovery</div>
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="rounded-4 p-3"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <small
                      className="text-uppercase d-block mb-2"
                      style={{ color: "#d1d5db", letterSpacing: "0.08em" }}
                    >
                      Purpose
                    </small>
                    <div className="fw-semibold">
                      To make bug bounty workflows easier to understand for both
                      researchers and companies.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <div className="border rounded-4 h-100 p-4 bg-white">
              <span className="badge text-bg-dark mb-3">Our Mission</span>
              <h2 className="fw-bold mb-3" style={headingFont}>
                Make bug bounty participation feel more approachable
              </h2>
              <p className="text-muted mb-3" style={{ lineHeight: "1.7" }}>
                BugSeek is built around the idea that security collaboration
                should be easier to understand. Researchers need clearer program
                views, and companies need a better way to present scope, assets,
                and reward expectations.
              </p>
              <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                Instead of feeling scattered, the experience should help both
                sides move through discovery and reporting with more confidence.
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="border rounded-4 h-100 p-4 bg-white">
                  <h4 className="fw-bold mb-3">For Researchers</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                    Explore programs, understand rewards, review scope, and get
                    a cleaner overview of what is worth testing.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded-4 h-100 p-4 bg-white">
                  <h4 className="fw-bold mb-3">For Companies</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                    Present policies, eligible assets, and program expectations
                    in a way that is easier to understand at a glance.
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="border rounded-4 h-100 p-4 bg-white">
                  <h4 className="fw-bold mb-3">Why It Matters</h4>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                    Bug bounty programs support responsible disclosure and help
                    organizations identify weaknesses early. A well-structured
                    platform can make that process easier to navigate for both
                    sides.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={headingFont}>
            Developers
          </h2>
          <p className="text-muted mb-0">
            A cleaner card layout is kept here so you can add team photos and
            details later.
          </p>
        </div>

        <div className="row g-4">
          {developerCards.map((developer) => (
            <div className="col-md-4" key={developer.name}>
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center fw-semibold mb-4"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "#f3f4f6",
                      color: "#111827",
                      border: "1px dashed #9ca3af",
                    }}
                  >
                    Photo
                  </div>
                  <h5 className="fw-bold mb-1">{developer.name}</h5>
                  <p className="text-dark fw-semibold mb-3">{developer.role}</p>
                  <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                    {developer.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
