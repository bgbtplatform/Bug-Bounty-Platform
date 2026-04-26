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
            company: program.companyId // Program model has companyId
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
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="fw-bold">{program.title} — Scopes</h2>
            <p className="text-muted">Assets in scope for this program.</p>
        </div>
        {user && user._id === program.owner && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Scope</button>
        )}
      </div>

      {/* ADD MODAL */}
      {showForm && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add Scope Asset</h5>
                        <button className="btn-close" onClick={() => setShowForm(false)}></button>
                      </div>
                      <form onSubmit={handleAddScope}>
                          <div className="modal-body">
                              <div className="mb-3">
                                  <label className="form-label">Asset Name (Domain/URL)</label>
                                  <input type="text" className="form-control" required onChange={e => setFormData({ ...formData, assetName: e.target.value })} placeholder="example.com" />
                              </div>
                              <div className="row">
                                  <div className="col-md-6 mb-3">
                                      <label className="form-label">Type</label>
                                      <select className="form-select" onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                          <option value="Web">Web</option>
                                          <option value="API">API</option>
                                          <option value="Android">Android</option>
                                          <option value="iOS">iOS</option>
                                          <option value="Other">Other</option>
                                      </select>
                                  </div>
                                  <div className="col-md-6 mb-3">
                                      <label className="form-label">Max Severity</label>
                                      <select className="form-select" onChange={e => setFormData({ ...formData, maxSeverity: e.target.value })}>
                                          <option value="low">Low</option>
                                          <option value="medium">Medium</option>
                                          <option value="high">High</option>
                                          <option value="critical">Critical</option>
                                      </select>
                                  </div>
                              </div>
                              <div className="form-check mb-2">
                                  <input className="form-check-input" type="checkbox" checked={formData.inScope} onChange={e => setFormData({ ...formData, inScope: e.target.checked })} id="inScope" />
                                  <label className="form-check-label" htmlFor="inScope">In Scope</label>
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                              <button type="submit" className="btn btn-primary">Add Asset</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )}

      {/* SCOPE LIST */}
      {scopes.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {scopes.map((s) => (
            <div key={s._id} className="border rounded p-3 d-flex justify-content-between align-items-center bg-white shadow-sm">

              {/* LEFT: BASIC INFO */}
              <div>
                <p className="fw-semibold mb-1 fs-5 text-dark">{s.assetName}</p>
                <div className="d-flex gap-2">
                    <span className="badge bg-light text-dark border">{s.type}</span>
                    <span className={`badge ${s.inScope ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                        {s.inScope ? "In Scope" : "Out of Scope"}
                    </span>
                    <span className="badge bg-info-subtle text-info text-capitalize">{s.maxSeverity}</span>
                </div>
              </div>

              {/* RIGHT: BUTTON */}
              <button
                className="btn btn-dark btn-sm"
                onClick={() => navigate("/scope-details", { state: { scope: s, program } })}
              >
                View Details
              </button>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center p-5 border rounded bg-light">No scopes found for this program.</p>
      )}

      {/* BACK BUTTON */}
      <button
        className="btn btn-link mt-4 text-decoration-none text-dark p-0"
        onClick={() => navigate("/program-details", { state: { program } })}
      >
        &larr; Back to Program
      </button>

    </div>
  );
}

export default Scope;

