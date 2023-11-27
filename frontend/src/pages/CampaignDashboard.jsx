/*
 * Filename: CampaignDashboard.jsx
 * Author: Usu Edeaghe
 * Date: November 20, 2023
 * Description: This file contains the UI implementation of Campaign Dashboard Page
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Campaign from "../components/Campaign"; // Assuming you have a Campaign component
import { useAuthState } from "../context/authContext";

function CampaignDashboard() {
  const { isAuthenticated, user } = useAuthState();
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userFollowed, setUserFollowed] = useState([]);
  const [userDonated, setUserDonated] = useState([]);

  return (
    <div className="container">
      <h2>Campaign Dashboard</h2>
    </div>
  );
}

export default CampaignDashboard;
