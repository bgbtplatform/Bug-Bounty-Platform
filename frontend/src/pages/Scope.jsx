import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function Scope() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const program = state?.program;
  const [scopes, setScopes] = useState([]);

  async function getScopes() {
    try {
      const res = await axiosClient.get(`/scope/program/${program._id}`);
      const data = res.data?.data || res.data || [];
      setScopes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setScopes([]);
    }
  }

  useEffect(() => {
    if (program?._id) getScopes();
  }, []);

  if (!program) return null;

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">{program.title} — Scopes</h2>
        <p className="text-muted">
          Assets in scope for this program.
        </p>
      </div>

      {/* SCOPE LIST */}
      {scopes.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {scopes.map((s) => (
            <div key={s._id} className="border rounded p-3 d-flex justify-content-between align-items-center">

              {/* LEFT: BASIC INFO */}
              <div>
                <p className="fw-semibold mb-1">{s.assetName}</p>
                <small className="text-muted">
                  {s.type} &nbsp;·&nbsp; {s.inScope ? "In Scope" : "Out of Scope"} &nbsp;·&nbsp; {s.maxSeverity}
                </small>
              </div>

              {/* RIGHT: BUTTON */}
              <button
                className="btn btn-dark btn-sm"
                onClick={() => navigate("/scope-details", { state: { scope: s, program } })}
              >
                View Details
              </button>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No scopes found for this program.</p>
      )}

      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-dark mt-4"
        onClick={() => navigate("/program-details", { state: { program } })}
      >
        Back to Program
      </button>

    </div>
  );
}

export default Scope;
