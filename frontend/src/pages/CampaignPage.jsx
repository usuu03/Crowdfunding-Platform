import axios from "axios";
import React, { useState, useEffect } from "react";
import useAxiosInstance from "../axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Tab, Tabs, Form, Modal, ProgressBar, Badge, ListGroup } from "react-bootstrap";
import { BsDot } from "react-icons/bs";
import { FaHeart, FaPoundSign, FaHandHoldingHeart, FaShareAlt } from "react-icons/fa";


function CampaignPage() {
  const { id: campaignID } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const [campaign, setCampaign] = useState(null);
  const [donationData, setDonationData] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [creatorName, setCreatorName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedCampaignTitle, setEditedCampaignTitle] = useState("");
  const [editedCampaignDescription, setEditedCampaignDescription] = useState("");
  const [editedCampaignGoal, setEditedCampaignGoal] = useState("");
  const [editedCampaignCategory, setEditedCampaignCategory] = useState("");
  const [editedCampaignCountry, setEditedCampaignCountry] = useState("");
  const [editedCampaignStartDate, setEditedCampaignStartDate] = useState("");
  const [editedCampaignEndDate, setEditedCampaignEndDate] = useState("");
  const [editedCampaignStatus, setEditedCampaignStatus] = useState("");
  const campaignStatusOptions = ['Ongoing', 'Finished', 'Draft'];
  const [editedCampaignImage, setEditedCampaignImage] = useState(null);



  useEffect(() => {
    console.log("Campaign ID:", campaignID);
    axios
      .get(`http://localhost:4000/api/campaigns/${campaignID}`)
      .then((response) => {
        setCampaign(response.data);
        setEditedCampaignTitle(response.data.campaignTitle);
        setEditedCampaignDescription(response.data.campaignDescription);
        setEditedCampaignGoal(response.data.goal);
        setEditedCampaignCategory(response.data.category);
        setEditedCampaignCountry(response.data.country);
        setEditedCampaignStartDate(response.data.startDate);
        setEditedCampaignEndDate(response.data.endDate);
        setEditedCampaignStatus(response.data.campaignStatus);
        setEditedCampaignImage(response.data.posterImage);

        // Call the function to fetch creator's name
        fetchCreatorName();
      })
      .catch((error) => console.error("Error fetching campaign data:", error));
  }, [campaignID]);


  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Send PUT request to update campaign details in the database
    axios
      .put(`http://localhost:4000/api/campaigns/edit/${campaignID}`, {
        campaignTitle: editedCampaignTitle,
        campaignDescription: editedCampaignDescription,
        goal: editedCampaignGoal,
        category: editedCampaignCategory,
        country: editedCampaignCountry,
        startDate: editedCampaignStartDate,
        endDate: editedCampaignEndDate,
        campaignStatus: editedCampaignStatus,
        posterImage: editedCampaignImage
      })
      .then((response) => {
        console.log("Campaign details updated successfully:", response.data);
        setShowModal(false);
        // Fetch the updated campaign details from the server
        axios
          .get(`http://localhost:4000/api/campaigns/${campaignID}`)
          .then((response) => {
            // Update the local state with the new campaign data
            setCampaign(response.data);
            setShowConfirmation(true);
          })
          .catch((error) => {
            console.error("Error fetching updated campaign details:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating campaign details:", error);
      });
  };


  const fetchCreatorName = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:4000/api/user/name/${campaignID}`);
      setCreatorName(response.data[0]);
      console.log("Creator Name:", response.data[0]); // Add this line to log the creatorName
    } catch (error) {
      console.log("Error fetching Creator Name", error);
    }
  };


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

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = () => {
    // Send DELETE request to delete the campaign from the database
    axios
      .delete(`http://localhost:4000/api/campaigns/delete/${campaignID}`)
      .then((response) => {
        console.log("Campaign deleted successfully:", response.data);
        // Redirect to a different page after successful deletion
        navigate("/discovery");
      })
      .catch((error) => {
        console.error("Error deleting campaign:", error);
      });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
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

  return (
    <div className="campaignPage">
      {campaign && (
        <div>

          <div className="d-flex" style={{ marginTop: '75px', marginLeft: '1300px' }}>
            <Button variant="primary" onClick={handleEditClick}>
              Edit Campaign
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Campaign Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Campaign Name</Form.Label>
                    <Form.Control
                      type="name"
                      value={editedCampaignTitle}
                      onChange={(e) => setEditedCampaignTitle(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Campaign Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={editedCampaignDescription}
                      onChange={(e) => setEditedCampaignDescription(e.target.value)}
                      rows={5}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Campaign Status</Form.Label>
                    <Form.Select
                      aria-label="Select Status"
                      value={editedCampaignStatus}
                      onChange={(e) => setEditedCampaignStatus(e.target.value)}
                    >
                      <option value="">Choose Status</option>
                      {campaignStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Campaign Goal</Form.Label>
                    <Form.Control
                      type="number"
                      value={editedCampaignGoal}
                      onChange={(e) => setEditedCampaignGoal(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Campaign Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedCampaignCategory}
                      onChange={(e) => setEditedCampaignCategory(e.target.value)}
                    />
                  </Form.Group>

                  <div className="dates">
                    <div className="start-date">
                      <Form.Label>Start date </Form.Label>
                      <Form.Control
                        type="date"
                        value={editedCampaignStartDate}
                        onChange={(e) => setEditedCampaignStartDate(e.target.value)}
                      />
                    </div>

                    <div className="start-date">
                      <Form.Label>End date </Form.Label>
                      <Form.Control
                        type="date"
                        value={editedCampaignEndDate}
                        onChange={(e) => setEditedCampaignEndDate(e.target.value)}
                      />
                    </div>

                  </div>


                  <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Campaign Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setEditedCampaignImage(e.target.files[0])}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="d-flex" style={{ marginTop: '-37px', marginLeft: '1450px' }}>
            <Button variant="danger" onClick={handleDeleteClick}>Delete Campaign</Button>
            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteConfirmation} onHide={handleCloseDeleteConfirmation}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Campaign</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this campaign?

                You will lose all progress for this campaign and this action cannot be taken back!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteConfirmation}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirmation}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="campaign-title">
            <h1>{campaign.campaignTitle}</h1>
            <h2> Fundraising Campaign created by {creatorName && `${creatorName.firstName} ${creatorName.lastName}`} <BsDot /> {campaign.category} <BsDot /> {campaign.country}</h2>
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
                  <Card style={{ width: '700px', height: '500px' }}>
                    <Card.Img variant="top" img src={`http://localhost:4000/uploads/${campaign.posterImage}`} alt={campaign.campaignTitle} />
                    <Card.Body>
                      <Card.Title>Key Dates</Card.Title>
                      <Card.Text>
                        <p>
                          This Campaign was created on: {formatDayWithSuffix(campaign.creationDate)}
                          <br />
                          This Campaign has been active since: {formatDayWithSuffix(campaign.startDate)}
                          <br />
                          This Campaign ends on: {formatDayWithSuffix(campaign.endDate)}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="campaign-description">
                  <Card>
                    <Card.Title>
                      Campaign Description
                    </Card.Title>
                    <Card.Body>
                      {campaign.campaignDescription}
                    </Card.Body>
                  </Card>
                </div>

              </div>

            </Tab>
            <Tab eventKey="donations" title="Donations" >
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
                Raised: <span className="current-amount"><FaPoundSign />{campaign.currentAmount}</span> <br />
                <span> of <FaPoundSign />{campaign.goal}</span>
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
              <Button variant="primary"><FaShareAlt /> {''} SHARE</Button>
            </div>
            <h1 onClick={handleFollowClick} style={{ cursor: "pointer" }}><FaHeart /> Follow this Campaign</h1>

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
