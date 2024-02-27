import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  ListGroup,
  ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import { BsDot } from "react-icons/bs";
import { FaHeart, FaPoundSign, FaShareAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../styles/campaign.css";

function CampaignPage() {
  const { id: campaignID } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donationData, setDonationData] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [campaignImage, setCampaignImage] = useState(null);
  const [creatorName, setCreatorName] = useState(null);
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

  // //Function to fetch Campaign Creator Name
  // const fetchCreatorName = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/api/user/name");
  //     setUserDetails(response.data[0]);
  //   } catch (error) {
  //     console.log("Error fetching Campaign Creator Name", error);
  //   }
  // };

  useEffect(() => {
    const fetchCreatorName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/campaign/creator/${campaignID}`
        );
        const { firstName, lastName } = response.data;
        setCreatorName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Error fetching campaign creator name:", error);
      }
    };

    fetchCreatorName();
  }, [campaignID]);

  // // Fetch campaign image
  // useEffect(() => {
  //   if (campaign) {
  //     axios
  //       .get(`http://localhost:4000/api/campaigns/images/${campaign.posterImage}`)
  //       .then((response) => {
  //         setCampaignImage(`data:image/jpeg;base64,${response.data}`);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching campaign image:", error);
  //       });
  //   }
  // }, [campaign]);

  // useEffect(() => {
  //   // Fetch donation data from your server
  //   axios.get("http://localhost:4000/api/campaigns/donations")
  //     .then((response) => {
  //       if (response.data) {
  //         setDonationData(response.data);
  //       } else {
  //         setDonationData([]); // Set an empty array or handle the absence of data appropriately
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching donation data:", error);
  //     });
  // }, []);

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
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to add suffix to day part of the date
  const addSuffixToDay = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formatDayWithSuffix = (dateString) => {
    const date = new Date(dateString);
    const dayWithSuffix = addSuffixToDay(date.getDate());
    return `${date.toLocaleDateString("en-US", {
      month: "long",
    })} ${dayWithSuffix}, ${date.getFullYear()}`;
  };

  return (
    <div className="campaignPage">
      {campaign && (
        <div>
          <div className="campaign-title">
            <h1>{campaign.campaignTitle}</h1>
            <h2>
              {" "}
              Fundraising Campaign created by {creatorName} <BsDot />{" "}
              {campaign.category} <BsDot /> {campaign.country}
            </h2>
            <div className="status-bar">
              <h2> Campaign is {campaign.campaignStatus} </h2>
            </div>
          </div>

          <Tabs
            defaultActiveKey="description"
            id="justify-tab-example"
            className="tabs"
            justify
          >
            <Tab eventKey="description" title="Description">
              {/* <Badge bg="primary" pill> 14 </Badge> */}
              <div className="tab-content">
                <div className="image-container">
                  <Card style={{ width: "700px", height: "400px" }}>
                    <Card.Img
                      variant="top"
                      img
                      src={`http://localhost:4000/uploads/${campaign.posterImage}`}
                      alt={campaign.campaignTitle}
                    />
                    <Card.Body>
                      <Card.Title>Key Dates</Card.Title>
                      <Card.Text>
                        <p>
                          This Campaign was created on:{" "}
                          {formatDayWithSuffix(campaign.creationDate)}
                          <br />
                          This Campaign has been active since:{" "}
                          {formatDayWithSuffix(campaign.startDate)}
                          <br />
                          This Campaign ends on:{" "}
                          {formatDayWithSuffix(campaign.endDate)}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="campaign-description">
                  <Card>
                    <Card.Title>Campaign Description</Card.Title>
                    <Card.Body>{campaign.campaignDescription}</Card.Body>
                  </Card>
                </div>
              </div>
            </Tab>
            <Tab eventKey="donations" title="Donations">
              <div className="tab-content">
                <ListGroup as="ul">
                  <ListGroup.Item as="li" active>
                    Last Donation
                  </ListGroup.Item>
                  <ListGroup.Item as="li">Donation 3</ListGroup.Item>
                  <ListGroup.Item as="li" disabled>
                    Donation 2
                  </ListGroup.Item>
                  <ListGroup.Item as="li">Donation 1</ListGroup.Item>
                </ListGroup>
              </div>
            </Tab>
            <Tab eventKey="followers" title="Followers">
              <div className="tab-content">
                <ListGroup as="ul">
                  <ListGroup.Item as="li" active>
                    Last Follower
                  </ListGroup.Item>
                  <ListGroup.Item as="li">Follower 3</ListGroup.Item>
                  <ListGroup.Item as="li" disabled>
                    Follower 2
                  </ListGroup.Item>
                  <ListGroup.Item as="li">Follower 1</ListGroup.Item>
                </ListGroup>
              </div>
            </Tab>
          </Tabs>

          {/* <div className="followers">
            <h1 ><FaHandHoldingHeart /> {campaign.followerCount} Followers</h1>
          </div> */}

          <div className="sidebar">
            <div className="amount-raised">
              <p>
                Raised:{" "}
                <span className="current-amount">
                  <FaPoundSign />
                  {campaign.currentAmount}
                </span>{" "}
                of <FaPoundSign />
                {campaign.goal}
              </p>
            </div>
            {/* Progress Bar */}
            <ProgressBar
              now={(campaign.currentAmount / campaign.goal) * 100}
              label={`${Math.round(
                (campaign.currentAmount / campaign.goal) * 100
              )}%`}
            />
            <div className="donate-button">
              <Button variant="primary">DONATE NOW</Button>
            </div>
            <div className="share-button">
              <Button variant="primary">
                <FaShareAlt /> {""} SHARE
              </Button>
            </div>
            <h1 onClick={handleFollowClick} style={{ cursor: "pointer" }}>
              <FaHeart /> Follow this Campaign
            </h1>
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
