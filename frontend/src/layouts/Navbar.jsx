import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
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

          {/* Right side buttons */}
          <div className="d-flex gap-3 mt-3 mt-lg-0">
            <Link className="btn btn-outline-dark" to="/login">
              Login
            </Link>
            <Link className="btn btn-dark" to="/register">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
