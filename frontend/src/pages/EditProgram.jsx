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

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

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

  if (loading) return <div className="p-5 text-center fw-bold" style={displayFont}>Loading Program...</div>;

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">
        <div 
          className="rounded-4 p-4 p-lg-5 mx-auto bg-white shadow-sm" 
          style={{ maxWidth: "850px", border: "1px solid #ece6da" }}
        >
          <div className="text-center mb-5">
            <span
              className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-bold text-uppercase"
              style={{ background: "#111827", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
            >
              PROGRAM MANAGEMENT
            </span>
            <h1 className="fw-bold mb-3" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Edit Program</h1>
            <p className="text-muted">Modify the details and scope of your active bug bounty initiative.</p>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="row g-4">
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Program Title</label>
                <input
                  type="text"
                  className="form-control p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Description</label>
                <textarea
                  className="form-control p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  rows="6"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Active Status</label>
                <select
                  className="form-select p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="DRAFT">Draft</option>
                  <option value="PAUSED">Paused</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              <div className="col-12 mt-5 pt-3 border-top">
                <h5 className="fw-bold mb-4" style={displayFont}>Reward Matrix (₹)</h5>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Low</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.rewards.low} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, low: e.target.value } })} />
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Medium</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.rewards.medium} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, medium: e.target.value } })} />
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>High</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.rewards.high} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, high: e.target.value } })} />
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Critical</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.rewards.critical} onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, critical: e.target.value } })} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-3">
              <button type="submit" className="btn btn-dark px-5 py-3 rounded-3 fw-bold" style={{ background: "#111827" }}>Update Program</button>
              <button type="button" className="btn btn-outline-dark px-5 py-3 rounded-3 fw-bold" onClick={() => navigate("/programs")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProgram;
