import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function EditProgram() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ACTIVE",
    rewards: { low: 0, medium: 0, high: 0, critical: 0 }
  });

  useEffect(() => {
    async function fetchProgram() {
      try {
        const res = await axiosClient.get(`/program/${id}`); 
        const data = res.data?.data || res.data;
        if (data) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            status: data.status || "ACTIVE",
            rewards: data.rewards || { low: 0, medium: 0, high: 0, critical: 0 }
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch program", error);
        setLoading(false);
      }
    }
    fetchProgram();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axiosClient.put(`/program/${id}`, formData);
      alert("Program updated successfully");
      navigate("/programs");
    } catch (error) {
      console.error("Update failed", error);
      alert(error.response?.data?.message || "Failed to update program");
    }
  }

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4">Edit Program</h3>
        <form onSubmit={handleUpdate}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
                <option value="PAUSED">Paused</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <hr />
            <h6>Rewards (₹)</h6>
            <div className="col-3">
              <label className="small">Low</label>
              <input type="number" className="form-control" value={formData.rewards.low} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, low: e.target.value } })} />
            </div>
            <div className="col-3">
              <label className="small">Medium</label>
              <input type="number" className="form-control" value={formData.rewards.medium} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, medium: e.target.value } })} />
            </div>
            <div className="col-3">
              <label className="small">High</label>
              <input type="number" className="form-control" value={formData.rewards.high} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, high: e.target.value } })} />
            </div>
            <div className="col-3">
              <label className="small">Critical</label>
              <input type="number" className="form-control" value={formData.rewards.critical} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, critical: e.target.value } })} />
            </div>
          </div>
          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary">Update Program</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/programs")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProgram;
