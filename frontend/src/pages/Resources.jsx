import { useState } from "react";
import { Link } from "react-router-dom";

function Resources() {
  const [activeTool, setActiveTool] = useState(null);

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  const featuredGuides = [
    {
      title: "Bug Bounty Basics",
      text: "Learn how bug bounty programs work, what responsible disclosure means, and how to begin as a security researcher.",
    },
    {
      title: "How To Read Scope",
      text: "Understand program rules, in-scope assets, exclusions, reward ranges, and safe testing boundaries before you start.",
    },
    {
      title: "Writing Better Reports",
      text: "See what makes a strong report: clear steps, proof of impact, reproducibility, and concise technical evidence.",
    },
  ];

  const learningCategories = [
    { title: "Recon & Enumeration", text: "Learn to map subdomains, endpoints, technologies, exposed files, and the attack surface before testing deeper." },
    { title: "Web Vulnerabilities", text: "Focus on XSS, SQL injection, CSRF, SSRF, file upload issues, access control bugs, and other common web flaws." },
    { title: "API Security Testing", text: "Understand authentication, token handling, broken object level authorization, rate limiting, and parameter tampering." },
    { title: "Authentication Flaws", text: "Practice login bypasses, session weaknesses, password reset issues, MFA gaps, and token validation problems." },
    { title: "Business Logic Issues", text: "Study how vulnerabilities appear in workflows like payments, referrals, onboarding, and privilege boundaries." },
    { title: "Report Quality", text: "Improve how you write titles, explain impact, include evidence, and help triagers reproduce your findings quickly." },
    { title: "HTTP Fundamentals", text: "Build confidence with methods, headers, cookies, caching behavior, status codes, and browser-server interaction." },
    { title: "Severity & Risk", text: "Understand how severity is judged using exploitability, impact, business risk, and known references." },
    { title: "Safe Testing Practices", text: "Learn how to stay within scope, avoid disruption, and test responsibly while following disclosure rules." },
  ];

  const referenceSites = [
    { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", text: "Free web security training with interactive labs and strong vulnerability coverage." },
    { name: "Hack The Box", url: "https://www.hackthebox.com/", text: "Hands-on labs and academy content for practical offensive security learning." },
    { name: "TryHackMe", url: "https://tryhackme.com/", text: "Beginner-friendly guided rooms and paths for building practical skills." },
    { name: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/", text: "A strong starting point for understanding common web application security risks." },
    { name: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/", text: "Practical reference material useful for testers and developers alike." },
    { name: "MDN HTTP Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", text: "Clear reference material for requests, headers, cookies, and browser behavior." },
    { name: "NIST National Vulnerability Database", url: "https://nvd.nist.gov/", text: "Useful for learning severity context, CVEs, and vulnerability metadata." },
  ];

  const tools = [
    { name: "Burp Suite", text: "Intercept and inspect web traffic.", usage: "Use Proxy, Repeater, and Intruder to inspect requests, replay inputs, and test app behavior manually.", docsUrl: "https://portswigger.net/burp/documentation" },
    { name: "Postman", text: "Test and debug API requests.", usage: "Build collections, send authenticated requests, and verify API responses, headers, and tokens.", docsUrl: "https://learning.postman.com/docs/getting-started/introduction/overview/" },
    { name: "Nmap", text: "Scan hosts and open services.", usage: "Use it to identify live hosts, open ports, services, and version details where testing is allowed.", docsUrl: "https://nmap.org/docs.html" },
    { name: "ffuf", text: "Fuzz paths, params, and files.", usage: "Use wordlists against directories, parameters, or virtual hosts to discover hidden app content.", docsUrl: "https://github.com/ffuf/ffuf" },
    { name: "Wireshark", text: "Analyze packets and traffic flows.", usage: "Inspect network traffic in detail when you need protocol-level visibility during debugging.", docsUrl: "https://www.wireshark.org/docs/" },
    { name: "sqlmap", text: "Test and verify SQL injection.", usage: "Use it carefully to confirm injectable parameters and understand backend database behavior.", docsUrl: "https://sqlmap.org/" },
    { name: "OWASP ZAP", text: "Scan and test web apps.", usage: "Use intercepting proxy features and built-in scanners to inspect and test web applications.", docsUrl: "https://www.zaproxy.org/docs/" },
    { name: "Amass", text: "Map domains and subdomains.", usage: "Run enumeration to discover related assets and expand recon within an allowed scope.", docsUrl: "https://owasp-amass.github.io/docs/" },
    { name: "Subfinder", text: "Find passive subdomains quickly.", usage: "Gather passive subdomain results fast before validating which targets are live and relevant.", docsUrl: "https://docs.projectdiscovery.io/opensource/subfinder/overview" },
  ];

  const roadmapSteps = [
    { step: "Step 1", title: "Understand The Program", text: "Read the scope, reward details, exclusions, and program rules before testing anything." },
    { step: "Step 2", title: "Map The Target", text: "Identify domains, subdomains, endpoints, and product flows that are allowed for testing." },
    { step: "Step 3", title: "Test Carefully", text: "Focus on common vulnerability classes and verify each finding safely without harming users or systems." },
    { step: "Step 4", title: "Submit A Clear Report", text: "Provide reproduction steps, impact, screenshots or proof, and a concise explanation of the issue." },
  ];

  const templateItems = [
    "Title with clear vulnerability summary",
    "Affected asset or endpoint",
    "Steps to reproduce",
    "Expected result versus actual result",
    "Proof of concept or screenshots",
    "Security impact and severity",
  ];

  const faqItems = [
    { question: "What should I check before testing a program?", answer: "Start with the scope, reward details, exclusions, and program rules so your testing stays within the allowed boundaries." },
    { question: "What makes a report more likely to be accepted?", answer: "A report is stronger when it includes exact reproduction steps, a clear impact statement, and enough evidence to validate the issue quickly." },
    { question: "Why is scope so important in bug bounty?", answer: "Scope defines what assets are allowed, what behavior is prohibited, and which findings are eligible for triage or rewards." },
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
                BUGSEEK RESOURCES
              </span>
              <h1
                className="fw-bold mb-4"
                style={{
                  ...displayFont,
                  fontSize: "clamp(2.7rem, 5vw, 4.8rem)",
                  lineHeight: "1.02",
                  color: "#111827",
                  maxWidth: "760px",
                }}
              >
                Learn bug bounty the practical way.
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
                This page brings together the basics of responsible disclosure,
                testing guidance, reporting tips, and simple learning paths for
                researchers using the platform.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="row g-4 h-100">
              <div className="col-12">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{ background: "#111827", color: "#ffffff" }}
                >
                  <small
                    className="d-block mb-3"
                    style={{ color: "#cbd5e1", letterSpacing: "0.08em" }}
                  >
                    QUICK START
                  </small>
                  <h3 className="fw-bold mb-3" style={displayFont}>
                    Read, practice, and build better reports.
                  </h3>
                  <p className="mb-4" style={{ color: "#d1d5db", lineHeight: "1.8" }}>
                    Start with program scope, sharpen your testing workflow, and
                    use the platform more effectively.
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Link to="/programs" className="btn btn-light text-dark fw-semibold">
                      Explore Programs
                    </Link>
                    <Link to="/company" className="btn btn-outline-light">
                      Browse Companies
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{ background: "#e85d3f", color: "#ffffff" }}
                >
                  <small
                    className="d-block mb-2"
                    style={{ color: "#ffe3dc", letterSpacing: "0.08em" }}
                  >
                    BUILT FOR LEARNING
                  </small>
                  <div className="fw-semibold">
                    Guides, references, tools, and beginner-friendly structure.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="row align-items-end g-4 mb-4">
          <div className="col-lg-7">
            <small className="d-block mb-3" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>
              FEATURED GUIDES
            </small>
            <h2 className="fw-bold mb-0" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Strong starting points for researchers learning the workflow.
            </h2>
          </div>
        </div>

        <div className="row g-4">
          {featuredGuides.map((guide, index) => (
            <div className="col-md-4" key={guide.title}>
              <div
                className="h-100 rounded-4 p-4"
                style={{
                  background: index === 1 ? "#f2eadf" : "#ffffff",
                  border: index === 1 ? "1px solid #e5dccf" : "1px solid #ece6da",
                }}
              >
                <h5 className="fw-bold mb-3">{guide.title}</h5>
                <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                  {guide.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="row align-items-end g-4 mb-4">
          <div className="col-lg-7">
            <small className="d-block mb-3" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>
              LEARNING CATEGORIES
            </small>
            <h2 className="fw-bold mb-0" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Build confidence across the core parts of bug bounty testing.
            </h2>
          </div>
        </div>

        <div className="row g-4">
          {learningCategories.map((category) => (
            <div className="col-md-4 col-sm-6" key={category.title}>
              <div
                className="rounded-4 p-4 h-100"
                style={{
                  background: "#ffffff",
                  border: "1px solid #ece6da",
                }}
              >
                <h5 className="fw-bold mb-2">{category.title}</h5>
                <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                  {category.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="row align-items-end g-4 mb-4">
          <div className="col-lg-7">
            <small className="d-block mb-3" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>
              REFERENCE WEBSITES
            </small>
            <h2 className="fw-bold mb-0" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Trusted places to learn, practice, and deepen your workflow.
            </h2>
          </div>
        </div>

        <div className="row g-4">
          {referenceSites.map((site) => (
            <div className="col-md-6 col-lg-4" key={site.name}>
              <div
                className="h-100 rounded-4 p-4 d-flex flex-column"
                style={{
                  background: "#ffffff",
                  border: "1px solid #ece6da",
                }}
              >
                <h5 className="fw-bold mb-3">{site.name}</h5>
                <p className="text-muted mb-4" style={{ lineHeight: "1.8" }}>
                  {site.text}
                </p>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn mt-auto"
                  style={{
                    border: "1px solid #111827",
                    color: "#111827",
                    fontWeight: "600",
                  }}
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="row align-items-end g-4 mb-4">
          <div className="col-lg-7">
            <small className="d-block mb-3" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>
              TOOLS TO KNOW
            </small>
            <h2 className="fw-bold mb-0" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Popular tools researchers reach for first.
            </h2>
          </div>
        </div>

        <div className="row g-4">
          {tools.map((tool, index) => (
            <div className="col-md-6 col-lg-4" key={tool.name}>
              <div
                className="rounded-4 h-100 p-4"
                style={{
                  background: index === 2 ? "#f2eadf" : "#ffffff",
                  border: index === 2 ? "1px solid #e5dccf" : "1px solid #ece6da",
                  transition: "all 0.25s ease",
                  boxShadow:
                    activeTool === tool.name
                      ? "0 1rem 2rem rgba(17, 24, 39, 0.12)"
                      : "none",
                  transform: activeTool === tool.name ? "translateY(-4px)" : "none",
                }}
                onMouseEnter={() => setActiveTool(tool.name)}
                onMouseLeave={() => setActiveTool(null)}
              >
                <h5 className="fw-bold mb-3">{tool.name}</h5>
                <p className="text-muted mb-0">{tool.text}</p>
                {activeTool === tool.name && (
                  <div className="mt-3 pt-3 border-top">
                    <p className="text-dark small mb-3" style={{ lineHeight: "1.8" }}>
                      {tool.usage}
                    </p>
                    <a
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm"
                      style={{
                        background: "#111827",
                        color: "#ffffff",
                        fontWeight: "600",
                      }}
                    >
                      Official Documentation
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <div
              className="rounded-4 p-4 p-lg-5 h-100"
              style={{ background: "#ffffff", border: "1px solid #ece6da" }}
            >
              <small className="d-block mb-3" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>
                BEGINNER ROADMAP
              </small>
              <h2 className="fw-bold mb-4" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                A simple step-by-step path for getting started.
              </h2>
              <div className="row g-4">
                {roadmapSteps.map((item) => (
                  <div className="col-md-6" key={item.title}>
                    <div
                      className="rounded-4 p-4 h-100"
                      style={{ background: "#f8f5ef", border: "1px solid #ece6da" }}
                    >
                      <span
                        className="d-inline-block px-3 py-2 rounded-pill mb-3"
                        style={{ background: "#111827", color: "#ffffff", fontSize: "0.84rem" }}
                      >
                        {item.step}
                      </span>
                      <h5 className="fw-bold">{item.title}</h5>
                      <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="row g-4 h-100">
              <div className="col-12">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{ background: "#111827", color: "#ffffff" }}
                >
                  <h2 className="fw-bold mb-3" style={displayFont}>
                    Using BugSeek Effectively
                  </h2>
                  <p style={{ color: "#d1d5db", lineHeight: "1.8" }}>
                    Start by exploring active programs, reviewing company
                    details, understanding rewards, and checking whether an
                    asset is appropriate before submitting any finding.
                  </p>
                  <div className="d-flex gap-3 flex-wrap mt-4">
                    <Link to="/programs" className="btn btn-light text-dark fw-semibold">
                      View Programs
                    </Link>
                    <Link to="/about" className="btn btn-outline-light">
                      About BugSeek
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{ background: "#ffffff", border: "1px solid #ece6da" }}
                >
                  <h3 className="fw-bold mb-3" style={displayFont}>
                    Report Template Checklist
                  </h3>
                  <ul className="mb-0 ps-3">
                    {templateItems.map((item) => (
                      <li key={item} className="mb-2 text-muted" style={{ lineHeight: "1.7" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-2">
        <div className="row align-items-end g-4 mb-4">
          <div className="col-lg-7">
            <small className="d-block mb-3" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>
              FAQ
            </small>
            <h2 className="fw-bold mb-0" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Quick guidance for common bug bounty questions.
            </h2>
          </div>
        </div>

        <div className="row g-4">
          {faqItems.map((item, index) => (
            <div className="col-md-4" key={item.question}>
              <div
                className="h-100 rounded-4 p-4"
                style={{
                  background: index === 1 ? "#e85d3f" : "#ffffff",
                  border: index === 1 ? "none" : "1px solid #ece6da",
                  color: index === 1 ? "#ffffff" : "#111827",
                }}
              >
                <h5 className="fw-bold mb-3">{item.question}</h5>
                <p
                  className="mb-0"
                  style={{
                    color: index === 1 ? "#fff1ed" : "#6b7280",
                    lineHeight: "1.8",
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Resources;
