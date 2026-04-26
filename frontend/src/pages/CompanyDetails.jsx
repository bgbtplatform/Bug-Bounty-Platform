import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";
import { useAuth } from "../context/AuthContext";

function CompanyDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  let [company, setCompany] = useState(false);

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  async function getCompany() {
    try {
      let res = await axiosClient.get(`/company/${id}`);
      let data = res.data.data || res.data;
      setCompany(data);
    } catch (error) {
      console.log(error);
      setCompany(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      await axiosClient.delete(`/company/${id}`);
      navigate("/company");
    } catch (error) {
      console.error(error);
      alert("Failed to delete company");
    }
  }

  useEffect(() => {
    getCompany();
  }, [id]);

  if (!company) return null;

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>

        {/* HERO SECTION */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-12">
            <div
              className="rounded-4 p-4 p-lg-5 bg-white shadow-sm"
              style={{ border: "1px solid #ece6da" }}
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-4 mb-4">
                <div className="d-flex align-items-center gap-4">
                  <div 
                    className="rounded-4 overflow-hidden d-flex align-items-center justify-content-center bg-light shadow-sm"
                    style={{ width: "120px", height: "120px", border: "1px solid #f1f5f9" }}
                  >
                    <img
                      src={company.logo || "/default-logo.png"}
                      alt={company.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain", padding: "15px" }}
                    />
                  </div>
                  <div>
                    <span
                      className="d-inline-block px-3 py-1 rounded-pill mb-2 fw-bold text-uppercase"
                      style={{ background: "#111827", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
                    >
                      COMPANY PROFILE
                    </span>
                    <h1 className="fw-bold mb-1" style={{ ...displayFont, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>{company.name}</h1>
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-decoration-none fw-semibold" 
                      style={{ color: "#e85d3f" }}
                    >
                      {company.website?.replace(/^https?:\/\//, '')} &nearr;
                    </a>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  {user && user._id === company.owner && (
                    <>
                      <button className="btn btn-sm btn-outline-dark px-4 rounded-pill fw-bold" onClick={() => navigate(`/company/edit/${id}`)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger px-4 rounded-pill fw-bold" onClick={handleDelete}>Delete</button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-muted mb-0" style={{ maxWidth: "800px", fontSize: "1.1rem", lineHeight: "1.8" }}>
                {company.description}
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <div className="row g-4">
              {/* TOP METRICS */}
              <div className="col-sm-6">
                <div className="rounded-4 p-4 h-100 bg-white border shadow-sm">
                  <small className="text-muted d-block text-uppercase fw-bold mb-2" style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                    Bounty Range
                  </small>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="fs-3 fw-bold text-dark" style={displayFont}>₹{company.bountyRange?.min || 0}</span>
                    <span className="text-muted">to</span>
                    <span className="fs-3 fw-bold" style={{ ...displayFont, color: "#e85d3f" }}>₹{company.bountyRange?.max || 0}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rounded-4 p-4 h-100 bg-white border shadow-sm text-center">
                  <small className="text-muted d-block text-uppercase fw-bold mb-2" style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                    Response Efficiency
                  </small>
                  <span className="fs-1 fw-bold text-dark" style={displayFont}>{company.responseEfficiency || 0}%</span>
                  <div className="progress mt-2" style={{ height: "6px" }}>
                    <div className="progress-bar" style={{ width: `${company.responseEfficiency}%`, background: "#111827" }}></div>
                  </div>
                </div>
              </div>

              {/* SEVERITY REWARDS */}
              <div className="col-12">
                <div className="rounded-4 p-4 bg-white border shadow-sm">
                  <h5 className="fw-bold mb-4 pb-2 border-bottom" style={displayFont}>Reward Tiers</h5>
                  <div className="row g-4 text-center">
                    <div className="col-6 col-md-3">
                      <p className="text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: "0.6rem" }}>Low</p>
                      <p className="fw-bold mb-0 h5 text-dark">₹{company.severityRewards?.low || 0}</p>
                    </div>
                    <div className="col-6 col-md-3">
                      <p className="text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: "0.6rem" }}>Medium</p>
                      <p className="fw-bold mb-0 h5 text-dark">₹{company.severityRewards?.medium || 0}</p>
                    </div>
                    <div className="col-6 col-md-3">
                      <p className="text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: "0.6rem" }}>High</p>
                      <p className="fw-bold mb-0 h5 text-dark">₹{company.severityRewards?.high || 0}</p>
                    </div>
                    <div className="col-6 col-md-3">
                      <p className="text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: "0.6rem" }}>Critical</p>
                      <p className="fw-bold mb-0 h4" style={{ color: "#e85d3f" }}>₹{company.severityRewards?.critical || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ASSETS */}
              <div className="col-12">
                <div className="rounded-4 p-4 bg-white border shadow-sm">
                  <h5 className="fw-bold mb-4 pb-2 border-bottom" style={displayFont}>Eligible Assets</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {company.assets?.length > 0 ? (
                      company.assets.map((a, i) => (
                        <span key={i} className="px-3 py-2 rounded-3 border text-dark fw-bold small bg-light">
                          {a}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted small italic">No specific assets listed. Please check individual programs.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR / ACTIONS */}
          <div className="col-lg-4">
            <div 
              className="rounded-4 p-4 h-100 d-flex flex-column gap-3 shadow-sm sticky-top"
              style={{ background: "#111827", color: "#ffffff", maxHeight: "400px", top: "2rem" }}
            >
              <h4 className="fw-bold mb-3" style={displayFont}>Quick Actions</h4>
              <p className="small mb-4" style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
                Browse active bounty programs for this organization to see specific scopes and reward criteria.
              </p>
              
              <button
                className="btn btn-light py-3 fw-bold rounded-3 mb-2"
                style={{ color: "#111827" }}
                onClick={() => navigate(`/company/${id}/programs`)}
              >
                Explore Active Programs
              </button>
              
              <button
                className="btn btn-outline-light py-3 fw-bold rounded-3"
                onClick={() => navigate("/company")}
              >
                Back to All Companies
              </button>

              <div className="mt-auto pt-4 border-top border-secondary text-center">
                <span className="small text-muted text-uppercase fw-bold" style={{ fontSize: "0.6rem" }}>BugSeek verified partner</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CompanyDetails;