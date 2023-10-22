import React from "react";

export default function Header() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
          <div className="header-text">
            <a href="https://google.co.uk" className="navbar-brand mr-10">
              Crowdfunding Platform
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
