import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/authContext";

function Header() {
  const { isAuthenticated, user } = useAuthState();
  const authDispatch = useAuthDispatch();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark" id="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/discovery" id="header-text">
            Crowdfunding Platform
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav variant="pills" className="me-auto">
              <Nav.Link as={NavLink} to="/search" id="nav-item">
                <FaSearch />
              </Nav.Link>
              <Nav.Link as={NavLink} to="/discovery" id="nav-item">
                Discovery
              </Nav.Link>
              {/* Start a Campaign */}
              <Nav.Link as={NavLink} to="/start-fundraiser" id="nav-item">
                Start a Campaign
              </Nav.Link>
              {/* My Campaigns, Edit Profile, Logout */}
              {isAuthenticated && (
                <NavDropdown title={user.username} id="nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/campaigns">
                    My Campaigns
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/edit-profile">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {/* Login */}
              {!isAuthenticated && (
                <Nav.Link as={NavLink} to="/login" id="nav-item">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
