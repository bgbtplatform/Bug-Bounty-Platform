import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../apiClient";

function ScopeDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const scope = state?.scope;
  const program = state?.program;

  if (!scope) return null;

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    try {
      await axiosClient.delete(`/scope/${scope._id}`);
      navigate("/scope", { state: { program } });
    } catch (error) {
      console.error(error);
      alert("Failed to delete scope");
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="fw-bold mb-0">{scope.assetName}</h2>
            <p className="text-muted mb-0">{program?.title}</p>
        </div>
        {user && user._id === scope.owner && (
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/scope/edit/${scope._id}`, { state: { program } })}>Edit</button>
                <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
            </div>
        )}
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
      {user && user.role === "HUNTER" && (
        <button 
          className="btn btn-dark w-100 mb-3"
          onClick={() => navigate("/submit-report", { state: { scope, program } })}
        >
          Submit Report
        </button>
      )}

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
