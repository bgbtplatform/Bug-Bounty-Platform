import { useLocation, useNavigate } from "react-router-dom";

function ScopeDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const scope = state?.scope;
  const program = state?.program;

  if (!scope) return null;

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">{scope.assetName}</h2>
        <p className="text-muted mb-0">{program?.title}</p>
      </div>

      {/* DETAILS */}
      <div className="border rounded p-4 mb-4">

        <div className="row mb-3">
          <div className="col-6">
            <small className="text-muted d-block">Type</small>
            <span>{scope.type}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">In Scope</small>
            <span>{scope.inScope ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <small className="text-muted d-block">Max Severity</small>
            <span className="text-capitalize">{scope.maxSeverity}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Bounty Eligible</small>
            <span>{scope.bountyEligible ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <small className="text-muted d-block">Resolved Reports</small>
            <span>{scope.resolvedReports}</span>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Last Updated</small>
            <span>{new Date(scope.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>

      </div>

      {/* SUBMIT REPORT */}
      <button className="btn btn-dark w-100 mb-3">
        Submit Report
      </button>

      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-dark w-100"
        onClick={() => navigate("/scope", { state: { program } })}
      >
        Back to Scopes
      </button>

    </div>
  );
}

export default ScopeDetails;
