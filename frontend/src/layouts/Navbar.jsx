import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../apiClient";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      let res = await axiosClient.get("/users/logout");
      console.log(res);
      logout();
      navigate("/");
    } catch (error) {
      console.log(error.response);
      // Still clear client-side state even if server call fails
      logout();
      navigate("/");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="me-2 rounded-circle"
          />
          BugSeek
        </Link>

        {/* Toggle button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Center links */}
          <ul className="navbar-nav mx-auto gap-2 gap-lg-4 fs-5">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold custom-nav-link ${isActive ? "active-link" : "text-dark"}`} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold custom-nav-link ${isActive ? "active-link" : "text-dark"}`} to="/programs">Programs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold custom-nav-link ${isActive ? "active-link" : "text-dark"}`} to="/company">Company</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold custom-nav-link ${isActive ? "active-link" : "text-dark"}`} to="/resources">Resources</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold custom-nav-link ${isActive ? "active-link" : "text-dark"}`} to="/about">About</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {
              user ? (
                <>
                  <span className="fw-semibold text-dark">
                    Hi, {user.username}
                  </span>
                  {user.role === 'HUNTER' && (
                    <Link className="btn btn-outline-dark" to="/my-reports">My Reports</Link>
                  )}
                  <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-dark" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-dark" to="/register">
                    Sign Up
                  </Link>
                </>
              )
            }
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
