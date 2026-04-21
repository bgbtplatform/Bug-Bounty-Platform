import { useLocation, useNavigate } from "react-router-dom";

function ProgramDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const program = state?.program;

  if (!program) {
    return (
      <div className="container mt-4 text-center">
        <p>No program data found.</p>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/programs")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 p-4">

        <div className="d-flex justify-content-between">
          <h3>{program.title}</h3>
          <span className="badge bg-light text-dark border">
            {program.status}
          </span>
        </div>

        <p className="text-muted">{program.description}</p>

        {/* Rewards */}
        <h5 className="mt-3">Rewards</h5>
        <ul>
          <li>Low: ₹{program.rewards.low}</li>
          <li>Medium: ₹{program.rewards.medium}</li>
          <li>High: ₹{program.rewards.high}</li>
          <li>Critical: ₹{program.rewards.critical}</li>
        </ul>

        {/* Rules */}
        <h5>Rules</h5>
        <ul>
          {program.rules?.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>

        {/* Policy */}
        <h5>Policy</h5>
        <ul>
          {program.policy?.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>

        <button
          className="btn btn-outline-dark mt-3"
          onClick={() => navigate("/programs")}
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default ProgramDetails;