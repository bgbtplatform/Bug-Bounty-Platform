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

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

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

  if (loading) return <div className="p-5 text-center fw-bold" style={displayFont}>Loading Profile...</div>;

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
              style={{ background: "#111827", color: "#ffffff", fontSize: "0.65rem", letterSpacing: "0.06em" }}
            >
              ADMINISTRATION
            </span>
            <h1 className="fw-bold mb-3" style={{ ...displayFont, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Edit Company Profile</h1>
            <p className="text-muted">Update your organization's public information and reward structures.</p>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Company Name</label>
                <input
                  type="text"
                  className="form-control p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Update Logo</label>
                <input
                  type="file"
                  className="form-control p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-uppercase text-muted">Organization Description</label>
                <textarea
                  className="form-control p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Website URL</label>
                <input
                  type="text"
                  className="form-control p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-uppercase text-muted">Program Privacy</label>
                <select
                  className="form-select p-3 rounded-3"
                  style={{ background: "#f9fafb" }}
                  value={formData.programType}
                  onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
                >
                  <option value="public">Public Program</option>
                  <option value="private">Private Program</option>
                </select>
              </div>

              <div className="col-12 mt-5 pt-3 border-top">
                <h5 className="fw-bold mb-4" style={displayFont}>Bounty Settings (₹)</h5>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase text-muted">Minimum Reward</label>
                    <input
                      type="number"
                      className="form-control p-3 rounded-3"
                      style={{ background: "#f9fafb" }}
                      value={formData.bountyRange.min}
                      onChange={(e) => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, min: e.target.value } })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase text-muted">Maximum Reward</label>
                    <input
                      type="number"
                      className="form-control p-3 rounded-3"
                      style={{ background: "#f9fafb" }}
                      value={formData.bountyRange.max}
                      onChange={(e) => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, max: e.target.value } })}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4">
                <label className="form-label small fw-bold text-uppercase text-muted d-block mb-3">Severity-Based Rewards</label>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted" style={{ fontSize: '0.65rem' }}>LOW</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.severityRewards.low} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, low: e.target.value } })} />
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted" style={{ fontSize: '0.65rem' }}>MEDIUM</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.severityRewards.medium} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, medium: e.target.value } })} />
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted" style={{ fontSize: '0.65rem' }}>HIGH</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.severityRewards.high} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, high: e.target.value } })} />
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-muted" style={{ fontSize: '0.65rem' }}>CRITICAL</label>
                    <input type="number" className="form-control p-2 rounded-3" value={formData.severityRewards.critical} onChange={(e) => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, critical: e.target.value } })} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-top d-flex flex-wrap gap-3">
              <button type="submit" className="btn btn-dark px-5 py-3 rounded-3 fw-bold" style={{ background: "#111827" }}>Save Changes</button>
              <button type="button" className="btn btn-outline-dark px-5 py-3 rounded-3 fw-bold" onClick={() => navigate("/company")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCompany;
