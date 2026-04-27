import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

const STATUS_OPTIONS = [
  "NEW",
  "TRIAGED",
  "NEED_MORE_INFO",
  "RESOLVED",
  "OUT_OF_SCOPE",
  "REJECTED",
];

const STATUS_COLORS = {
  NEW:            { bg: "#dbeafe", color: "#1e40af", dot: "#3b82f6" },
  TRIAGED:        { bg: "#fef9c3", color: "#92400e", dot: "#eab308" },
  NEED_MORE_INFO: { bg: "#ffedd5", color: "#c2410c", dot: "#f97316" },
  RESOLVED:       { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
  OUT_OF_SCOPE:   { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
  REJECTED:       { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
};

const SEVERITY_COLORS = {
  CRITICAL: { bg: "#fee2e2", color: "#991b1b" },
  HIGH:     { bg: "#ffedd5", color: "#c2410c" },
  MEDIUM:   { bg: "#fef9c3", color: "#92400e" },
  LOW:      { bg: "#dcfce7", color: "#166534" },
  NONE:     { bg: "#f1f5f9", color: "#475569" },
};

function CompanyReportView() {
  const { programId, id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await axiosClient.get(`/reports/${id}`);
        const data = res.data?.data || res.data;
        setReport(data);
        setSelectedStatus(data.status || "NEW");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  async function handleStatusUpdate() {
    if (selectedStatus === report.status) return;
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);
    try {
      const res = await axiosClient.patch(`/reports/${id}/status`, { status: selectedStatus });
      setReport(res.data?.data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError(error.response?.data?.message || "Failed to update status.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border mb-3" style={{ color: "#e85d3f", width: "3rem", height: "3rem" }} />
          <p className="fw-bold text-muted" style={displayFont}>Loading report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="py-5 text-center" style={{ minHeight: "60vh" }}>
        <p className="text-danger fw-bold">Report not found.</p>
        <button className="btn btn-dark rounded-3" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const currentStatus = report.status || "NEW";
  const statusStyle = STATUS_COLORS[currentStatus] || STATUS_COLORS.NEW;
  const severityStyle = SEVERITY_COLORS[report.severity] || SEVERITY_COLORS.NONE;
  const isDirty = selectedStatus !== currentStatus;

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* HEADER CARD */}
        <div
          className="rounded-4 p-4 p-lg-5 bg-white shadow-sm mb-4"
          style={{ border: "1px solid #ece6da" }}
        >
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4 pb-4 border-bottom">
            <div>
              <span
                className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-bold text-uppercase"
                style={{ background: "#e85d3f", color: "#fff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
              >
                Vulnerability Advisory
              </span>
              <h1 className="fw-bold mb-2" style={{ ...displayFont, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                {report.title}
              </h1>
              <div className="d-flex gap-2 flex-wrap align-items-center">
                {/* Current status indicator */}
                <span
                  className="px-3 py-1 rounded-pill fw-bold text-uppercase d-flex align-items-center gap-1"
                  style={{ background: statusStyle.bg, color: statusStyle.color, fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  <span
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      display: "inline-block", background: statusStyle.dot,
                    }}
                  />
                  {currentStatus.replace(/_/g, " ")}
                </span>
                <span
                  className="px-3 py-1 rounded-pill fw-bold text-uppercase"
                  style={{ background: severityStyle.bg, color: severityStyle.color, fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  {report.severity}
                </span>
              </div>
            </div>
          </div>

          <div className="row g-5">
            {/* LEFT: Report content */}
            <div className="col-lg-8">
              <h5 className="fw-bold mb-3" style={displayFont}>Detailed Findings</h5>
              <div
                className="p-4 rounded-4 mb-5 shadow-sm"
                style={{
                  background: "#f9fafb", border: "1px solid #f1f5f9",
                  whiteSpace: "pre-wrap", fontFamily: "monospace",
                  fontSize: "0.93rem", color: "#1e293b", lineHeight: "1.7",
                }}
              >
                {report.description}
              </div>

              <h5 className="fw-bold mb-3" style={displayFont}>Impact Analysis</h5>
              <div
                className="p-4 rounded-4 bg-white border mb-5 shadow-sm"
                style={{ lineHeight: "1.8", color: "#475569" }}
              >
                {report.impact}
              </div>

              {report.attachements && (
                <div className="mt-4">
                  <h5 className="fw-bold mb-3" style={displayFont}>Proof of Concept</h5>
                  <div className="p-3 border rounded-4 bg-white shadow-sm d-inline-block overflow-hidden">
                    {report.attachements.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                      <img
                        src={report.attachements}
                        alt="PoC"
                        style={{ maxWidth: "100%", maxHeight: "500px", display: "block" }}
                      />
                    ) : (
                      <div className="p-4 text-center">
                        <a
                          href={report.attachements}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-dark px-4 py-2 rounded-pill fw-bold"
                        >
                          View Evidence File
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div className="col-lg-4">
              <div
                className="rounded-4 p-4 bg-white border shadow-sm"
                style={{ position: "sticky", top: "2rem" }}
              >
                {/* Submission info */}
                <h6
                  className="fw-bold text-uppercase text-muted mb-4 pb-2 border-bottom"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                >
                  Submission Info
                </h6>

                <div className="d-flex flex-column gap-3 mb-4">
                  <div>
                    <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>
                      Researcher
                    </label>
                    <span className="fw-semibold">
                      {report.hunterId?.username || report.hunterId?.email || "Anonymous"}
                    </span>
                  </div>
                  <div>
                    <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>
                      Severity
                    </label>
                    <span
                      className="fw-bold text-capitalize"
                      style={{ color: severityStyle.color }}
                    >
                      {report.severity}
                    </span>
                  </div>
                  {report.cvss_score > 0 && (
                    <div>
                      <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>
                        CVSS Score
                      </label>
                      <span className="fw-semibold">{report.cvss_score.toFixed(1)} / 10</span>
                    </div>
                  )}
                  <div>
                    <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>
                      Reported Date
                    </label>
                    <span className="fw-semibold">{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>
                      Last Updated
                    </label>
                    <span className="fw-semibold text-muted">{new Date(report.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* STATUS UPDATE SECTION */}
                <div
                  className="rounded-3 p-3 mb-3"
                  style={{ background: "#f8f5ef", border: "1px solid #ece6da" }}
                >
                  <label
                    className="d-block fw-bold text-uppercase mb-2"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.05em", color: "#374151" }}
                  >
                    Update Status
                  </label>
                  <select
                    className="form-select form-select-sm rounded-3"
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setSaveSuccess(false);
                      setSaveError(null);
                    }}
                    style={{ fontWeight: "600", fontSize: "0.85rem", border: "1px solid #d1d5db" }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>

                {saveError && (
                  <div
                    className="rounded-3 p-2 mb-2 small text-center fw-bold"
                    style={{ background: "#fee2e2", color: "#991b1b", fontSize: "0.75rem" }}
                  >
                    {saveError}
                  </div>
                )}
                {saveSuccess && (
                  <div
                    className="rounded-3 p-2 mb-2 small text-center fw-bold"
                    style={{ background: "#dcfce7", color: "#166534", fontSize: "0.75rem" }}
                  >
                    ✓ Status updated successfully!
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button
                    className="btn py-2 rounded-3 fw-bold"
                    style={{
                      background: isDirty ? "#111827" : "#e5e7eb",
                      color: isDirty ? "#fff" : "#9ca3af",
                      fontSize: "0.85rem",
                      cursor: isDirty ? "pointer" : "not-allowed",
                      transition: "all 0.2s",
                    }}
                    onClick={handleStatusUpdate}
                    disabled={!isDirty || saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Status"
                    )}
                  </button>
                  <button
                    className="btn btn-outline-dark py-2 rounded-3 fw-bold"
                    style={{ fontSize: "0.85rem" }}
                    onClick={() => navigate(`/company/program/${programId}/reports`)}
                  >
                    ← All Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CompanyReportView;
