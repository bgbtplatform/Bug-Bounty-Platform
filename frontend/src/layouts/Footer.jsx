import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">

        <div className="row">

          <div className="col-md-4">
            <h5>BugSeek</h5>
            <p className="text-secondary">
              Platform connecting ethical hackers with companies.
            </p>
          </div>

          <div className="col-md-2">
            <h6>Company</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-secondary text-decoration-none">About</Link></li>
              <li><Link to="/careers" className="text-secondary text-decoration-none">Careers</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li><Link to="/help" className="text-secondary text-decoration-none">Help</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Subscribe</h6>
            <div className="d-flex">
              <input type="email" className="form-control" placeholder="Email" />
              <button className="btn btn-primary ms-2">Go</button>
            </div>
          </div>

        </div>

        <hr />

        <p className="text-center text-secondary mb-0">
          © {new Date().getFullYear()} BugSeek
        </p>

      </div>
    </footer>
  );
};

export default Footer;