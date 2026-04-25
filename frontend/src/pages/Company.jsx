import { useEffect, useState } from "react";
import axiosClient from "../apiClient";
import { useNavigate } from "react-router-dom";

function Company() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  async function getCompanies() {
    try {
      const res = await axiosClient.get("/company");

      const data = res.data?.data || res.data?.companies || res.data || [];

      setCompanies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setCompanies([]);
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="p-4">

      {/* TOP DESCRIPTION */}
      <div className="mb-4">
        <h2 className="fw-bold">Companies</h2>
        <p className="text-muted">
          Discover organizations running bug bounty programs. Explore rewards,
          policies, and start earning by finding vulnerabilities.
        </p>
      </div>

      {/* CARDS */}
      <div className="row g-4">
        {companies.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div
              className="card h-100 p-4 d-flex flex-column"
              style={{ borderRadius: "14px" }}
            >
              <div className="d-flex align-items-center mb-3">
                <img
                  src={p.logo || "/default-logo.png"}
                  alt={p.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                    marginRight: "12px",
                  }}
                />
                <h5 className="mb-0">{p.name}</h5>
              </div>

              <p className="text-muted flex-grow-1">
                {p.description || "No description available"}
              </p>

              <button
                className="btn btn-dark mt-3"
                onClick={() => navigate(`/company/${p._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {companies.length === 0 && (
        <p className="text-muted mt-3">No companies available</p>
      )}
    </div>
  );
}

export default Company;