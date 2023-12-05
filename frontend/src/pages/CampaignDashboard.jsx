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

function CampaignDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const axiosInstance = useAxiosInstance();
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userFollowed, setUserFollowed] = useState([]);
  const [userDonated, setUserDonated] = useState([]);

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

  return (
    <div className="container">
      {isAuthenticated ? (
        <>
          <h2 className="register-title">Campaign Dashboard</h2>

          <div className="btn-section">
            <button
              id="btn"
              className="btn btn-primary"
              onClick={() => {
                fetchUserCreatedCampaigns();
              }}
            >
              Started
            </button>
            <button
              id="btn"
              className="btn btn-info"
              onClick={() => {
                fetchUserDonatedCampaigns();
              }}
            >
              Donated
            </button>
            <button
              id="btn"
              className="btn btn-success"
              onClick={() => {
                fetchUserFollowedCampaigns();
              }}
            >
              Following
            </button>
          </div>

          <hr />

          <div className="campaign-container">
            {userCampaigns.map((campaign) => (
              <Campaign
                key={campaign.campaignID}
                id={campaign.campaignID}
                title={campaign.campaignTitle}
                currentAmount={campaign.currentAmount}
                goal={campaign.goal}
              />
            ))}

            {userCampaigns.length === 0 && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate("/create-fundraiser");
                }}
              >
                Start a Fundraiser
              </button>
            )}

            {userDonated.length === 0 && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate("/donate-to-campaigns");
                }}
              >
                Donate to Campaigns
              </button>
            )}

            {userFollowed.length === 0 && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate("/follow-campaigns");
                }}
              >
                Follow Campaigns
              </button>
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
