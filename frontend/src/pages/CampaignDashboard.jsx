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
        {/* Use a conditional rendering based on the selected category */}
        {userCampaigns.map((campaign) => (
          <Campaign
            key={campaign.campaignID}
            id={campaign.campaignID}
            title={campaign.campaignTitle}
            currentAmount={campaign.currentAmount}
            goal={campaign.goal}
          />
        ))}

        {/* Conditionally render a button if no campaigns are available */}
        {userCampaigns.length === 0 && (
          <button
            className="btn btn-warning"
            onClick={() => {
              // Handle the click for starting a fundraiser
              navigate("/create-fundraiser");
            }}
          >
            Start a Fundraiser
          </button>
        )}

        {/* Conditionally render a button if no donated campaigns are available */}
        {userDonated.length === 0 && (
          <button
            className="btn btn-warning"
            onClick={() => {
              // Handle the click for donating to campaigns
              navigate("/donate-to-campaigns");
            }}
          >
            Donate to Campaigns
          </button>
        )}

        {/* Conditionally render a button if no followed campaigns are available */}
        {userFollowed.length === 0 && (
          <button
            className="btn btn-warning"
            onClick={() => {
              // Handle the click for following campaigns
              navigate("/follow-campaigns");
            }}
          >
            Follow Campaigns
          </button>
        )}
      </div>
    </div>
  );
}

export default CampaignDashboard;
