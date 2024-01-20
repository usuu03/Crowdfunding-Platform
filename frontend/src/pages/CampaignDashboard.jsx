/*
 * Filename: CampaignDashboard.jsx
 * Author: Usu Edeaghe
 * Date: November 20, 2023
 * Description: This file contains the UI implementation of Campaign Dashboard Page
 */
import React, { useEffect, useState } from "react";
import { Button, Card, Nav, ProgressBar } from "react-bootstrap";

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
      console.log(response.data);
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
    <div className="container" style={{ marginTop: "10%" }}>
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
              userCampaigns.map((campaign) => (
                <Card border="light" id={campaign.campaignID}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:4000/uploads/${campaign.posterImage}`}
                  />

                  <Card.Body id={`campaign-${campaign.campaignID}`}>
                    <Card.Title>{campaign.campaignTitle}</Card.Title>

                    <Card.Text>
                      Raised: ${campaign.currentAmount} of ${campaign.goal}
                    </Card.Text>

                    {/* Progress Bar */}
                    <ProgressBar
                      now={(campaign.currentAmount / campaign.goal) * 100}
                      label={`${Math.round(
                        (campaign.currentAmount / campaign.goal) * 100
                      )}%`}
                    />
                  </Card.Body>
                </Card>
              ))}

            {selectedTab === "Donated" &&
              userDonated.map((campaign) => (
                <Card border="light" id={campaign.campaignID}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:4000/uploads/${campaign.posterImage}`}
                  />

                  <Card.Body id={`campaign-${campaign.campaignID}`}>
                    <Card.Title>{campaign.campaignTitle}</Card.Title>
                    <Card.Text>
                      Raised: ${campaign.currentAmount} of ${campaign.goal}
                    </Card.Text>

                    {/* Progress Bar */}
                    <ProgressBar
                      now={(campaign.currentAmount / campaign.goal) * 100}
                      label={`${Math.round(
                        (campaign.currentAmount / campaign.goal) * 100
                      )}%`}
                    />
                  </Card.Body>
                </Card>
              ))}

            {selectedTab === "Following" &&
              userFollowed.map((campaign) => (
                <Card border="light" id={campaign.campaignID}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:4000/uploads/${campaign.posterImage}`}
                  />

                  <Card.Body id={`campaign-${campaign.campaignID}`}>
                    <Card.Title>{campaign.campaignTitle}</Card.Title>

                    <Card.Text>
                      Raised: ${campaign.currentAmount} of ${campaign.goal}
                    </Card.Text>

                    {/* Progress Bar */}
                    <ProgressBar
                      now={(campaign.currentAmount / campaign.goal) * 100}
                      label={`${Math.round(
                        (campaign.currentAmount / campaign.goal) * 100
                      )}%`}
                    />
                  </Card.Body>
                </Card>
              ))}

            {userCampaigns.length === 0 && selectedTab === "Started" && (
              <div className="button-container">
                <Button
                  className="btn btn-warning"
                  onClick={() => {
                    navigate("/start-fundraiser");
                  }}
                >
                  Start a Fundraiser
                </Button>
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
              <div className="btn-container">
                <h4>No Followed Campaigns</h4>
                <Button variant="warning" size="lg">
                  Follow a Fundraiser
                </Button>
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
