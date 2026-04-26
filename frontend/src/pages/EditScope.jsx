import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../apiClient";

function EditScope() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    assetName: "",
    type: "Web",
    maxSeverity: "medium",
    inScope: true,
  });

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  const program = state?.program;

  useEffect(() => {
    async function fetchScope() {
      try {
        const res = await axiosClient.get(`/scope/${id}`);
        const data = res.data?.data || res.data;
        if (data) {
          setFormData({
            assetName: data.assetName || "",
            type: data.type || "Web",
            maxSeverity: data.maxSeverity || "medium",
            inScope: data.inScope ?? true,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch scope", error);
        setLoading(false);
      }
    }
    fetchScope();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axiosClient.put(`/scope/${id}`, formData);
      alert("Scope updated successfully");
      navigate("/scope", { state: { program } });
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update scope");
    }
  }

  if (loading) return <div className="p-5 text-center fw-bold" style={displayFont}>Loading Asset Details...</div>;

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">
        <div 
          className="rounded-4 p-4 p-lg-5 mx-auto bg-white shadow-sm" 
          style={{ maxWidth: "650px", border: "1px solid #ece6da" }}
        >
          <div className="text-center mb-5">
            <span
              className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-bold text-uppercase"
              style={{ background: "#111827", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
            >
              ASSET CONFIGURATION
            </span>
            <h1 className="fw-bold mb-3" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Edit Scope Asset</h1>
            <p className="text-muted">Update technical boundaries and testing eligibility.</p>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase text-muted">Asset Name (Domain/URL)</label>
              <input
                type="text"
                className="form-control p-3 rounded-3"
                style={{ background: "#f9fafb" }}
                value={formData.assetName}
                onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
                required
              />
            </div>
            
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Asset Type</label>
                <select
                  className="form-select p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Web">Web Application</option>
                  <option value="API">API Endpoint</option>
                  <option value="Android">Android App</option>
                  <option value="iOS">iOS App</option>
                  <option value="Other">Other Asset</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Max Severity</label>
                <select
                  className="form-select p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  value={formData.maxSeverity}
                  onChange={(e) => setFormData({ ...formData, maxSeverity: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="form-check form-switch mb-5 p-3 rounded-3 border" style={{ background: "#f9fafb" }}>
              <div className="ms-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={formData.inScope}
                  onChange={(e) => setFormData({ ...formData, inScope: e.target.checked })}
                  id="editInScope"
                />
                <label className="form-check-label fw-bold text-dark" htmlFor="editInScope">Asset remains in scope</label>
                <p className="small text-muted mb-0">Researchers will only be rewarded for vulnerabilities found in-scope.</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-3">
              <button type="submit" className="btn btn-dark px-5 py-3 rounded-3 fw-bold" style={{ background: "#111827" }}>Update Asset</button>
              <button type="button" className="btn btn-outline-dark px-5 py-3 rounded-3 fw-bold" onClick={() => navigate("/scope", { state: { program } })}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditScope;
