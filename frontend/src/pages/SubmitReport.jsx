import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function SubmitReport() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scope = state?.scope;
  const program = state?.program;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    impact: "",
    severity: "NONE"
  });
  const [file, setFile] = useState(null);

  if (!scope || !program) return <div className="p-5">Invalid scope or program.</div>;

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
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h3>Submit Vulnerability Report</h3>
        <p className="text-muted small">Target: {scope.assetName} ({program.title})</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Report Title</label>
            <input type="text" className="form-control" placeholder="e.g. SQL Injection on login form" required onChange={e => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description / Steps to Reproduce</label>
            <textarea className="form-control" rows="6" placeholder="Provide detailed steps..." required onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Impact</label>
            <textarea className="form-control" rows="3" placeholder="What is the business impact?" required onChange={e => setFormData({ ...formData, impact: e.target.value })}></textarea>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Estimated Severity</label>
              <select className="form-select" onChange={e => setFormData({ ...formData, severity: e.target.value })}>
                <option value="NONE">None</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Attachments (PoC Image/Video)</label>
              <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
            </div>
          </div>
          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary px-4">Submit Report</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitReport;
