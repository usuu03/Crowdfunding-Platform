/*
 * Filename: CampaignDashboard.jsx
 * Author: Usu Edeaghe
 * Date: November 20, 2023
 * Description: This file contains the UI implementation of Campaign Dashboard Page
 */
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../axiosInstance";
import { useAuthState } from "../context/authContext";

import "../styles/dashboard.css";

function CampaignDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const axiosInstance = useAxiosInstance();
  const [userDetails, setUserDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userFollowed, setUserFollowed] = useState([]);
  const [userDonated, setUserDonated] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Started"); // Track the selected tab

  // Fetch user campaigns when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserCreatedCampaigns();
      fetchUserDonatedCampaigns();
      fetchUserFollowedCampaigns();
      fetchUserDetails();
      fetchUserStats();
    }
  }, [isAuthenticated]);

  // Function to fetch user campaigns
  const fetchUserCreatedCampaigns = async () => {
    try {
      const response = await axiosInstance.get("/api/campaigns/user");
      setUserCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching user campaigns:", error);
      // Handle error if needed
    }
  };

  // Function to fetch user-donated campaigns
  const fetchUserDonatedCampaigns = async () => {
    try {
      const response = await axiosInstance.get("/api/campaigns/user/donated");
      setUserDonated(response.data);
    } catch (error) {
      console.error("Error fetching user donated campaigns:", error);
      // Handle error if needed
    }
  };

  // Function to fetch user-followed campaigns
  const fetchUserFollowedCampaigns = async () => {
    try {
      const response = await axiosInstance.get("/api/campaigns/user/following");
      setUserFollowed(response.data);
    } catch (error) {
      console.error("Error fetching user followed campaigns:", error);
      // Handle error if needed
    }
  };

  //Function to fetch User Details
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/user/details");
      setUserDetails(response.data[0]);
    } catch (error) {
      console.log("Error fetching User Details", error);
    }
  };

  //Function to fetch the Total Amount the User has donated overall
  const fetchUserStats = async () => {
    try {
      const response = await axiosInstance.get("/api/donations/total");
      console.log(response.data);
      setTotalAmount(response.data);
    } catch (error) {
      console.log("Error fetching the Donation", error);
    }
  };

  const progressWidth = (current, goal) => {
    const progress = (current / goal) * 100;
    return `${progress}%`;
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    // Check authentication status when the component mounts
    if (!isAuthenticated) {
      // Redirect if not logged in
      navigate("/login");
      window.alert(
        "Please Log In to see to view Campaigns you are involved in!"
      );
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      {isAuthenticated ? (
        <>
          <h2 className="register-title">Campaign Dashboard</h2>

          <div>
            <p>
              Welcome to your Dashboard{" "}
              <b>
                {userDetails.firstName} {userDetails.lastName}
              </b>
            </p>
            <p>
              You have donated: <b>£{totalAmount.totalDonationAmount}</b> across
              all the Campaigns you have donated to!{" "}
            </p>
          </div>

          <div className="btn-section">
            <Nav variant="tabs" defaultActiveKey="Started">
              <Nav.Item>
                <Nav.Link
                  eventKey="Started"
                  className={`nav-link ${
                    selectedTab === "Started" ? "active" : ""
                  }`}
                  onClick={() => {
                    fetchUserCreatedCampaigns();
                    handleTabChange("Started");
                  }}
                >
                  Started
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Donated"
                  className={`nav-link ${
                    selectedTab === "Donated" ? "active" : ""
                  }`}
                  onClick={() => {
                    fetchUserDonatedCampaigns();
                    handleTabChange("Donated");
                  }}
                >
                  Donated
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Following"
                  className={`nav-link ${
                    selectedTab === "Following" ? "active" : ""
                  }`}
                  onClick={() => {
                    fetchUserFollowedCampaigns();
                    handleTabChange("Following");
                  }}
                >
                  Following
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="campaign-container" style={{ marginTop: "20px" }}>
            {selectedTab === "Started" &&
              userCampaigns.map((fundraiser) => (
                <div key={fundraiser.campaignID} className="campaign-box">
                  <div className="campaign-box-content">
                    <div className="campaign-image">
                      <img src="image-placeholder.jpg" alt="Campaign Image" />
                    </div>
                    <div id={`campaign-${fundraiser.campaignID}`}>
                      <h3>{fundraiser.campaignTitle}</h3>
                      <p>
                        Raised: ${fundraiser.currentAmount} of $
                        {fundraiser.goal}
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: progressWidth(
                              fundraiser.currentAmount,
                              fundraiser.goal
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {selectedTab === "Donated" &&
              userDonated.map((fundraiser) => (
                <div key={fundraiser.campaignID} className="campaign-box">
                  <div className="campaign-box-content">
                    <div className="campaign-image">
                      <img src="image-placeholder.jpg" alt="Campaign Image" />
                    </div>
                    <div id={`campaign-${fundraiser.campaignID}`}>
                      <h3>{fundraiser.campaignTitle}</h3>
                      <p>
                        Raised: ${fundraiser.currentAmount} of $
                        {fundraiser.goal}
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: progressWidth(
                              fundraiser.currentAmount,
                              fundraiser.goal
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {selectedTab === "Following" &&
              userFollowed.map((fundraiser) => (
                <div key={fundraiser.campaignID} className="campaign-box">
                  <div className="campaign-box-content">
                    <div className="campaign-image">
                      <img src="image-placeholder.jpg" alt="Campaign Image" />
                    </div>
                    <div id={`campaign-${fundraiser.campaignID}`}>
                      <h3>{fundraiser.campaignTitle}</h3>
                      <p>
                        Raised: ${fundraiser.currentAmount} of $
                        {fundraiser.goal}
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: progressWidth(
                              fundraiser.currentAmount,
                              fundraiser.goal
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {userCampaigns.length === 0 && selectedTab === "Started" && (
              <div className="button-container">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    navigate("/start-fundraiser");
                  }}
                >
                  Start a Fundraiser
                </button>
              </div>
            )}

            {userDonated.length === 0 && selectedTab === "Donated" && (
              <div className="button-container">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    navigate("/discovery");
                  }}
                >
                  Donate to Fundraisers
                </button>
              </div>
            )}

            {userFollowed.length === 0 && selectedTab === "Following" && (
              <div className="button-container">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    navigate("/discovery");
                  }}
                >
                  Follow Fundraisers
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Please log in to view your Campaign Dashboard.</p>
      )}
    </div>
  );
}

export default CampaignDashboard;
