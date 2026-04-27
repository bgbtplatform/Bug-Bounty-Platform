import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function CompanyPrograms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  async function getPrograms() {
    try {
      let res = await axiosClient.get(`/program/company/${id}`);
      const data = res.data?.data || res.data || [];
      setPrograms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setPrograms([]);
    }
  }

  useEffect(() => {
    getPrograms();
  }, [id]);

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">
        
        <div className="row g-4 align-items-center mb-5 text-center text-lg-start">
          <div className="col-lg-8 mx-auto">
            <div
              className="rounded-4 p-4 p-lg-5 bg-white border shadow-sm"
            >
              <span
                className="d-inline-block px-3 py-1 rounded-pill mb-4 fw-bold text-uppercase"
                style={{ background: "#e85d3f", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
              >
                ACTIVE PROGRAMS
              </span>
              <h1 className="fw-bold mb-3" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Organization Programs</h1>
              <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
                Browse the complete list of bug bounty initiatives currently offered by this organization.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-3 justify-content-center">
          {programs.length > 0 ? (
            programs.map((p) => (
              <div key={p._id} className="col-lg-8">
                <div 
                  className="rounded-4 p-4 d-flex flex-wrap justify-content-between align-items-center bg-white shadow-sm"
                  style={{ border: "1px solid #ece6da" }}
                >
                  <div className="d-flex align-items-center gap-4">
                    <div 
                      className="rounded-3 p-3 d-flex align-items-center justify-content-center fw-bold"
                      style={{ background: "#f8f5ef", color: "#111827", width: "50px", height: "50px", border: "1px solid #ece6da" }}
                    >
                      {p.title[0]}
                    </div>
                    <div>
                      <p className="fw-bold mb-1 fs-5" style={displayFont}>{p.title}</p>
                      <div className="d-flex gap-2 flex-wrap">
                        <span 
                          className="px-2 py-1 rounded-pill small fw-bold text-uppercase"
                          style={{ 
                            background: p.status === 'ACTIVE' ? "#dcfce7" : "#f1f5f9", 
                            color: p.status === 'ACTIVE' ? "#166534" : "#475569",
                            fontSize: "0.6rem",
                            letterSpacing: "0.05em"
                          }}
                        >
                          {p.status}
                        </span>
                        <span 
                          className="px-2 py-1 rounded-pill small fw-bold text-uppercase"
                          style={{ background: "#fef3c7", color: "#92400e", fontSize: "0.6rem", letterSpacing: "0.05em" }}
                        >
                          Critical: ₹{p.rewards?.critical || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-dark px-4 py-2 rounded-pill fw-bold"
                    style={{ background: "#111827" }}
                    onClick={() => navigate("/program-details", { state: { program: p } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-8">
              <div className="text-center py-5 rounded-4 bg-white border" style={{ borderStyle: "dashed !important" }}>
                <p className="text-muted mb-0">This company hasn't launched any public programs yet.</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 text-center">
          <button
            className="btn btn-link text-decoration-none fw-bold"
            style={{ color: "#e85d3f" }}
            onClick={() => navigate(`/company/${id}`)}
          >
            &larr; Back to Company Profile
          </button>
        </div>

      </div>
    </div>
  );
}

export default CompanyPrograms;