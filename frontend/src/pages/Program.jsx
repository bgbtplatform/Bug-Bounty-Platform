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
    <div className="container mt-4">

      {/* TOP DESCRIPTION */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
           <h2 className="fw-bold">Bug Bounty Programs</h2>
           <p className="text-muted">
             Browse active bug bounty programs, understand their reward structure,
             and start hunting vulnerabilities to earn rewards and recognition.
           </p>
        </div>
        {user && user.role === "COMPANY_ADMIN" && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Program</button>
        )}
      </div>

      {/* ADD MODAL */}
      {showForm && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Launch New Program</h5>
                        <button className="btn-close" onClick={() => setShowForm(false)}></button>
                      </div>
                      <form onSubmit={handleAddProgram}>
                          <div className="modal-body">
                              <div className="row g-3">
                                  <div className="col-md-6">
                                      <label className="form-label">Title</label>
                                      <input type="text" className="form-control" required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label">Select Company</label>
                                      <select className="form-select" required onChange={e => setFormData({ ...formData, companyId: e.target.value })}>
                                          <option value="">Choose Company...</option>
                                          {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                      </select>
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label">Description</label>
                                      <textarea className="form-control" rows="3" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label">Initial Status</label>
                                      <select className="form-select" onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                          <option value="ACTIVE">Active</option>
                                          <option value="DRAFT">Draft</option>
                                          <option value="PAUSED">Paused</option>
                                      </select>
                                  </div>
                                  <hr />
                                  <h6>Rewards (₹)</h6>
                                  <div className="col-3">
                                      <label className="small">Low</label>
                                      <input type="number" className="form-control" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, low: e.target.value } })} />
                                  </div>
                                  <div className="col-3">
                                      <label className="small">Medium</label>
                                      <input type="number" className="form-control" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, medium: e.target.value } })} />
                                  </div>
                                  <div className="col-3">
                                      <label className="small">High</label>
                                      <input type="number" className="form-control" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, high: e.target.value } })} />
                                  </div>
                                  <div className="col-3">
                                      <label className="small">Critical</label>
                                      <input type="number" className="form-control" onChange={e => setFormData({ ...formData, rewards: { ...formData.rewards, critical: e.target.value } })} />
                                  </div>
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                              <button type="submit" className="btn btn-primary">Create Program</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )}

      {/* CARDS */}
      <div className="row">
        {programs.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{p.title}</h5>
                  <span className={`badge ${p.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                    {p.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="card-text text-muted small">
                  {p.description?.slice(0, 100) || "No description available"}...
                </p>

                {/* REWARDS */}
                <div className="border-top border-bottom py-2 mb-3 small">
                  <div className="d-flex justify-content-between">
                    <span>Low</span>
                    <span className="fw-bold">₹{p.rewards?.low || 0}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Critical</span>
                    <span className="text-danger fw-bold">₹{p.rewards?.critical || 0}</span>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  className="btn btn-dark mt-auto w-100"
                  onClick={() =>
                    navigate("/program-details", { state: { program: p } })
                  }
                >
                  View Details
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {programs.length === 0 && (
        <p className="text-muted">No programs available</p>
      )}
    </div>
  );
}

export default Program;