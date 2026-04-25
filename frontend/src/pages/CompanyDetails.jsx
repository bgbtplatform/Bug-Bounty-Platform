import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function CompanyDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  let [company, setCompany] = useState(false);

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

  useEffect(() => {
    getCompany();
  }, [id]);

  if (!company) return null;

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="mb-0 fw-bold">{company.name}</h2>
        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-dark btn-sm"
        >
          Visit Website
        </a>
      </div>

      <div className="row g-5">
        {/* LEFT SIDE */}
        <div className="col-md-4 text-center">
          <div className="border rounded p-4 mb-3 d-flex align-items-center justify-content-center" style={{ minHeight: "250px" }}>
            <img
              src={company.logo || "/default-logo.png"}
              alt={company.name}
              className="img-fluid"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
          </div>
          <p className="text-muted text-start" style={{ lineHeight: "1.6" }}>
            {company.description}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-8">

          {/* TOP METRICS */}
          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <div className="border rounded p-3 h-100">
                <small className="text-muted d-block text-uppercase fw-semibold mb-1" style={{ fontSize: "0.8rem" }}>
                  Bounty Range
                </small>
                <span className="fs-5 fw-bold text-dark">
                  ₹{company.bountyRange?.min || 0} - ₹{company.bountyRange?.max || 0}
                </span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="border rounded p-3 h-100">
                <small className="text-muted d-block text-uppercase fw-semibold mb-1" style={{ fontSize: "0.8rem" }}>
                  Response Efficiency
                </small>
                <span className="fs-5 fw-bold text-dark">{company.responseEfficiency}%</span>
              </div>
            </div>
          </div>

          {/* SEVERITY REWARDS */}
          <div className="border rounded p-4 mb-4">
            <h5 className="mb-3 fw-bold">Severity Rewards</h5>
            <div className="row text-center align-items-center">
              <div className="col border-end">
                <p className="text-muted mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.8rem" }}>Low</p>
                <p className="fw-medium mb-0">₹{company.severityRewards?.low || 0}</p>
              </div>
              <div className="col border-end">
                <p className="text-muted mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.8rem" }}>Medium</p>
                <p className="fw-medium mb-0">₹{company.severityRewards?.medium || 0}</p>
              </div>
              <div className="col border-end">
                <p className="text-muted mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.8rem" }}>High</p>
                <p className="fw-medium mb-0">₹{company.severityRewards?.high || 0}</p>
              </div>
              <div className="col">
                <p className="text-muted mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.8rem" }}>Critical</p>
                <p className="fw-bold text-dark mb-0 fs-5">
                  ₹{company.severityRewards?.critical || 0}
                </p>
              </div>
            </div>
          </div>

          {/* ASSETS */}
          <div className="mb-4">
            <h5 className="mb-3 fw-bold">Assets</h5>
            <div className="d-flex flex-wrap gap-2">
              {company.assets?.length > 0 ? (
                company.assets.map((a, i) => (
                  <span key={i} className="badge border border-dark text-dark px-3 py-2 bg-transparent fw-medium">
                    {a}
                  </span>
                ))
              ) : (
                <span className="text-muted small">No assets listed</span>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-5 border-top pt-4 d-flex justify-content-end gap-2">
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/company")}
            >
              Back to Companies
            </button>
            <button
              className="btn btn-dark px-4"
              onClick={() => navigate(`/company/${id}/programs`)}
            >
              View Programs
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;