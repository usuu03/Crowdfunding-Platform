import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Note the addition of 'Routes' here

export default function Header() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
          <div className="header-text">
            <Link to="/login" className="navbar-brand mr-10">
              Crowdfunding Platform
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
