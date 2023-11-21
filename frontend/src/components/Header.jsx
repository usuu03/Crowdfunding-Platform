import React from "react";
import { Link } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../context/authContext"; // Import your authentication context and hooks

export default function Header() {
  const { isAuthenticated, user } = useAuthState(); // Get authentication state
  const authDispatch = useAuthDispatch(); // Get authentication dispatch function

  const handleLogout = () => {
    // Dispatch a logout action when the user clicks "Logout"
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <Link to="/discovery" className="navbar-brand" id="header-text">
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
            {/* <li className="nav-item active">
              <Link to="/create-campaign" className="nav-link" id="nav-item">
                Create
              </Link>
            </li> */}

            <li className="nav-item">
              <Link to="/discovery" className="nav-link" id="nav-item">
                Discovery
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/campaigns" className="nav-link" id="nav-item">
                My Campaigns
              </Link>
            </li>

            <li className="nav-item">
              {/* Conditionally render "Login" or "Logout" based on authentication status */}
              {isAuthenticated ? (
                <span className="nav-link" id="nav-item" onClick={handleLogout}>
                  Logout
                </span>
              ) : (
                <Link to="/login" className="nav-link" id="nav-item">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
