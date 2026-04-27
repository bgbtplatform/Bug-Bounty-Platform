import { useEffect, useState } from "react";
import axiosClient from "../apiClient";
import { useNavigate } from "react-router-dom";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  async function fetchMyReports() {
    try {
      const res = await axiosClient.get("/reports/my");
      setReports(res.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) return;
    try {
      await axiosClient.delete(`/reports/${id}`);
      fetchMyReports();
    } catch (error) {
      alert("Failed to delete report");
    }
  }

  useEffect(() => {
    fetchMyReports();
  }, []);

  if (loading) return <div className="p-5 text-center fw-bold" style={displayFont}>Loading your submissions...</div>;

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">
        
        <div className="row g-4 align-items-center mb-5 text-center text-lg-start">
          <div className="col-lg-8 mx-auto">
            <div className="rounded-4 p-4 p-lg-5 bg-white border shadow-sm">
              <span
                className="d-inline-block px-3 py-1 rounded-pill mb-4 fw-bold text-uppercase"
                style={{ background: "#111827", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
              >
                RESEARCHER DASHBOARD
              </span>
              <h1 className="fw-bold mb-3" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>My Submissions</h1>
              <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
                Track the status of your reported vulnerabilities and manage your active disclosures.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-3 justify-content-center">
          {reports.length === 0 ? (
            <div className="col-lg-8">
              <div className="text-center py-5 rounded-4 bg-white border" style={{ borderStyle: "dashed !important" }}>
                <p className="text-muted mb-0">You haven't submitted any reports yet. Find a program to start hunting!</p>
              </div>
            </div>
          ) : (
            reports.map((r) => (
              <div key={r._id} className="col-lg-8">
                <div 
                  className="rounded-4 p-4 d-flex flex-wrap justify-content-between align-items-center bg-white shadow-sm transition-all"
                  style={{ border: "1px solid #ece6da" }}
                >
                  <div className="d-flex align-items-center gap-4">
                    <div 
                      className="rounded-3 p-3 d-flex align-items-center justify-content-center fw-bold"
                      style={{ 
                        background: r.severity === 'CRITICAL' ? "#fee2e2" : "#f8f5ef", 
                        color: r.severity === 'CRITICAL' ? "#991b1b" : "#111827", 
                        width: "60px", 
                        height: "60px", 
                        border: "1px solid #ece6da" 
                      }}
                    >
                      {r.severity?.[0] || 'N'}
                    </div>
                    <div>
                      <p className="fw-bold mb-1 fs-5" style={displayFont}>{r.title}</p>
                      <div className="d-flex gap-2 flex-wrap">
                        <span 
                          className="px-2 py-1 rounded-pill small fw-bold text-uppercase"
                          style={{ 
                            background: r.status === 'RESOLVED' ? "#dcfce7" : "#f1f5f9", 
                            color: r.status === 'RESOLVED' ? "#166534" : "#475569",
                            fontSize: "0.6rem",
                            letterSpacing: "0.05em"
                          }}
                        >
                          {r.status}
                        </span>
                        <span className="text-muted small">Submitted: {new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-dark px-3 py-2 rounded-pill fw-bold small"
                      style={{ background: "#111827", fontSize: "0.8rem" }}
                      onClick={() => navigate(`/reports/${r._id}`)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-outline-dark px-3 py-2 rounded-pill fw-bold small"
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => navigate(`/reports/edit/${r._id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-outline-danger px-3 py-2 rounded-pill fw-bold small"
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => handleDelete(r._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default MyReports;
