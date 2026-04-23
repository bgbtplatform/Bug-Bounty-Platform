import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../apiClient";

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
    <div className="row g-4 p-4">
      {/* LEFT SIDE */}
      <div className="col-md-5 text-center">
        <img
          src={company.logo || "/default-logo.png"}
          alt={company.name}
          className="img-fluid mb-3"
          style={{ maxHeight: "200px", objectFit: "contain" }}
        />
        <h2>{company.name}</h2>
        <p className="text-muted">{company.description}</p>
        <a href={company.website} target="_blank" rel="noreferrer">
          Visit Website
        </a>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-md-7">
        <h4 className="mb-3">Bounty Range</h4>
        <p className="text-success fs-5">
          ₹{company.bountyRange?.min} - ₹{company.bountyRange?.max}
        </p>

        <h4 className="mt-4 mb-2">Response Efficiency</h4>
        <p>{company.responseEfficiency}%</p>

        <h4 className="mt-4 mb-2">Severity Rewards</h4>
        <div className="row text-center">
          <div className="col">
            <p className="text-muted">Low</p>
            <p>₹{company.severityRewards?.low}</p>
          </div>
          <div className="col">
            <p className="text-muted">Medium</p>
            <p>₹{company.severityRewards?.medium}</p>
          </div>
          <div className="col">
            <p className="text-muted">High</p>
            <p>₹{company.severityRewards?.high}</p>
          </div>
          <div className="col">
            <p className="text-muted">Critical</p>
            <p className="text-danger">
              ₹{company.severityRewards?.critical}
            </p>
          </div>
        </div>

        <h4 className="mt-4 mb-2">Assets</h4>
        <div className="d-flex flex-wrap gap-2">
          {company.assets?.map((a, i) => (
            <span key={i} className="badge bg-dark">
              {a}
            </span>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button
            className="btn btn-primary px-4"
            onClick={() => navigate(`/company/${id}/programs`)}
          >
            View Programs
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;