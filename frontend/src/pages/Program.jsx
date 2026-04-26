import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";
import { useAuth } from "../context/AuthContext";

function Program() {
  const [programs, setPrograms] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyId: "",
    rewards: { low: 0, medium: 0, high: 0, critical: 0 },
    status: "ACTIVE"
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const displayFont = {
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "-0.03em",
  };

  async function getPrograms() {
    try {
      const res = await axiosClient.get("/program");
      const data = res.data?.data || res.data || [];
      setPrograms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPrograms([]);
    }
  }

  async function getCompanies() {
    try {
        const res = await axiosClient.get("/company");
        const data = res.data?.data || res.data?.companies || res.data || [];
        const myList = Array.isArray(data) ? data.filter(c => c.owner === user?._id) : [];
        setCompanies(myList);
    } catch (error) {
        console.error(error);
    }
  }

  async function handleAddProgram(e) {
    e.preventDefault();
    try {
        await axiosClient.post("/program", formData);
        setShowForm(false);
        getPrograms();
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to add program");
    }
  }

  useEffect(() => {
    getPrograms();
    if (user && user.role === "COMPANY_ADMIN") {
        getCompanies();
    }
  }, [user]);

  return (
    <div className="py-5" style={{ background: "#f8f5ef", minHeight: "100vh" }}>
      <div className="container">

        {/* HERO SECTION */}
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
                BUG BOUNTY PROGRAMS
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
                Find your next target and earn rewards.
              </h1>

              <p
                className="mb-0 text-muted"
                style={{
                  maxWidth: "700px",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
              >
                Explore active bug bounty programs, review their security policies, and 
                start hunting vulnerabilities to contribute to a safer internet.
              </p>
            </div>
          </div>

          {user && user.role === "COMPANY_ADMIN" && (
            <div className="col-lg-4">
              <div 
                className="rounded-4 p-4 h-100 d-flex flex-column justify-content-center align-items-center text-center"
                style={{ background: "#111827", color: "#ffffff", minHeight: "200px" }}
              >
                <h4 className="fw-bold mb-3" style={displayFont}>Host a Program</h4>
                <p className="small mb-4" style={{ color: "#cbd5e1" }}>Invite researchers to test your assets and strengthen your security posture.</p>
                <button 
                  className="btn btn-light px-4 py-2 fw-bold" 
                  onClick={() => setShowForm(true)}
                  style={{ color: "#111827" }}
                >
                  + Add New Program
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MODAL (Add Program) */}
        {showForm && (
            <div className="modal d-block" style={{ backgroundColor: "rgba(17, 24, 39, 0.8)", backdropFilter: "blur(4px)" }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content rounded-4 border-0 overflow-hidden">
                        <div className="modal-header border-0 p-4 pb-0">
                          <h4 className="fw-bold mb-0" style={displayFont}>Launch New Program</h4>
                          <button className="btn-close" onClick={() => setShowForm(false)}></button>
                        </div>
                        <form onSubmit={handleAddProgram}>
                            <div className="modal-body p-4">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Title</label>
                                        <input type="text" className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Select Company</label>
                                        <select className="form-select p-3 rounded-3" style={{ background: "#f9fafb" }} required onChange={e => setFormData({ ...formData, companyId: e.target.value })}>
                                            <option value="">Choose Company...</option>
                                            {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Description</label>
                                        <textarea className="form-control p-3 rounded-3" style={{ background: "#f9fafb" }} rows="3" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Initial Status</label>
                                        <select className="form-select p-3 rounded-3" style={{ background: "#f9fafb" }} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                            <option value="ACTIVE">Active</option>
                                            <option value="DRAFT">Draft</option>
                                            <option value="PAUSED">Paused</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mt-4 pt-2 border-top">
                                        <h6 className="fw-bold mb-3">Rewards (₹)</h6>
                                        <div className="row g-3">
                                          <div className="col-3">
                                              <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Low</label>
                                              <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, low: e.target.value } })} />
                                          </div>
                                          <div className="col-3">
                                              <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Medium</label>
                                              <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, medium: e.target.value } })} />
                                          </div>
                                          <div className="col-3">
                                              <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>High</label>
                                              <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, high: e.target.value } })} />
                                          </div>
                                          <div className="col-3">
                                              <label className="small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Critical</label>
                                              <input type="number" className="form-control p-2 rounded-3" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, critical: e.target.value } })} />
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-0">
                                <button type="button" className="btn btn-outline-dark px-4" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-dark px-4" style={{ background: "#111827" }}>Create Program</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* PROGRAM CARDS */}
        <div className="row g-4">
          {programs.map((p) => (
            <div className="col-md-6 col-lg-4" key={p._id}>
              <div 
                className="h-100 rounded-4 p-4 d-flex flex-column"
                style={{
                  background: "#ffffff",
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
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold mb-0" style={displayFont}>{p.title}</h5>
                  <span 
                    className="px-2 py-1 rounded-pill small fw-bold text-uppercase"
                    style={{
                      background: p.status === 'ACTIVE' ? "#dcfce7" : "#f1f5f9",
                      color: p.status === 'ACTIVE' ? "#166534" : "#475569",
                      fontSize: "0.65rem",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="text-muted small mb-4 flex-grow-1" style={{ lineHeight: "1.7" }}>
                  {p.description?.slice(0, 120) || "No description available"}...
                </p>

                <div 
                  className="rounded-3 p-3 mb-4"
                  style={{ background: "#f8f5ef", border: "1px solid #ece6da" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>Bounty Range</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <div className="d-flex flex-column">
                      <span className="small text-muted" style={{ fontSize: '0.7rem' }}>Low</span>
                      <span className="fw-bold text-dark">₹{p.rewards?.low || 0}</span>
                    </div>
                    <div className="d-flex flex-column text-end">
                      <span className="small text-muted" style={{ fontSize: '0.7rem' }}>Critical</span>
                      <span className="fw-bold" style={{ color: "#e85d3f" }}>₹{p.rewards?.critical || 0}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn py-2 fw-bold w-100 rounded-3 mt-auto"
                  style={{ background: "#111827", color: "#ffffff" }}
                  onClick={() =>
                    navigate("/program-details", { state: { program: p } })
                  }
                >
                  View Program details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {programs.length === 0 && (
          <div className="text-center py-5 rounded-4 bg-white border" style={{ borderStyle: "dashed !important" }}>
            <p className="text-muted mb-0">No active programs found. Check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Program;