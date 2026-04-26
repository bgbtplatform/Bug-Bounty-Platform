import { useEffect, useState } from "react";
import axiosClient from "../apiClient";
import { useNavigate } from "react-router-dom";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchMyReports() {
    try {
      const res = await axiosClient.get("/reports/my");
      setReports(res.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this report?")) return;
    try {
      await axiosClient.delete(`/reports/${id}`);
      fetchMyReports();
    } catch (error) {
      alert("Failed to delete report");
    }
  }

  useEffect(() => {
    fetchMyReports();
  }, []);

  if (loading) return <div className="p-5 text-center">Loading your reports...</div>;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-4">My Submissions</h2>
      {reports.length === 0 ? (
        <p className="text-muted">You haven't submitted any reports yet.</p>
      ) : (
        <div className="table-responsive bg-white rounded shadow-sm p-3">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Severity</th>
                <th>Submitted On</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>
                    <span className="fw-semibold text-primary">{r.title}</span>
                  </td>
                  <td>
                    <span className={`badge bg-opacity-10 py-2 px-3 ${r.status === 'NEW' ? 'bg-info text-info' : 'bg-success text-success'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <span className="text-capitalize">{r.severity}</span>
                  </td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <button className="btn btn-primary btn-sm" onClick={() => navigate(`/reports/${r._id}`)}>View</button>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/reports/edit/${r._id}`)}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(r._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyReports;
