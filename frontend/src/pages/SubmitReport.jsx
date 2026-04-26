import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function SubmitReport() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scope = state?.scope;
  const program = state?.program;

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    impact: "",
    severity: "NONE"
  });
  const [file, setFile] = useState(null);

  if (!scope || !program) return <div className="p-5 text-center fw-bold" style={displayFont}>Invalid scope or program selection.</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("impact", formData.impact);
      data.append("severity", formData.severity);
      data.append("programId", program._id);
      if (file) data.append("attachements", file);

      await axiosClient.post("/reports", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Report submitted successfully!");
      navigate("/programs");
    } catch (error) {
      console.error(error);
      alert("Failed to submit report");
    }
  }

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">
        <div 
          className="rounded-4 p-4 p-lg-5 mx-auto bg-white shadow-sm" 
          style={{ maxWidth: "900px", border: "1px solid #ece6da" }}
        >
          <div className="text-center mb-5">
            <span
              className="d-inline-block px-3 py-1 rounded-pill mb-3 fw-bold text-uppercase"
              style={{ background: "#e85d3f", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
            >
              NEW DISCLOSURE
            </span>
            <h1 className="fw-bold mb-3" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Submit Vulnerability Report</h1>
            <div className="d-flex justify-content-center gap-2 mt-3">
              <span className="badge bg-light text-dark border px-3 py-2 rounded-3 small">Target: {scope.assetName}</span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-3 small">Program: {program.title}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Report Title</label>
                <input 
                  type="text" 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  placeholder="e.g. Broken Authentication on /api/user endpoint" 
                  required 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Detailed Description & Steps</label>
                <textarea 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb", fontFamily: "monospace", fontSize: "0.9rem" }}
                  rows="8" 
                  placeholder="1. Navigate to... 2. Intercept request... 3. Change parameter..." 
                  required 
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Business Impact</label>
                <textarea 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  rows="4" 
                  placeholder="What is the potential consequence of this vulnerability?" 
                  required 
                  onChange={e => setFormData({ ...formData, impact: e.target.value })}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Estimated Severity</label>
                <select 
                  className="form-select p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  onChange={e => setFormData({ ...formData, severity: e.target.value })}
                >
                  <option value="NONE">None / Informational</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Proof of Concept (Attachments)</label>
                <input 
                  type="file" 
                  className="form-control p-3 rounded-3" 
                  style={{ background: "#f9fafb" }}
                  onChange={e => setFile(e.target.files[0])} 
                />
                <div className="form-text small">Upload images or videos demonstrating the bug.</div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-3">
              <button type="submit" className="btn btn-dark px-5 py-3 rounded-3 fw-bold" style={{ background: "#111827" }}>Submit Disclosure</button>
              <button type="button" className="btn btn-outline-dark px-5 py-3 rounded-3 fw-bold" onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubmitReport;
