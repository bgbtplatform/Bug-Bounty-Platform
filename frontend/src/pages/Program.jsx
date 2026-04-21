import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../apiClient";

function Program() {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  async function getPrograms() {
    try {
      const res = await axiosClient.get("/program");

      const data = res.data?.data || res.data || [];
      setPrograms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPrograms([]);
    }
  }

  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <div className="container mt-4">

      {/* TOP DESCRIPTION */}
      <div className="mb-4">
        <h2 className="fw-bold">Bug Bounty Programs</h2>
        <p className="text-muted">
          Browse active bug bounty programs, understand their reward structure,
          and start hunting vulnerabilities to earn rewards and recognition.
        </p>
      </div>

      {/* CARDS */}
      <div className="row">
        {programs.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">

                {/* HEADER */}
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{p.title}</h5>
                  <span className="badge bg-light text-dark border">
                    {p.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="card-text text-muted small">
                  {p.description?.slice(0, 100) || "No description available"}...
                </p>

                {/* REWARDS */}
                <div className="border-top border-bottom py-2 mb-3 small">
                  <div className="d-flex justify-content-between">
                    <span>Low</span>
                    <span>₹{p.rewards?.low}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Medium</span>
                    <span>₹{p.rewards?.medium}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>High</span>
                    <span>₹{p.rewards?.high}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Critical</span>
                    <span>₹{p.rewards?.critical}</span>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  className="btn btn-dark mt-auto w-100"
                  onClick={() =>
                    navigate("/program-details", { state: { program: p } })
                  }
                >
                  View Details
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {programs.length === 0 && (
        <p className="text-muted">No programs available</p>
      )}
    </div>
  );
}

export default Program;