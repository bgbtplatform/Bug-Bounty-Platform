import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await axiosClient.get(`/reports/${id}`);
        setReport(res.data?.data || res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  if (loading) return <div className="p-5 text-center fw-bold" style={displayFont}>Loading Report Details...</div>;
  if (!report) return <div className="p-5 text-center text-danger fw-bold" style={displayFont}>Report not found.</div>;

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* HEADER SECTION */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-12">
            <div
              className="rounded-4 p-4 p-lg-5 bg-white shadow-sm"
              style={{ border: "1px solid #ece6da" }}
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-4 mb-4 pb-4 border-bottom">
                <div>
                  <span
                    className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-bold text-uppercase"
                    style={{ background: "#e85d3f", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
                  >
                    VULNERABILITY ADVISORY
                  </span>
                  <h1 className="fw-bold mb-1" style={{ ...displayFont, fontSize: "clamp(2rem, 5vw, 3rem)" }}>{report.title}</h1>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <span 
                    className={`px-4 py-2 rounded-pill fw-bold text-uppercase shadow-sm`}
                    style={{ 
                      background: report.status === 'RESOLVED' ? "#dcfce7" : "#f1f5f9", 
                      color: report.status === 'RESOLVED' ? "#166534" : "#475569",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {report.status}
                  </span>
                </div>
              </div>

              <div className="row g-5">
                <div className="col-lg-8">
                  <h5 className="fw-bold mb-4" style={displayFont}>Detailed Findings</h5>
                  <div 
                    className="p-4 rounded-4 mb-5 shadow-sm" 
                    style={{ background: "#f9fafb", border: "1px solid #f1f5f9", whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.95rem", color: "#1e293b" }}
                  >
                    {report.description}
                  </div>

                  <h5 className="fw-bold mb-4" style={displayFont}>Impact Analysis</h5>
                  <div className="p-4 rounded-4 bg-white border mb-5 shadow-sm" style={{ lineHeight: "1.8", color: "#475569" }}>
                    {report.impact}
                  </div>

                  {report.attachements && (
                    <div className="mt-5">
                      <h5 className="fw-bold mb-4" style={displayFont}>Proof of Concept</h5>
                      <div className="p-3 border rounded-4 bg-white shadow-sm d-inline-block overflow-hidden">
                        {report.attachements.match(/\.(jpeg|jpg|gif|png)$/) ? (
                          <img src={report.attachements} alt="PoC" style={{ maxWidth: "100%", maxHeight: "500px", display: "block" }} />
                        ) : (
                          <div className="p-4 text-center">
                            <a href={report.attachements} target="_blank" rel="noreferrer" className="btn btn-dark px-4 py-2 rounded-pill fw-bold">View Evidence File</a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-lg-4">
                  <div 
                    className="rounded-4 p-4 bg-white border shadow-sm"
                    style={{ top: "2rem" }}
                  >
                    <h6 className="fw-bold text-uppercase text-muted mb-4 pb-2 border-bottom" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Submission Info</h6>
                    
                    <div className="mb-4">
                      <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>Assessed Severity</label>
                      <span className={`fw-bold text-capitalize fs-5 ${report.severity === 'CRITICAL' ? 'text-danger' : 'text-dark'}`}>{report.severity}</span>
                    </div>

                    <div className="mb-4">
                      <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>Reported Date</label>
                      <span className="fw-semibold">{new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="mb-5">
                      <label className="d-block small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: "0.6rem" }}>Last Updated</label>
                      <span className="fw-semibold text-muted">{new Date(report.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="d-grid gap-3 pt-3 border-top">
                      <button 
                        className="btn btn-dark py-3 rounded-3 fw-bold" 
                        style={{ background: "#111827" }}
                        onClick={() => navigate(`/reports/edit/${report._id}`)}
                      >
                        Edit Findings
                      </button>
                      <button 
                        className="btn btn-outline-dark py-3 rounded-3 fw-bold" 
                        onClick={() => navigate("/my-reports")}
                      >
                        Back to My Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReportDetails;
