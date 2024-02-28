import React, { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { BsPersonFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAxiosInstance from "../axiosInstance";
import { useAuthDispatch, useAuthState } from "../context/authContext";

function Header() {
  const { isAuthenticated, user } = useAuthState();
  const authDispatch = useAuthDispatch();
  const axiosInstance = useAxiosInstance();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/user/details");
      setUserDetails(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.log("Error fetching User Details", error);
    }
  };

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="un" id="navbar" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/discovery" id="header-text">
            HelpingHand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav variant="underline" className="me-auto justify-content-end">
              <Nav.Link as={NavLink} to="/search" id="nav-item">
                <FaSearch />
              </Nav.Link>
              <Nav.Link as={NavLink} to="/discovery" id="nav-item">
                Discovery
              </Nav.Link>
              {/* Start a Campaign */}
              {/* Will be displayed if the User is Authenticated */}
              {isAuthenticated && (
                <Nav.Link as={NavLink} to="/campaigns" id="nav-item">
                  My Campaigns
                </Nav.Link>
              )}
              {/* Start a Campaign */}
              {isAuthenticated && (
                <Nav.Link as={NavLink} to="/start-fundraiser" id="nav-item">
                  Start a Campaign
                </Nav.Link>
              )}
              {/* My Campaigns, Edit Profile, Logout */}
              {isAuthenticated && (
                <NavDropdown
                  title={<BsPersonFill className="icon-container" />}
                  id="nav-dropdown"
                >
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
            {/* Start a Campaign */}
            {isAuthenticated && (
              <Nav.Link as={NavLink} id="nav-item">
                <b>{`${userDetails.firstName}: Current balance of ${userDetails.coins} FundingCoin`}</b>
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
