import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../apiClient";

function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/company/${id}`)
      .then((res) => {
        const data = res.data.data || res.data;
        setCompany(data);
      })
      .catch(() => {});
  }, [id]);

  if (!company) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card p-4 mb-4">
        <div className="d-flex align-items-center">
          <img
            src={company.logo || "/default-logo.png"}
            alt={company.name}
            style={{ width: "70px", marginRight: "20px" }}
          />
          <div>
            <h2 className="mb-1">{company.name}</h2>
            <p className="text-muted mb-1">{company.description}</p>
            <a href={company.website} target="_blank" className="text-primary">
              Visit Website
            </a>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 h-100">
            <h5>Bounty Range</h5>
            <h3 className="text-success">
              ₹{company.bountyRange?.min} - ₹{company.bountyRange?.max}
            </h3>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 h-100">
            <h5>Response Efficiency</h5>
            <h3>{company.responseEfficiency}%</h3>
          </div>
        </div>

        <div className="col-12">
          <div className="card p-4">
            <h5 className="mb-3">Severity Rewards</h5>
            <div className="row text-center">
              <div className="col">
                <p className="text-muted">Low</p>
                <h6>₹{company.severityRewards?.low}</h6>
              </div>
              <div className="col">
                <p className="text-muted">Medium</p>
                <h6>₹{company.severityRewards?.medium}</h6>
              </div>
              <div className="col">
                <p className="text-muted">High</p>
                <h6>₹{company.severityRewards?.high}</h6>
              </div>
              <div className="col">
                <p className="text-muted">Critical</p>
                <h6 className="text-danger">
                  ₹{company.severityRewards?.critical}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card p-4">
            <h5 className="mb-3">Assets</h5>
            <div className="d-flex flex-wrap gap-2">
              {company.assets?.map((a, i) => (
                <span key={i} className="badge bg-dark">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;