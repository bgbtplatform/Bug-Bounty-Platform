import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";
import { useAuth } from "../context/AuthContext";

function Scope() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const program = state?.program;
  const [scopes, setScopes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    assetName: "",
    type: "Web",
    maxSeverity: "medium",
    inScope: true,
    bountyEligible: true
  });

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  async function getScopes() {
    try {
      const res = await axiosClient.get(`/scope/program/${program._id}`);
      const data = res.data?.data || res.data || [];
      setScopes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setScopes([]);
    }
  }

  async function handleAddScope(e) {
    e.preventDefault();
    try {
        const payload = {
            ...formData,
            program: program._id,
            company: program.companyId
        };
        await axiosClient.post("/scope", payload);
        setShowForm(false);
        getScopes();
    } catch (error) {
        console.error(error);
        alert("Failed to add scope");
    }
  }

  useEffect(() => {
    if (program?._id) getScopes();
  }, [program]);

  if (!program) return null;

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">

        {/* HEADER SECTION */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-8">
            <div
              className="rounded-4 p-4 p-lg-5"
              style={{
                background: "#ffffff",
                border: "1px solid #ece6da",
              }}
            >
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
                PROGRAM SCOPE
              </span>
              <h1
                className="fw-bold mb-3"
                style={{
                  ...displayFont,
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: "1.1",
                  color: "#111827",
                }}
              >
                {program.title}
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
                Define the boundaries for testing. Review in-scope assets and their eligibility.
              </p>
            </div>
          </div>
          {user && user._id === program.owner && (
            <div className="col-lg-4">
              <div 
                className="rounded-4 p-4 h-100 d-flex flex-column justify-content-center align-items-center text-center shadow-sm"
                style={{ background: "#e85d3f", color: "#ffffff", minHeight: "150px" }}
              >
                <h5 className="fw-bold mb-3">Add Assets</h5>
                <button 
                  className="btn btn-light px-4 py-2 fw-bold" 
                  onClick={() => setShowForm(true)}
                  style={{ color: "#e85d3f" }}
                >
                  + Add New Scope
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ADD MODAL */}
        {showForm && (
            <div className="modal d-block" style={{ backgroundColor: "rgba(17, 24, 39, 0.8)", backdropFilter: "blur(4px)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 border-0 overflow-hidden shadow-lg">
                        <div className="modal-header border-0 p-4 pb-0">
                          <h4 className="fw-bold mb-0" style={displayFont}>Add Scope Asset</h4>
                          <button className="btn-close" onClick={() => setShowForm(false)}></button>
                        </div>
                        <form onSubmit={handleAddScope}>
                            <div className="modal-body p-4">
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-uppercase text-muted">Asset Name (Domain/URL)</label>
                                    <input type="text" className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} required onChange={e => setFormData({ ...formData, assetName: e.target.value })} placeholder="e.g. *.example.com" />
                                </div>
                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Type</label>
                                        <select className="form-select p-3 rounded-3" style={{ background: "#f9fafb" }} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                            <option value="Web">Web</option>
                                            <option value="API">API</option>
                                            <option value="Android">Android</option>
                                            <option value="iOS">iOS</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Max Severity</label>
                                        <select className="form-select p-3 rounded-3" style={{ background: "#f9fafb" }} onChange={e => setFormData({ ...formData, maxSeverity: e.target.value })}>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="critical">Critical</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-check form-switch mt-2">
                                    <input className="form-check-input" type="checkbox" role="switch" checked={formData.inScope} onChange={e => setFormData({ ...formData, inScope: e.target.checked })} id="inScope" />
                                    <label className="form-check-label fw-semibold" htmlFor="inScope">In Scope for testing</label>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-0">
                                <button type="button" className="btn btn-outline-dark px-4" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-dark px-4" style={{ background: "#111827" }}>Add Asset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* SCOPE LIST */}
        <div className="row g-3">
          {scopes.length > 0 ? (
            scopes.map((s) => (
              <div className="col-12" key={s._id}>
                <div 
                  className="rounded-4 p-4 d-flex flex-wrap justify-content-between align-items-center bg-white shadow-sm transition-all"
                  style={{ 
                    border: "1px solid #ece6da",
                  }}
                >
                  <div className="d-flex align-items-center gap-4">
                    <div 
                      className="rounded-3 p-3 d-flex align-items-center justify-content-center fw-bold"
                      style={{ background: "#f8f5ef", color: "#111827", width: "60px", height: "60px", border: "1px solid #ece6da" }}
                    >
                      {s.type[0]}
                    </div>
                    <div>
                      <p className="fw-bold mb-1 fs-5" style={displayFont}>{s.assetName}</p>
                      <div className="d-flex gap-2 flex-wrap">
                          <span 
                            className="px-2 py-1 rounded-pill small fw-bold text-uppercase"
                            style={{ background: "#f1f5f9", color: "#475569", fontSize: "0.6rem", letterSpacing: "0.05em" }}
                          >
                            {s.type}
                          </span>
                          <span 
                            className="px-2 py-1 rounded-pill small fw-bold text-uppercase"
                            style={{ 
                              background: s.inScope ? "#dcfce7" : "#fee2e2", 
                              color: s.inScope ? "#166534" : "#991b1b",
                              fontSize: "0.6rem",
                              letterSpacing: "0.05em"
                            }}
                          >
                              {s.inScope ? "In Scope" : "Out of Scope"}
                          </span>
                          <span 
                            className="px-2 py-1 rounded-pill small fw-bold text-uppercase"
                            style={{ background: "#fef3c7", color: "#92400e", fontSize: "0.6rem", letterSpacing: "0.05em" }}
                          >
                            Max: {s.maxSeverity}
                          </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold"
                    onClick={() => navigate("/scope-details", { state: { scope: s, program } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5 rounded-4 bg-white border" style={{ borderStyle: "dashed !important" }}>
                <p className="text-muted mb-0">No assets have been added to the scope yet.</p>
              </div>
            </div>
          )}
        </div>

        {/* BACK BUTTON */}
        <div className="mt-5 text-center">
          <button
            className="btn btn-link text-decoration-none fw-bold"
            style={{ color: "#e85d3f" }}
            onClick={() => navigate("/program-details", { state: { program } })}
          >
            &larr; Back to Program Overview
          </button>
        </div>

      </div>
    </div>
  );
}

export default Scope;
