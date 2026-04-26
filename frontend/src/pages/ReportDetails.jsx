import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await axiosClient.get(`/reports/${id}`);
        setReport(res.data?.data || res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  if (loading) return <div className="p-5 text-center">Loading report details...</div>;
  if (!report) return <div className="p-5 text-center text-danger">Report not found.</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="card-header bg-dark text-white p-4 d-flex justify-content-between align-items-center">
            <h3 className="mb-0">{report.title}</h3>
            <span className={`badge py-2 px-3 ${report.status === 'RESOLVED' ? 'bg-success' : 'bg-info'}`}>
                {report.status}
            </span>
        </div>
        <div className="card-body p-4">
            <div className="row g-4">
                <div className="col-md-8">
                    <h4>Description</h4>
                    <pre className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>{report.description}</pre>

                    <h4 className="mt-4">Impact</h4>
                    <p className="bg-light p-3 rounded">{report.impact}</p>

                    {report.attachements && (
                        <div className="mt-4">
                            <h4>Attachments</h4>
                            <div className="border rounded p-2 d-inline-block">
                                {report.attachements.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                    <img src={report.attachements} alt="PoC" style={{ maxWidth: "100%", maxHeight: "400px" }} />
                                ) : (
                                    <a href={report.attachements} target="_blank" rel="noreferrer" className="btn btn-link">View Proof of Concept</a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="bg-white border rounded p-3 shadow-sm">
                        <h5>Report Info</h5>
                        <ul className="list-unstyled mb-0 mt-3">
                            <li className="mb-2"><strong>Severity:</strong> <span className="text-capitalize">{report.severity}</span></li>
                            <li className="mb-2"><strong>Submitted:</strong> {new Date(report.createdAt).toLocaleDateString()}</li>
                            <li className="mb-2"><strong>Last Updated:</strong> {new Date(report.updatedAt).toLocaleDateString()}</li>
                        </ul>
                        <hr />
                        <div className="d-grid gap-2">
                            <button className="btn btn-outline-primary" onClick={() => navigate(`/reports/edit/${report._id}`)}>Edit Report</button>
                            <button className="btn btn-outline-dark" onClick={() => navigate("/my-reports")}>Back to Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetails;
