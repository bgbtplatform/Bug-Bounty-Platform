import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../apiClient";

function CompanyPrograms() {
  const { id } = useParams();
  const [programs, setPrograms] = useState([]);

  async function getPrograms() {
    try {
      let res = await axiosClient.get(`/programs/company/${id}`);
      setPrograms(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPrograms();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3>Programs</h3>
      <hr />

      {programs.length === 0 ? (
        <p>No programs available</p>
      ) : (
        <ul>
          {programs.map((p) => (
            <li key={p._id}>• {p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompanyPrograms;