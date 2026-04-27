import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

const STATUS_COLORS = {
  NEW:            { bg: "#dbeafe", color: "#1e40af" },
  TRIAGED:        { bg: "#fef9c3", color: "#92400e" },
  NEED_MORE_INFO: { bg: "#ffedd5", color: "#c2410c" },
  RESOLVED:       { bg: "#dcfce7", color: "#166534" },
  OUT_OF_SCOPE:   { bg: "#f1f5f9", color: "#475569" },
  REJECTED:       { bg: "#fee2e2", color: "#991b1b" },
};

const SEVERITY_COLORS = {
  CRITICAL: { bg: "#fee2e2", color: "#991b1b" },
  HIGH:     { bg: "#ffedd5", color: "#c2410c" },
  MEDIUM:   { bg: "#fef9c3", color: "#92400e" },
  LOW:      { bg: "#dcfce7", color: "#166534" },
  NONE:     { bg: "#f1f5f9", color: "#475569" },
};

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.NEW;
  return (
    <span
      className="px-2 py-1 rounded-pill fw-bold text-uppercase"
      style={{ background: s.bg, color: s.color, fontSize: "0.6rem", letterSpacing: "0.06em" }}
    >
      {(status || "NEW").replace(/_/g, " ")}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const s = SEVERITY_COLORS[severity] || SEVERITY_COLORS.NONE;
  return (
    <span
      className="px-2 py-1 rounded-pill fw-bold text-uppercase"
      style={{ background: s.bg, color: s.color, fontSize: "0.6rem", letterSpacing: "0.06em" }}
    >
      {severity || "NONE"}
    </span>
  );
}

function ProgramReports() {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [reportsRes, programRes] = await Promise.all([
          axiosClient.get(`/reports/program/${programId}`),
          axiosClient.get(`/program/${programId}`),
        ]);
        setReports(reportsRes.data?.data || []);
        setProgram(programRes.data?.data || null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load reports. Make sure you own this program.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [programId]);

  const filtered = filterStatus
    ? reports.filter((r) => r.status === filterStatus)
    : reports;

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border mb-3" style={{ color: "#e85d3f", width: "3rem", height: "3rem" }} />
          <p className="fw-bold text-muted" style={displayFont}>Loading program reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="rounded-4 p-5 bg-white border text-center shadow-sm">
            <div className="mb-3" style={{ fontSize: "3rem" }}>🚫</div>
            <h4 className="fw-bold mb-2" style={displayFont}>Access Denied</h4>
            <p className="text-muted mb-4">{error}</p>
            <button
              className="btn btn-dark px-4 py-2 rounded-3 fw-bold"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        
        <div className="rounded-4 p-4 p-lg-5 bg-white border shadow-sm mb-5">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <div>
              <span
                className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-bold text-uppercase"
                style={{ background: "#111827", color: "#fff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
              >
                Company Dashboard
              </span>
              <h1 className="fw-bold mb-1" style={{ ...displayFont, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                {program?.title || "Program"} — Incoming Reports
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                Review vulnerability disclosures submitted by researchers and update their status.
              </p>
            </div>
            <div className="text-end">
              <div
                className="rounded-3 px-4 py-3 d-inline-block"
                style={{ background: "#f8f5ef", border: "1px solid #ece6da" }}
              >
                <div className="fw-bold fs-2" style={{ color: "#e85d3f" }}>{reports.length}</div>
                <div className="small text-muted fw-bold text-uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                  Total Reports
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
          <span className="small fw-bold text-muted text-uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>
            Filter by Status:
          </span>
          {["", "NEW", "TRIAGED", "NEED_MORE_INFO", "RESOLVED", "OUT_OF_SCOPE", "REJECTED"].map((s) => {
            const active = filterStatus === s;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="btn btn-sm rounded-pill fw-bold"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.04em",
                  background: active ? "#111827" : "#fff",
                  color: active ? "#fff" : "#475569",
                  border: "1px solid #ece6da",
                  padding: "4px 14px",
                }}
              >
                {s === "" ? "All" : s.replace(/_/g, " ")}
              </button>
            );
          })}
        </div>

        
        {filtered.length === 0 ? (
          <div className="rounded-4 p-5 bg-white border text-center shadow-sm">
            <div className="mb-3" style={{ fontSize: "2.5rem" }}>📭</div>
            <h5 className="fw-bold mb-2" style={displayFont}>No reports found</h5>
            <p className="text-muted mb-0">
              {filterStatus ? `No reports with status "${filterStatus.replace(/_/g, " ")}" yet.` : "No vulnerability reports have been submitted for this program yet."}
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filtered.map((r) => (
              <div
                key={r._id}
                className="rounded-4 p-4 bg-white shadow-sm"
                style={{ border: "1px solid #ece6da", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
              >
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                  
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                      <SeverityBadge severity={r.severity} />
                      <StatusBadge status={r.status} />
                    </div>
                    <h5 className="fw-bold mb-1" style={displayFont}>{r.title}</h5>
                    <p
                      className="text-muted mb-2 small"
                      style={{ maxWidth: "600px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {r.description}
                    </p>
                    <div className="d-flex gap-3 flex-wrap small text-muted">
                      <span>
                        🔬 By{" "}
                        <span className="fw-semibold text-dark">
                          {r.hunterId?.username || r.hunterId?.email || "Anonymous"}
                        </span>
                      </span>
                      <span>📅 {new Date(r.createdAt).toLocaleDateString()}</span>
                      {r.cvss_score > 0 && (
                        <span>⚡ CVSS {r.cvss_score.toFixed(1)}</span>
                      )}
                    </div>
                  </div>

                  
                  <div className="d-flex flex-column gap-2 align-items-end">
                    <button
                      className="btn btn-dark px-4 py-2 rounded-3 fw-bold"
                      style={{ background: "#111827", fontSize: "0.85rem", minWidth: "150px" }}
                      onClick={() =>
                        navigate(`/company/program/${programId}/reports/${r._id}`)
                      }
                    >
                      Review Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        
        <div className="mt-5 text-center">
          <button
            className="btn btn-outline-dark px-5 py-3 rounded-3 fw-bold"
            onClick={() => navigate(-1)}
          >
            ← Back to Program
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProgramReports;
