import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    programType: "public",
    bountyRange: { min: 0, max: 0 },
    severityRewards: { low: 0, medium: 0, high: 0, critical: 0 }
  });

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await axiosClient.get(`/company/${id}`);
        const data = res.data?.data || res.data;
        if (data) {
          setFormData({
            name: data.name || "",
            website: data.website || "",
            description: data.description || "",
            programType: data.programType || "public",
            bountyRange: data.bountyRange || { min: 0, max: 0 },
            severityRewards: data.severityRewards || { low: 0, medium: 0, high: 0, critical: 0 }
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch company", error);
        alert("Error loading company data");
        navigate("/company");
      }
    }
    fetchCompany();
  }, [id, navigate]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("website", formData.website);
      data.append("description", formData.description);
      data.append("programType", formData.programType);
      data.append("bountyRange", JSON.stringify(formData.bountyRange));
      data.append("severityRewards", JSON.stringify(formData.severityRewards));
      if (logoFile) {
        data.append("logo", logoFile);
      }

      await axiosClient.put(`/company/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Company updated successfully");
      navigate("/company");
    } catch (error) {
      console.error("Update failed", error);
      alert(error.response?.data?.message || "Failed to update company");
    }
  }

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4">Edit Company</h3>
        <form onSubmit={handleUpdate}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Logo (New or Leave Empty)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Website</label>
              <input
                type="text"
                className="form-control"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Program Type</label>
              <select
                className="form-select"
                value={formData.programType}
                onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <hr />
            <h6>Bounty Range (₹)</h6>
            <div className="col-md-6">
              <label className="form-label">Min</label>
              <input
                type="number"
                className="form-control"
                value={formData.bountyRange.min}
                onChange={(e) => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, min: e.target.value } })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Max</label>
              <input
                type="number"
                className="form-control"
                value={formData.bountyRange.max}
                onChange={(e) => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, max: e.target.value } })}
              />
            </div>
            <hr />
            <h6>Severity Rewards (₹)</h6>
            <div className="col-3">
              <label className="small">Low</label>
              <input type="number" className="form-control" value={formData.severityRewards.low} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, low: e.target.value } })} />
            </div>
            <div className="col-3">
              <label className="small">Medium</label>
              <input type="number" className="form-control" value={formData.severityRewards.medium} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, medium: e.target.value } })} />
            </div>
            <div className="col-3">
              <label className="small">High</label>
              <input type="number" className="form-control" value={formData.severityRewards.high} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, high: e.target.value } })} />
            </div>
            <div className="col-3">
              <label className="small">Critical</label>
              <input type="number" className="form-control" value={formData.severityRewards.critical} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, critical: e.target.value } })} />
            </div>
          </div>
          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary">Update Company</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/company")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCompany;
