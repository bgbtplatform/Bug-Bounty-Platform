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

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4">Edit Scope Asset</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Asset Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.assetName}
              onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Web">Web</option>
                <option value="API">API</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Max Severity</label>
              <select
                className="form-select"
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
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={formData.inScope}
              onChange={(e) => setFormData({ ...formData, inScope: e.target.checked })}
              id="editInScope"
            />
            <label className="form-check-label" htmlFor="editInScope">In Scope</label>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Update Asset</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/scope", { state: { program } })}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditScope;
