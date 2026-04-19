import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "#020617",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <div className="container-fluid px-5">

        <Link
          className="d-flex align-items-center text-decoration-none"
          to="/"
        >
          <img
            src={logo}
            alt="BugSeek Logo"
            style={{
              height: "72px",
              width: "72px",
              objectFit: "contain",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              color: "#e5e7eb",
              fontSize: "1.1rem",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            BugSeek
          </span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-4">

            {["/", "/programs", "/about", "/dashboard", "/leaderboard"].map((path, i) => {
              const labels = ["Home", "Programs", "About", "Dashboard", "Leaderboard"];
              return (
                <li className="nav-item" key={i}>
                  <NavLink
                    to={path}
                    className="nav-link"
                    style={({ isActive }) => ({
                      color: isActive ? "#3b82f6" : "#94a3b8",
                      fontSize: "1.1rem",
                      fontWeight: "500",
                    })}
                  >
                    {labels[i]}
                  </NavLink>
                </li>
              );
            })}

          </ul>

          <div className="d-flex gap-3">

            <Link
              to="/login"
              className="btn"
              style={{
                border: "1px solid #1f2937",
                color: "#e5e7eb",
                fontSize: "1.1rem",
                padding: "6px 16px",
                borderRadius: "6px",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn"
              style={{
                background: "#3b82f6",
                color: "#020617",
                fontSize: "1.1rem",
                fontWeight: "600",
                padding: "6px 16px",
                borderRadius: "6px",
              }}
            >
              Sign Up
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;