import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function CompanyPrograms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

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
    <div className="container mt-4">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Company Programs</h2>
        <p className="text-muted">
          Active and past bug bounty programs for this company.
        </p>
      </div>

      {/* PROGRAM LIST */}
      {programs.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {programs.map((p) => (
            <div key={p._id} className="border rounded p-3 d-flex justify-content-between align-items-center">

              {/* LEFT: BASIC INFO */}
              <div>
                <p className="fw-semibold mb-1">{p.title}</p>
                <small className="text-muted">
                  Status: {p.status} &nbsp;·&nbsp; Critical Reward: ₹{p.rewards?.critical || "N/A"}
                </small>
              </div>

              {/* RIGHT: BUTTON */}
              <button
                className="btn btn-dark btn-sm"
                onClick={() => navigate("/program-details", { state: { program: p } })}
              >
                View Details
              </button>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No programs available for this company.</p>
      )}

      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-dark mt-4"
        onClick={() => navigate(`/company/${id}`)}
      >
        Back to Company
      </button>
    </div>
  );
}

export default CompanyPrograms;