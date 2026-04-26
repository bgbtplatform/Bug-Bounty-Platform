import { useEffect, useState } from "react";
import axiosClient from "../apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    programType: "public",
    bountyRange: { min: 0, max: 0 },
    severityRewards: { low: 0, medium: 0, high: 0, critical: 0 }
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  async function getCompanies() {
    try {
      const res = await axiosClient.get("/company");
      const data = res.data?.data || res.data?.companies || res.data || [];
      setCompanies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setCompanies([]);
    }
  }

  async function handleAddCompany(e) {
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

      await axiosClient.post("/company", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setShowForm(false);
      setLogoFile(null);
      getCompanies(); // Refresh list
    } catch (error) {
      console.error("Failed to add company", error);
      alert(error.response?.data?.message || "Failed to add company");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      await axiosClient.delete(`/company/${id}`);
      getCompanies();
    } catch (error) {
      console.error(error);
      alert("Failed to delete company");
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="p-4">
      {/* TOP DESCRIPTION */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Companies</h2>
          <p className="text-muted">
            Discover organizations running bug bounty programs. Explore rewards,
            policies, and start earning by finding vulnerabilities.
          </p>
        </div>
        {user && user.role === "COMPANY_ADMIN" && (
          <button className="btn btn-primary shadow-sm" onClick={() => setShowForm(true)}>
            + Add Company
          </button>
        )}
      </div>

      {/* ADD COMPANY FORM MODAL */}
      {showForm && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Company</h5>
                <button className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <form onSubmit={handleAddCompany}>
                <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" required onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Logo</label>
                      <input type="file" className="form-control" accept="image/*" onChange={e => setLogoFile(e.target.files[0])} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Website</label>
                      <input type="text" className="form-control" onChange={e => setFormData({ ...formData, website: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Program Type</label>
                      <select className="form-select" onChange={e => setFormData({ ...formData, programType: e.target.value })}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <hr />
                    <h6>Bounty Range (₹)</h6>
                    <div className="col-md-6">
                      <label className="form-label">Min</label>
                      <input type="number" className="form-control" onChange={e => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, min: e.target.value } })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Max</label>
                      <input type="number" className="form-control" onChange={e => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, max: e.target.value } })} />
                    </div>
                    <hr />
                    <h6>Severity Rewards (₹)</h6>
                    <div className="col-md-3">
                      <label className="small">Low</label>
                      <input type="number" className="form-control form-control-sm" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, low: e.target.value } })} />
                    </div>
                    <div className="col-md-3">
                      <label className="small">Medium</label>
                      <input type="number" className="form-control form-control-sm" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, medium: e.target.value } })} />
                    </div>
                    <div className="col-md-3">
                      <label className="small">High</label>
                      <input type="number" className="form-control form-control-sm" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, high: e.target.value } })} />
                    </div>
                    <div className="col-md-3">
                      <label className="small">Critical</label>
                      <input type="number" className="form-control form-control-sm" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, critical: e.target.value } })} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Company</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CARDS */}
      <div className="row g-4">
        {companies.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div
              className="card h-100 p-4 d-flex flex-column"
              style={{ borderRadius: "14px" }}
            >
              <div className="d-flex align-items-center mb-3">
                <img
                  src={p.logo || "/default-logo.png"}
                  alt={p.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                    marginRight: "12px",
                  }}
                />
                <h5 className="mb-0">{p.name}</h5>
              </div>

              <p className="text-muted flex-grow-1">
                {p.description || "No description available"}
              </p>

              <div className="mt-3">
                <button
                  className="btn btn-dark w-100"
                  onClick={() => navigate(`/company/${p._id}`)}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {companies.length === 0 && (
        <p className="text-muted mt-3">No companies available</p>
      )}
    </div>
  );
}

export default Company;