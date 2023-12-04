/*
 * Filename: CampaignDashboard.jsx
 * Author: Usu Edeaghe
 * Date: November 20, 2023
 * Description: This file contains the UI implementation of Campaign Dashboard Page
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
// ... (your imports)

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

  useEffect(() => {
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

    if (isAuthenticated) {
      fetchUserCreatedCampaigns();
    }
  }, [isAuthenticated, axiosInstance]);

  return (
    <div className="container">
      <h2 className="register-title">Campaign Dashboard</h2>

      <div className="btn-section">
        <Link id="btn" className="btn btn-success">
          Started
        </Link>
        <Link id="btn" className="btn btn-warning">
          Donated
        </Link>
        <Link id="btn" className="btn btn-danger">
          Following
        </Link>
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
      </div>
    </div>
  );
}

export default CampaignDashboard;
