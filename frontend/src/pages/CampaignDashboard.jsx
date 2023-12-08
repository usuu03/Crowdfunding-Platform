/*
 * Filename: CampaignDashboard.jsx
 * Author: Usu Edeaghe
 * Date: November 20, 2023
 * Description: This file contains the UI implementation of Campaign Dashboard Page
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Campaign from "../components/Campaign";
import { useAuthState } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import useAxiosInstance from "../axiosInstance";

import "../styles/dashboard.css";

// ... (existing imports)

function CampaignDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const axiosInstance = useAxiosInstance();
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

  // const deleteCampaign = async (campaignID) => {
  //   console.log("Deleting campaign with ID:", campaignID);

  //   // Display a confirmation dialog
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this campaign?"
  //   );

  //   if (confirmDelete) {
  //     try {
  //       // Make the delete request using the campaignID
  //       await axiosInstance.delete(`/api/campaigns/delete/${campaignID}`);
  //       console.log("Campaign deleted successfully.");

  //       // Fetch updated campaigns after deletion
  //       fetchUserCreatedCampaigns();
  //     } catch (error) {
  //       console.error("Error deleting the Campaign:", error);
  //     }
  //   }
  // };

  return (
    <div className="container">
      {isAuthenticated ? (
        <>
          <h2 className="register-title">Campaign Dashboard</h2>

          <div className="btn-section">
            <button
              id="btn"
              className={`btn btn-primary ${
                selectedTab === "Started" ? "active" : ""
              }`}
              onClick={() => {
                fetchUserCreatedCampaigns();
                handleTabChange("Started");
              }}
            >
              Started
            </button>
            <button
              id="btn"
              className={`btn btn-info ${
                selectedTab === "Donated" ? "active" : ""
              }`}
              onClick={() => {
                fetchUserDonatedCampaigns();
                handleTabChange("Donated");
              }}
            >
              Donated
            </button>
            <button
              id="btn"
              className={`btn btn-success ${
                selectedTab === "Following" ? "active" : ""
              }`}
              onClick={() => {
                fetchUserFollowedCampaigns();
                handleTabChange("Following");
              }}
            >
              Following
            </button>
          </div>

          <hr />

          <div className="campaign-container">
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
