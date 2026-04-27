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
    severityRewards: { low: 0, medium: 0, high: 0, critical: 0 },
    responseEfficiency: 0,
    assets: ""
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

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
      data.append("responseEfficiency", formData.responseEfficiency);
      data.append("assets", JSON.stringify(formData.assets.split(",").map(a => a.trim()).filter(a => a !== "")));
      if (logoFile) {
        data.append("logo", logoFile);
      }

      await axiosClient.post("/company", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setShowForm(false);
      setLogoFile(null);
      getCompanies();
    } catch (error) {
      console.error("Failed to add company", error);
      alert(error.response?.data?.message || "Failed to add company");
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">
        
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-8">
            <div
              className="rounded-4 p-4 p-lg-5"
              style={{
                background: "#f2eadf",
                border: "1px solid #e5dccf",
              }}
            >
              <span
                className="d-inline-block px-3 py-2 rounded-pill mb-4"
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  letterSpacing: "0.06em",
                }}
              >
                PARTNER COMPANIES
              </span>

              <h1
                className="fw-bold mb-4"
                style={{
                  ...displayFont,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: "1.1",
                  color: "#111827",
                  maxWidth: "760px",
                }}
              >
                Discover companies securing the future.
              </h1>

              <p
                className="mb-0 text-muted"
                style={{
                  maxWidth: "700px",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
              >
                Explore organizations that value responsible disclosure. Review their 
                program structures, reward policies, and start a meaningful security partnership.
              </p>
            </div>
          </div>

          {user && user.role === "COMPANY_ADMIN" && (
            <div className="col-lg-4">
              <div 
                className="rounded-4 p-4 h-100 d-flex flex-column justify-content-center align-items-center text-center shadow-sm"
                style={{ background: "#111827", color: "#ffffff", minHeight: "200px" }}
              >
                <h4 className="fw-bold mb-3" style={displayFont}>List Your Company</h4>
                <p className="small mb-4" style={{ color: "#cbd5e1" }}>Join the network of security-first organizations and build researcher trust.</p>
                <button 
                  className="btn btn-light px-4 py-2 fw-bold" 
                  onClick={() => setShowForm(true)}
                  style={{ color: "#111827" }}
                >
                  + Register Company
                </button>
              </div>
            </div>
          )}
        </div>

        {showForm && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(17, 24, 39, 0.8)", backdropFilter: "blur(4px)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 overflow-hidden shadow-lg">
                <div className="modal-header border-0 p-4 pb-0">
                  <h4 className="fw-bold mb-0" style={displayFont}>Add New Company</h4>
                  <button className="btn-close" onClick={() => setShowForm(false)}></button>
                </div>
                <form onSubmit={handleAddCompany}>
                  <div className="modal-body p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-uppercase text-muted">Name</label>
                        <input type="text" className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} required onChange={e => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-uppercase text-muted">Logo</label>
                        <input type="file" className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} accept="image/*" onChange={e => setLogoFile(e.target.files[0])} />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold text-uppercase text-muted">Description</label>
                        <textarea className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} rows="3" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-uppercase text-muted">Website</label>
                        <input type="text" className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} onChange={e => setFormData({ ...formData, website: e.target.value })} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-uppercase text-muted">Program Type</label>
                        <select className="form-select p-3 rounded-3" style={{ background: "#f9fafb" }} onChange={e => setFormData({ ...formData, programType: e.target.value })}>
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="col-12 mt-4 pt-2 border-top">
                        <h6 className="fw-bold mb-3">Bounty Range (₹)</h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Min</label>
                            <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, min: e.target.value } })} />
                          </div>
                          <div className="col-md-6">
                            <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Max</label>
                            <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, bountyRange: { ...formData.bountyRange, max: e.target.value } })} />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mt-4 pt-2 border-top">
                        <h6 className="fw-bold mb-3">Severity Rewards (₹)</h6>
                        <div className="row g-2">
                          <div className="col-md-3">
                            <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Low</label>
                            <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, low: e.target.value } })} />
                          </div>
                          <div className="col-md-3">
                            <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Medium</label>
                            <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, medium: e.target.value } })} />
                          </div>
                          <div className="col-md-3">
                            <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>High</label>
                            <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, high: e.target.value } })} />
                          </div>
                          <div className="col-md-3">
                            <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Critical</label>
                            <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, severityRewards: { ...formData.severityRewards, critical: e.target.value } })} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mt-4 pt-2 border-top">
                        <label className="form-label small fw-bold text-uppercase text-muted">Response Efficiency (%)</label>
                        <input type="number" className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} min="0" max="100" onChange={e => setFormData({ ...formData, responseEfficiency: e.target.value })} />
                      </div>

                      <div className="col-md-6 mt-4 pt-2 border-top">
                        <label className="form-label small fw-bold text-uppercase text-muted">Eligible Assets (Comma separated)</label>
                        <input type="text" className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} placeholder="example.com, api.example.com" onChange={e => setFormData({ ...formData, assets: e.target.value })} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0 p-4 pt-0">
                    <button type="button" className="btn btn-outline-dark px-4" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-dark px-4" style={{ background: "#111827" }}>Save Company</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="row g-4">
          {companies.map((p) => (
            <div className="col-md-6 col-lg-4" key={p._id}>
              <div
                className="h-100 rounded-4 p-4 d-flex flex-column bg-white shadow-sm"
                style={{ 
                  border: "1px solid #ece6da",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.05)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                  <div 
                    className="rounded-3 overflow-hidden d-flex align-items-center justify-content-center bg-light"
                    style={{ width: "60px", height: "60px", border: "1px solid #f1f5f9" }}
                  >
                    <img
                      src={p.logo || "/default-logo.png"}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "8px"
                      }}
                    />
                  </div>
                  <div className="ms-3">
                    <h5 className="fw-bold mb-0" style={displayFont}>{p.name}</h5>
                    <span className="small text-muted">{p.programType === 'public' ? 'Public Program' : 'Private Program'}</span>
                  </div>
                </div>

                <p className="text-muted small flex-grow-1 mb-3" style={{ lineHeight: "1.7" }}>
                  {p.description?.slice(0, 150) || "Explore this organization's security initiatives and bug bounty opportunities."}
                  {p.description?.length > 150 ? "..." : ""}
                </p>

                <div className="mb-4 d-flex justify-content-between align-items-center p-2 rounded-3" style={{ background: "#f9fafb", border: "1px solid #f1f5f9" }}>
                  <div className="text-center flex-grow-1 border-end">
                    <span className="d-block small text-muted text-uppercase fw-bold" style={{ fontSize: "0.55rem" }}>Min Bounty</span>
                    <span className="fw-bold text-dark">₹{p.bountyRange?.min || 0}</span>
                  </div>
                  <div className="text-center flex-grow-1">
                    <span className="d-block small text-muted text-uppercase fw-bold" style={{ fontSize: "0.55rem" }}>Max Bounty</span>
                    <span className="fw-bold" style={{ color: "#e85d3f" }}>₹{p.bountyRange?.max || 0}</span>
                  </div>
                </div>

                <button
                  className="btn py-2 fw-bold w-100 rounded-3 mt-auto"
                  style={{ background: "#111827", color: "#ffffff" }}
                  onClick={() => navigate(`/company/${p._id}`)}
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-5 rounded-4 bg-white border" style={{ borderStyle: "dashed !important" }}>
            <p className="text-muted mb-0">No companies found. Organizations are constantly joining, check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Company;