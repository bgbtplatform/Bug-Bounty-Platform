import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../apiClient";

function Company() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/company")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.companies || [];
        setCompanies(data);
      })
      .catch(() => setCompanies([]));
  }, []);

  return (
    <div className="row g-4">
      {companies.map((p) => (
        <div className="col-md-3" key={p._id}>
          <div
            className="card h-100 d-flex flex-column p-4"
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              minHeight: "260px",
            }}
          >
            <div className="d-flex align-items-center mb-3">
              <img
                src={p.logo || "/default-logo.png"}
                alt={p.name}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  marginRight: "12px",
                }}
              />
              <h6 className="mb-0 fw-bold">{p.name}</h6>
            </div>

            <p className="text-muted" style={{ fontSize: "14px", flexGrow: 1 }}>
              {p.description}
            </p>

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={() => navigate(`/company/${p._id}`)}
            >
              See Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Company;