import { useEffect, useState } from "react";
import axiosClient from "../../apiClient";

function Program() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/program") 
      .then((res) => setPrograms(res.data))
      .catch((err) => {
        console.error(err);
        setPrograms([]);
      });
  }, []);

  return (
    <div className="row g-2">
      {programs.map((p) => (
        <div className="col-md-3" key={p._id}>
          <div className="card p-3">
            <h5>{p.title}</h5>
            <p>{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Program;