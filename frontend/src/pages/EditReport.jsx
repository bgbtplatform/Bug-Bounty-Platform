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
    severity: "NONE",
    attachements: ""
  });
  const [newFile, setNewFile] = useState(null);

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

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
            attachements: data.attachements || ""
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
      // 1. Update text fields
      await axiosClient.put(`/reports/${id}`, {
        title: formData.title,
        description: formData.description,
        impact: formData.impact,
        severity: formData.severity
      });

      // 2. Update file if selected
      if (newFile) {
        const fileData = new FormData();
        fileData.append("attachements", newFile);
        await axiosClient.put(`/reports/${id}/attachments`, fileData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      alert("Report updated successfully");
      navigate(`/reports/${id}`);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update report");
    }
  }

  if (loading) return <div className="p-5 text-center fw-bold" style={displayFont}>Loading Report...</div>;

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
              style={{ background: "#e85d3f", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
            >
              VULNERABILITY REPORT
            </span>
            <h1 className="fw-bold mb-3" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Edit Submission</h1>
            <p className="text-muted">Refine your findings or provide additional impact details.</p>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="row g-4">
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Report Title</label>
                <input 
                  type="text" 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  value={formData.title} 
                  required 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Technical Description</label>
                <textarea 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb", fontFamily: "monospace", fontSize: "0.9rem" }}
                  rows="8" 
                  value={formData.description} 
                  required 
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
                <div className="form-text small">Include steps to reproduce, environment info, and code snippets.</div>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Impact Analysis</label>
                <textarea 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  rows="4" 
                  value={formData.impact} 
                  required 
                  onChange={e => setFormData({ ...formData, impact: e.target.value })}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Reported Severity</label>
                <select 
                  className="form-select p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  value={formData.severity} 
                  onChange={e => setFormData({ ...formData, severity: e.target.value })}
                >
                  <option value="NONE">None / Informational</option>
                  <option value="LOW">Low Severity</option>
                  <option value="MEDIUM">Medium Severity</option>
                  <option value="HIGH">High Severity</option>
                  <option value="CRITICAL">Critical Severity</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Update Attachments (PDF/Images)</label>
                <input 
                  type="file" 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  onChange={e => setNewFile(e.target.files[0])} 
                />
                {formData.attachements && (
                  <div className="mt-2 small">
                    <span className="text-muted">Current file: </span>
                    <a href={formData.attachements} target="_blank" rel="noreferrer" className="text-decoration-none fw-bold" style={{ color: "#e85d3f" }}>View Evidence</a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-3">
              <button type="submit" className="btn btn-dark px-5 py-3 rounded-3 fw-bold" style={{ background: "#111827" }}>Save Changes</button>
              <button type="button" className="btn btn-outline-dark px-5 py-3 rounded-3 fw-bold" onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditReport;
