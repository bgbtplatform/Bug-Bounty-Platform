import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../apiClient";

function ProgramDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const program = state?.program;

  if (!program) return null;

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
    <div className="p-4" style={{ maxWidth: "1100px", margin: "0 auto" }}>
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">{program.title}</h2>
        <div className="d-flex gap-2 align-items-center">
            <span className="badge bg-dark px-3 py-2">{program.status}</span>
            {user && user._id === program.owner && (
                <>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/program/edit/${program._id}`)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
      </div>

      <p className="text-muted">{program.description}</p>

      {/* GRID CONTENT */}
      <div className="row g-4 mt-2">

        {/* REWARDS */}
        <div className="col-md-4">
          <h5>Rewards</h5>
          <ul className="mb-0">
            <li>Low: ₹{program.rewards?.low}</li>
            <li>Medium: ₹{program.rewards?.medium}</li>
            <li>High: ₹{program.rewards?.high}</li>
            <li>Critical: ₹{program.rewards?.critical}</li>
          </ul>
        </div>

        {/* RULES */}
        <div className="col-md-4">
          <h5>Rules</h5>
          <ul className="mb-0">
            {program.rules?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* POLICY */}
        <div className="col-md-4">
          <h5>Policy</h5>
          <ul className="mb-0">
            {program.policy?.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="d-flex gap-2 mt-4">
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/programs")}
        >
          Back
        </button>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/scope", { state: { program } })}
        >
          View Scopes
        </button>
      </div>
    </div>
  );
}

export default ProgramDetails;