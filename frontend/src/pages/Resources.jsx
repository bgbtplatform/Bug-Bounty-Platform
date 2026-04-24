import { useState } from "react";
import { Link } from "react-router-dom";

function Resources() {
  const [activeTool, setActiveTool] = useState(null);

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  const sectionTitleFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.02em",
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
    {
      title: "Recon & Enumeration",
      text: "Learn to map subdomains, endpoints, technologies, exposed files, and application attack surface before testing deeper.",
    },
    {
      title: "Web Vulnerabilities",
      text: "Focus on XSS, SQL injection, CSRF, SSRF, file upload issues, access control bugs, and other common web flaws.",
    },
    {
      title: "API Security Testing",
      text: "Understand authentication, token handling, broken object level authorization, rate limiting, and parameter tampering in APIs.",
    },
    {
      title: "Authentication Flaws",
      text: "Practice login bypasses, session weaknesses, password reset issues, MFA gaps, and token validation problems.",
    },
    {
      title: "Business Logic Issues",
      text: "Study how real vulnerabilities appear in workflows like payments, coupons, referrals, onboarding, and privilege boundaries.",
    },
    {
      title: "Report Quality",
      text: "Improve how you write titles, explain impact, include evidence, and help triagers reproduce your findings quickly.",
    },
    {
      title: "HTTP Fundamentals",
      text: "Build confidence with request methods, headers, cookies, caching behavior, status codes, and browser-server interaction.",
    },
    {
      title: "Severity & Risk",
      text: "Understand how severity is judged using exploitability, impact, business risk, and known vulnerability references.",
    },
    {
      title: "Safe Testing Practices",
      text: "Learn how to stay within scope, avoid disruption, and test responsibly while following disclosure rules.",
    },
  ];

  const referenceSites = [
    {
      name: "PortSwigger Web Security Academy",
      url: "https://portswigger.net/web-security",
      text: "Free web security training with interactive labs covering topics like XSS, SQL injection, SSRF, access control, and API testing.",
    },
    {
      name: "Hack The Box",
      url: "https://www.hackthebox.com/",
      text: "Hands-on cybersecurity labs, academy content, and practice environments for learners who want realistic technical exercises.",
    },
    {
      name: "TryHackMe",
      url: "https://tryhackme.com/",
      text: "Beginner-friendly guided rooms and learning paths that help new researchers build practical offensive security skills.",
    },
    {
      name: "OWASP Top Ten",
      url: "https://owasp.org/www-project-top-ten/",
      text: "A widely used starting point for understanding common web application security risks and how they are categorized.",
    },
    {
      name: "OWASP Cheat Sheet Series",
      url: "https://cheatsheetseries.owasp.org/",
      text: "Practical security guidance and implementation notes useful for both developers and security testers.",
    },
    {
      name: "MDN HTTP Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
      text: "Clear reference material for HTTP methods, headers, caching, cookies, and browser behavior.",
    },
    {
      name: "NIST National Vulnerability Database",
      url: "https://nvd.nist.gov/",
      text: "Useful for reviewing CVEs, severity information, and vulnerability metadata while learning impact and risk context.",
    },
  ];

  const tools = [
    {
      name: "Burp Suite",
      text: "Intercept and inspect web traffic.",
      usage: "Use Proxy, Repeater, and Intruder to inspect requests, replay inputs, and test app behavior manually.",
      docsUrl: "https://portswigger.net/burp/documentation",
    },
    {
      name: "Postman",
      text: "Test and debug API requests.",
      usage: "Build collections, send authenticated requests, and verify API responses, headers, and tokens.",
      docsUrl: "https://learning.postman.com/docs/getting-started/introduction/overview/",
    },
    {
      name: "Nmap",
      text: "Scan hosts and open services.",
      usage: "Use it to identify live hosts, open ports, services, and version details where testing is allowed.",
      docsUrl: "https://nmap.org/docs.html",
    },
    {
      name: "ffuf",
      text: "Fuzz paths, params, and files.",
      usage: "Use wordlists against directories, parameters, or virtual hosts to discover hidden app content.",
      docsUrl: "https://github.com/ffuf/ffuf",
    },
    {
      name: "Wireshark",
      text: "Analyze packets and traffic flows.",
      usage: "Inspect network traffic in detail when you need protocol-level visibility during debugging.",
      docsUrl: "https://www.wireshark.org/docs/",
    },
    {
      name: "sqlmap",
      text: "Test and verify SQL injection.",
      usage: "Use it carefully to confirm injectable parameters and understand backend database behavior.",
      docsUrl: "https://sqlmap.org/",
    },
    {
      name: "OWASP ZAP",
      text: "Scan and test web apps.",
      usage: "Use intercepting proxy features and built-in scanners to inspect and test web applications.",
      docsUrl: "https://www.zaproxy.org/docs/",
    },
    {
      name: "Amass",
      text: "Map domains and subdomains.",
      usage: "Run enumeration to discover related assets and expand recon within an allowed scope.",
      docsUrl: "https://owasp-amass.github.io/docs/",
    },
    {
      name: "Subfinder",
      text: "Find passive subdomains quickly.",
      usage: "Gather passive subdomain results fast before validating which targets are live and relevant.",
      docsUrl: "https://docs.projectdiscovery.io/opensource/subfinder/overview",
    },
  ];

  const roadmapSteps = [
    {
      step: "Step 1",
      title: "Understand The Program",
      text: "Read the scope, reward details, exclusions, and program rules before testing anything.",
    },
    {
      step: "Step 2",
      title: "Map The Target",
      text: "Identify domains, subdomains, endpoints, and product flows that are allowed for testing.",
    },
    {
      step: "Step 3",
      title: "Test Carefully",
      text: "Focus on common vulnerability classes and verify each finding safely without harming users or systems.",
    },
    {
      step: "Step 4",
      title: "Submit A Clear Report",
      text: "Provide reproduction steps, impact, screenshots or proof, and a concise explanation of the issue.",
    },
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
    {
      question: "What should I check before testing a program?",
      answer:
        "Start with the scope, reward details, exclusions, and program rules so your testing stays within the allowed boundaries.",
    },
    {
      question: "What makes a report more likely to be accepted?",
      answer:
        "A report is stronger when it includes exact reproduction steps, a clear impact statement, and enough evidence to validate the issue quickly.",
    },
    {
      question: "Why is scope so important in bug bounty?",
      answer:
        "Scope defines what assets are allowed, what behavior is prohibited, and which findings are eligible for triage or rewards.",
    },
  ];

  return (
    <div className="py-5">
      <section className="container mb-5">
        <div
          className="rounded-4 p-5 text-white"
          style={{
            background:
              "linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)",
          }}
        >
          <span className="badge bg-light text-dark mb-3 px-3 py-2">
            BugSeek Resources
          </span>
          <h1 className="display-5 fw-bold mb-3" style={displayFont}>
            Learn bug bounty the practical way
          </h1>
          <p className="fs-5 mb-4" style={{ maxWidth: "760px", color: "#e5e7eb" }}>
            This page brings together the basics of responsible disclosure,
            testing guidance, reporting tips, and simple learning paths for
            researchers using the platform.
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
      </section>

      <section className="container mb-5">
        <div className="mb-4">
          <h2 className="fw-bold" style={sectionTitleFont}>Featured Guides</h2>
          <p className="text-muted mb-0">
            Start with the core guides every bug bounty researcher should know.
          </p>
        </div>

        <div className="row g-4">
          {featuredGuides.map((guide) => (
            <div className="col-md-4" key={guide.title}>
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">{guide.title}</h5>
                  <p className="text-muted mb-0">{guide.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="mb-4">
          <h2 className="fw-bold" style={sectionTitleFont}>Learning Categories</h2>
          <p className="text-muted mb-0">
            Focus areas to help you build confidence across common testing
            workflows.
          </p>
        </div>

        <div className="row g-4">
          {learningCategories.map((category) => (
            <div className="col-md-4 col-sm-6" key={category.title}>
              <div className="border rounded-4 p-4 h-100 bg-white">
                <h5 className="fw-bold mb-2">{category.title}</h5>
                <p className="text-muted mb-0">{category.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="mb-4">
          <h2 className="fw-bold" style={sectionTitleFont}>Reference Websites</h2>
          <p className="text-muted mb-0">
            Trusted places to learn, practice, and deepen your bug bounty
            workflow.
          </p>
        </div>

        <div className="row g-4">
          {referenceSites.map((site) => (
            <div className="col-md-6 col-lg-4" key={site.name}>
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="fw-bold mb-3">{site.name}</h5>
                  <p className="text-muted mb-4">{site.text}</p>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-dark mt-auto"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="mb-4">
          <h2 className="fw-bold" style={sectionTitleFont}>Tools To Know</h2>
          <p className="text-muted mb-0">
            Common tools that help researchers inspect applications, test APIs,
            and perform reconnaissance more efficiently.
          </p>
        </div>

        <div className="row g-4">
          {tools.map((tool) => (
            <div className="col-md-6 col-lg-4" key={tool.name}>
              <div
                className="border rounded-4 h-100 p-4 bg-white"
                style={{
                  transition: "all 0.25s ease",
                  boxShadow:
                    activeTool === tool.name
                      ? "0 1rem 2rem rgba(17, 24, 39, 0.12)"
                      : "none",
                  transform:
                    activeTool === tool.name ? "translateY(-4px)" : "none",
                }}
                onMouseEnter={() => setActiveTool(tool.name)}
                onMouseLeave={() => setActiveTool(null)}
              >
                <h5 className="fw-bold mb-3">{tool.name}</h5>
                <p className="text-muted mb-0">{tool.text}</p>
                {activeTool === tool.name && (
                  <div className="mt-3 pt-3 border-top">
                    <p className="text-dark small mb-3">{tool.usage}</p>
                    <a
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-dark"
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
        <div className="mb-4">
          <h2 className="fw-bold" style={sectionTitleFont}>Beginner Roadmap</h2>
          <p className="text-muted mb-0">
            A simple step-by-step path for researchers getting started.
          </p>
        </div>

        <div className="row g-4">
          {roadmapSteps.map((item) => (
            <div className="col-md-6" key={item.title}>
              <div className="border rounded-4 h-100 p-4 bg-white">
                <span className="badge text-bg-dark mb-3">{item.step}</span>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="border rounded-4 h-100 p-4 bg-white">
              <h2 className="fw-bold mb-3">Report Template Checklist</h2>
              <p className="text-muted">
                A good report helps the triage team understand the issue quickly
                and verify it with less back-and-forth.
              </p>
              <ul className="mb-0">
                {templateItems.map((item) => (
                  <li key={item} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="rounded-4 h-100 p-4 text-white"
              style={{ background: "#111827" }}
            >
              <h2 className="fw-bold mb-3">Using BugSeek Effectively</h2>
              <p style={{ color: "#d1d5db" }}>
                On this platform, start by exploring active programs, reviewing
                company details, understanding rewards, and checking whether an
                asset is appropriate before submitting any finding.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <Link to="/programs" className="btn btn-light text-dark">
                  View Programs
                </Link>
                <Link to="/about" className="btn btn-outline-light">
                  About BugSeek
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-4">
        <div className="mb-4">
          <h2 className="fw-bold">Frequently Asked Questions</h2>
          <p className="text-muted mb-0">
            Quick guidance for common bug bounty questions.
          </p>
        </div>

        <div className="row g-4">
          {faqItems.map((item) => (
            <div className="col-md-4" key={item.question}>
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">{item.question}</h5>
                  <p className="text-muted mb-0">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Resources;
