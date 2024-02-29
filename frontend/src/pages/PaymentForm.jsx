import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosInstance from "../axiosInstance";
import "../styles/payment.css";

/**
 * PaymentForm component for handling donations.
 * Allows users to select predefined donation amounts or enter a custom amount.
 * @returns JSX element representing the payment form.
 */
export default function PaymentForm() {
  const [campaign, setCampaign] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const axiosInstance = useAxiosInstance();
  const { id: campaignID } = useParams();
  const [anonymous, setAnonymous] = useState("No");
  const navigate = useNavigate();

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

  const handleAnonymousChange = () => {
    // Toggle between "Yes" and "No"
    const newAnonymous = anonymous === "Yes" ? "No" : "Yes";
    setAnonymous(newAnonymous);
  };

  /**
   * Handle click on predefined donation amount button.
   * Updates the selectedAmount state and clears the customAmount.
   * @param {number} amount - The selected donation amount.
   */
  const handleAmountClick = (amount) => {
    setSelectedAmount((prevAmount) => {
      // If the same amount is double-clicked, unselect it
      return prevAmount === amount ? 0 : amount;
    });
    setCustomAmount("");
  };

  /**
   * Handle change in the custom donation amount input field.
   * Updates the customAmount state.
   * @param {Object} e - The event object representing the input change event.
   */
  const handleCustomAmountChange = (e) => {
    const { value } = e.target;
    // Ensure input is a valid number (you can add more validation if needed)
    if (!isNaN(value) && parseInt(value) >= 0) {
      setCustomAmount(value);
      setSelectedAmount(0); // Reset selected amount when custom amount is changed
    }
  };

  /**
   * Handle submission of the donation form.
   * Sends the donation data to the backend for processing.
   * @param {Object} e - The event object representing the form submission event.
   */
  const handleSubmitDonation = async (e) => {
    e.preventDefault();

    try {
      // Determine the amount to donate - can be selected or custom
      const amountToDonate = customAmount
        ? parseInt(customAmount)
        : selectedAmount;

      console.log("Amount to donate:", amountToDonate);
      console.log("Campaign ID:", campaignID);
      console.log("Anonymous:", anonymous);

      // Send a POST request to the backend endpoint with donation data
      const response = await axiosInstance.post(
        `/api/donations/donate/${campaignID}`,
        {
          amount: amountToDonate,
          anonymous: anonymous,
        }
      );

      alert(
        `Thank you, you have successfully donated ${amountToDonate} FundingCoins to the Campaign ${campaign.campaignTitle}`
      );
      console.log("Donation response:", response.data);
      // Redirecting to the Discovery if successfully donated
      navigate("/discovery");
    } catch (error) {
      alert(`Donation Unsuccessful: ${error}`);
      console.error("Error making donation:", error);
    }
  };

  return (
    <Container className="payment">
      <h2>Make a Donation to the {campaign.campaignTitle} Campaign</h2>
      {/* Payment form JSX */}
      <Form onSubmit={handleSubmitDonation}>
        {/* Amount Options */}
        <div className="amount-options">
          {[25, 50, 100, 250, 500, 1000].map((amount) => (
            <Button
              key={amount}
              id="amount-btn"
              variant={
                selectedAmount === amount ? "primary" : "outline-primary"
              }
              onClick={() => handleAmountClick(amount)}
            >
              {amount} FundingCoins
            </Button>
          ))}
        </div>

        {/* Custom Amount Field */}
        <Form.Group controlId="customAmount">
          <Form.Label>Custom Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text>FundingCoins</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
          </InputGroup>
        </Form.Group>

        <hr />
        <div className="credit-information">
          <h6>Personal Info</h6>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Full Name"
              required
              className="form-item"
            />
            <Form.Control
              type="email"
              placeholder="Email"
              className="form-item"
              required
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Address"
              required
              className="form-item"
            />
          </InputGroup>
          <Form.Check
            label="Make an anonymous donation"
            className="form-item"
            type="checkbox"
            checked={anonymous === "Yes"}
            onChange={handleAnonymousChange}
          />
        </div>

        {/* Submit Button */}
        <Button variant="outline-primary" id="submit-btn" type="submit">
          Make a Donation
        </Button>
      </Form>
    </Container>
  );
}
