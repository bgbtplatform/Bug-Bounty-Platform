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

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

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
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>

        <div className="text-center mb-5">
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
              ASSET DETAILS
            </span>
            <h1 className="fw-bold mb-2" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>{scope.assetName}</h1>
            <p className="text-muted fw-semibold" style={{ color: "#e85d3f" }}>{program?.title}</p>
        </div>

        <div 
          className="rounded-4 p-4 p-lg-5 mb-5 bg-white shadow-sm"
          style={{ border: "1px solid #ece6da" }}
        >
          <div className="row g-4 mb-5 border-bottom pb-4">
            <div className="col-md-6">
              <label className="d-block small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em" }}>Asset Type</label>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-light text-dark border px-3 py-2 rounded-3">{scope.type}</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="d-block small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em" }}>Testing Status</label>
              <span 
                className={`badge px-3 py-2 rounded-3 ${scope.inScope ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                style={{ fontSize: "0.9rem" }}
              >
                  {scope.inScope ? "In Scope" : "Out of Scope"}
              </span>
            </div>
          </div>

          <div className="row g-4 mb-5 border-bottom pb-4">
            <div className="col-md-6">
              <label className="d-block small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em" }}>Maximum Severity</label>
              <span className="text-capitalize fw-bold fs-5" style={{ color: "#111827" }}>{scope.maxSeverity}</span>
            </div>
            <div className="col-md-6">
              <label className="d-block small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em" }}>Bounty Eligibility</label>
              <span className={`fw-bold fs-5 ${scope.bountyEligible ? 'text-success' : 'text-muted'}`}>
                {scope.bountyEligible ? "✓ Eligible for rewards" : "× Not eligible"}
              </span>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-6">
              <label className="d-block small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em" }}>Resolved Reports</label>
              <span className="fs-5 fw-bold">{scope.resolvedReports}</span>
            </div>
            <div className="col-6">
              <label className="d-block small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: "0.05em" }}>Last Updated</label>
              <span className="text-muted">{new Date(scope.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>

          {user && user._id === scope.owner && (
            <div className="d-flex gap-2 mt-5 pt-4 border-top">
                <button className="btn btn-outline-dark px-4 rounded-3" onClick={() => navigate(`/scope/edit/${scope._id}`, { state: { program } })}>Edit Asset</button>
                <button className="btn btn-outline-danger px-4 rounded-3" onClick={handleDelete}>Delete Asset</button>
            </div>
          )}
        </div>

        {user && user.role === "HUNTER" && (
          <div 
            className="rounded-4 p-4 mb-4 text-center"
            style={{ background: "#111827", color: "#ffffff" }}
          >
            <h4 className="fw-bold mb-3" style={displayFont}>Found a vulnerability?</h4>
            <p className="small mb-4" style={{ color: "#cbd5e1" }}>Submit your findings for this asset and help improve security.</p>
            <button 
              className="btn btn-light px-5 py-3 rounded-3 fw-bold w-100"
              style={{ color: "#111827" }}
              onClick={() => navigate("/submit-report", { state: { scope, program } })}
            >
              Submit Vulnerability Report
            </button>
          </div>
        )}

        <button
          className="btn btn-outline-dark w-100 py-3 rounded-3 fw-bold"
          onClick={() => navigate("/scope", { state: { program } })}
        >
          Back to Scope List
        </button>

      </div>
    </div>
  );
}

export default ScopeDetails;
