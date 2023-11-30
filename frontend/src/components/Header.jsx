import React from "react";
import { Link } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../context/authContext";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const { isAuthenticated, user } = useAuthState();
  const authDispatch = useAuthDispatch();

  const handleLogout = () => {
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
            <li className="nav-item">
              <Link to="/search" className="nav-link" id="nav-item">
                <FaSearch />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/discovery" className="nav-link" id="nav-item">
                Discovery
              </Link>
            </li>
            {/* //Having trouble here */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" href="#">
                  User Name
                </Link>
                <Link className="dropdown-item" href="#">
                  My Campaigns
                </Link>
                <Link className="dropdown-item" to="">
                  My Donations
                </Link>
                <a className="dropdown-item" href="#">
                  Followed
                </a>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/start-campaign" className="nav-link" id="nav-item">
                Start a Campaign
              </Link>
            </li>
            {/* //end */}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/edit-profile" className="nav-link" id="nav-item">
                    Edit Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link"
                    id="nav-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link to="/login" className="nav-link" id="nav-item">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
