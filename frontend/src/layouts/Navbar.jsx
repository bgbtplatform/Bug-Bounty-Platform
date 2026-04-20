import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          BugSeek
        </Link>

        {/* Toggle button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Center links */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/programs">Programs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">Companies</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">Resources</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">About</NavLink>
            </li>
          </ul>

          {/* Right side buttons */}
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/register">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;