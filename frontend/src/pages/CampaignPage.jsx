import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { FaHeart, FaDollarSign, FaHandHoldingHeart } from "react-icons/fa";

function CampaignPage() {
  const { id: campaignID } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donationData, setDonationData] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [campaignImage, setCampaignImage] = useState(null);
  //const chartContainer = useRef(null);

  useEffect(() => {
    console.log("Campaign ID:", campaignID);
    axios
      .get(`http://localhost:4000/api/campaigns/${campaignID}`)
      .then((response) => {
        setCampaign(response.data);
        //setCampaignImage(response.data.posterImage);
        //console.log("Campaign Image URL:", response.data.posterImage);
      })
      .catch((error) => console.error("Error fetching campaign data:", error));
  }, [campaignID]);



  const handleFollowClick = () => {
    axios
      .post(`http://localhost:4000/api/campaigns/follow/${campaignID}`)
      .then((response) => {
        console.log(response.data.message);
        setFollowerCount((prevCount) => prevCount + 1);
        setShowConfirmation(true);
      })
      .catch((error) => {
        console.error("Error following the campaign:", error);
      });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };


  const progressWidth = (currentAmount, goal) =>
    (currentAmount / goal) * 100 + "%";

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to add suffix to day part of the date
  const addSuffixToDay = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  const formatDayWithSuffix = (dateString) => {
    const date = new Date(dateString);
    const dayWithSuffix = addSuffixToDay(date.getDate());
    return `${date.toLocaleDateString('en-US', { month: 'long' })} ${dayWithSuffix}, ${date.getFullYear()}`;
  };

  // Determine the status message and style based on the campaign status
  const statusMessage =
    campaign?.status === "ongoing"
      ? "Campaign is Ongoing"
      : "Campaign is Pending";
  const statusStyle =
    campaign?.status === "ongoing" ? { color: "green" } : { color: "orange" };

  return (
    <div className="campaignPage">
      {campaign && (
        <div>
          <div className="campaign-title">
            <h1>{campaign.campaignTitle}</h1>
            <h2> Fundraising Campaign created by TBD <BsDot /> {campaign.category} <BsDot /> {campaign.country}</h2>
            <div className="status-bar" style={statusStyle}>
              {statusMessage}
            </div>
          </div>
          <div className="image-container">
            <img src={campaignImage} alt={campaign.campaignTitle} />
          </div>
          <div className="followers">
            <h1 ><FaHandHoldingHeart /> {campaign.followerCount} Followers</h1>
          </div>

          <div className="sidebar">
            <div className="amount-raised">
              <p>
                Raised: <span className="current-amount"><FaDollarSign />{campaign.currentAmount}</span> of <FaDollarSign />{campaign.goal}
              </p>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: progressWidth(campaign.currentAmount, campaign.goal),
                }}
              ></div>
            </div>
            <button className="donate-button">DONATE</button>
            <h1 onClick={handleFollowClick} style={{ cursor: "pointer" }}><FaHeart /> Follow this Campaign</h1>
          </div>

          <div className="info-container">
            <div className="campaign-info">

              <p>
                This Campaign was created on: {formatDayWithSuffix(campaign.creationDate)}
                <br />
                This Campaign has been active since: {formatDayWithSuffix(campaign.startDate)}
                <br />
                This Campaign ends on: {formatDayWithSuffix(campaign.endDate)}
              </p>
            </div>
            <div className="campaign-description">
              <h1>Campaign Description</h1>
              <p>

                {campaign.campaignDescription}

              </p>
            </div>
          </div>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="confirmation-overlay">
              <div className="confirmation-modal">
                <p>You have successfully followed the campaign!</p>
                <button onClick={handleCloseConfirmation}>Close</button>
              </div>
            </div>
          )}


        </div>
      )}
    </div>
  );
}

export default CampaignPage;