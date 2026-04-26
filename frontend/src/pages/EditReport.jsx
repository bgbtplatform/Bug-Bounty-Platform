import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function EditReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    impact: "",
    severity: "NONE"
  });

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await axiosClient.get(`/reports/${id}`);
        const data = res.data?.data || res.data;
        if (data) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            impact: data.impact || "",
            severity: data.severity || "NONE",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axiosClient.put(`/reports/${id}`, formData);
      alert("Report updated successfully");
      navigate(`/reports/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update report");
    }
  }

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h3>Edit Your Report</h3>
        <hr />
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Report Title</label>
            <input type="text" className="form-control" value={formData.title} required onChange={e => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description / Steps to Reproduce</label>
            <textarea className="form-control" rows="6" value={formData.description} required onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Impact</label>
            <textarea className="form-control" rows="3" value={formData.impact} required onChange={e => setFormData({ ...formData, impact: e.target.value })}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Estimated Severity</label>
            <select className="form-select" value={formData.severity} onChange={e => setFormData({ ...formData, severity: e.target.value })}>
              <option value="NONE">None</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary px-4">Update Report</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditReport;
