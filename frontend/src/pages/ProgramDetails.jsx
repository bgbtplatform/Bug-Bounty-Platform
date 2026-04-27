import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../apiClient";

function ProgramDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const program = state?.program;

  if (!program) return null;

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    try {
      await axiosClient.delete(`/program/${program._id}`);
      navigate("/programs");
    } catch (error) {
      console.error(error);
      alert("Failed to delete program");
    }
  }

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        
        {/* HEADER SECTION */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-12">
            <div
              className="rounded-4 p-4 p-lg-5"
              style={{
                background: "#ffffff",
                border: "1px solid #ece6da",
              }}
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                <div>
                  <span
                    className="d-inline-block px-3 py-2 rounded-pill mb-4"
                    style={{
                      background: "#111827",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                      fontWeight: "600"
                    }}
                  >
                    PROGRAM DETAILS
                  </span>
                  <h1
                    className="fw-bold mb-3"
                    style={{
                      ...displayFont,
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: "1.1",
                      color: "#111827",
                    }}
                  >
                    {program.title}
                  </h1>
                  <div className="d-flex align-items-center gap-3">
                    <span 
                      className="px-3 py-1 rounded-pill small fw-bold text-uppercase"
                      style={{
                        background: program.status === 'ACTIVE' ? "#dcfce7" : "#f1f5f9",
                        color: program.status === 'ACTIVE' ? "#166534" : "#475569",
                        fontSize: "0.7rem",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {program.status}
                    </span>
                    {user && user._id === program.owner && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-dark px-3 rounded-pill" onClick={() => navigate(`/program/edit/${program._id}`)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger px-3 rounded-pill" onClick={handleDelete}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p 
                className="mb-0 text-muted"
                style={{
                  maxWidth: "800px",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
              >
                {program.description}
              </p>
            </div>
          </div>
        </div>

        {/* GRID CONTENT */}
        <div className="row g-4">
          {/* REWARDS */}
          <div className="col-md-4">
            <div 
              className="h-100 rounded-4 p-4"
              style={{ background: "#ffffff", border: "1px solid #ece6da" }}
            >
              <h5 className="fw-bold mb-4" style={displayFont}>Rewards</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted small fw-bold text-uppercase">Critical</span>
                  <span className="fw-bold" style={{ color: "#e85d3f" }}>₹{program.rewards?.critical}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted small fw-bold text-uppercase">High</span>
                  <span className="fw-bold text-dark">₹{program.rewards?.high}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted small fw-bold text-uppercase">Medium</span>
                  <span className="fw-bold text-dark">₹{program.rewards?.medium}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small fw-bold text-uppercase">Low</span>
                  <span className="fw-bold text-dark">₹{program.rewards?.low}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RULES */}
          <div className="col-md-4">
            <div 
              className="h-100 rounded-4 p-4"
              style={{ background: "#ffffff", border: "1px solid #ece6da" }}
            >
              <h5 className="fw-bold mb-4" style={displayFont}>Rules</h5>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {program.rules?.length > 0 ? program.rules.map((r, i) => (
                  <li key={i} className="d-flex gap-2 text-muted small" style={{ lineHeight: "1.6" }}>
                    <span style={{ color: "#e85d3f" }}>•</span> {r}
                  </li>
                )) : <li className="text-muted small italic">No specific rules listed.</li>}
              </ul>
            </div>
          </div>

          {/* POLICY */}
          <div className="col-md-4">
            <div 
              className="h-100 rounded-4 p-4"
              style={{ background: "#ffffff", border: "1px solid #ece6da" }}
            >
              <h5 className="fw-bold mb-4" style={displayFont}>Policy</h5>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {program.policy?.length > 0 ? program.policy.map((p, i) => (
                  <li key={i} className="d-flex gap-2 text-muted small" style={{ lineHeight: "1.6" }}>
                    <span style={{ color: "#111827" }}>•</span> {p}
                  </li>
                )) : <li className="text-muted small italic">Standard disclosure policy applies.</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button
                className="btn btn-outline-dark px-5 py-3 rounded-3 fw-bold"
                onClick={() => navigate("/programs")}
                style={{ minWidth: "200px" }}
              >
                Back to Programs
              </button>
              <button
                className="btn btn-dark px-5 py-3 rounded-3 fw-bold"
                onClick={() => navigate("/scope", { state: { program } })}
                style={{ minWidth: "200px", background: "#111827" }}
              >
                Explore Scopes
              </button>
              {user && user._id === program.owner && (
                <button
                  className="btn px-5 py-3 rounded-3 fw-bold"
                  onClick={() => navigate(`/company/program/${program._id}/reports`)}
                  style={{ minWidth: "200px", background: "#e85d3f", color: "#fff", border: "none" }}
                >
                  View Incoming Reports
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProgramDetails;