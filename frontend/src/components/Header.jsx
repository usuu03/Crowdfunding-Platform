import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <Link to="/" className="navbar-brand" id="header-text">
          Crowdfunding Platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/create-campaign" className="nav-link" id="nav-item">
                Create
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/discovery" className="nav-link" id="nav-item">
                Discovery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" id="nav-item">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
