import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function PaymentForm() {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const { id: campaignID } = useParams();
  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
  };
  return (
    <Container>
      <div className="payment">
        <h2>Hello there!</h2>
        <h6>How much would you like to donate?</h6>
        <div className="payment-form">
          <Form>
            {/* Amount Options */}
            <div className="amount-options">
              <Button
                id="amount-btn"
                variant={selectedAmount === 25 ? "primary" : "outline-primary"}
                onClick={() => handleAmountClick(25)}
              >
                £25
              </Button>
              <Button
                id="amount-btn"
                variant={selectedAmount === 50 ? "primary" : "outline-primary"}
                onClick={() => handleAmountClick(50)}
              >
                £50
              </Button>
              <Button
                id="amount-btn"
                variant={selectedAmount === 100 ? "primary" : "outline-primary"}
                onClick={() => handleAmountClick(100)}
              >
                £100
              </Button>
              <Button
                id="amount-btn"
                variant={selectedAmount === 250 ? "primary" : "outline-primary"}
                onClick={() => handleAmountClick(250)}
              >
                £250
              </Button>
              <Button
                id="amount-btn"
                variant={selectedAmount === 500 ? "primary" : "outline-primary"}
                onClick={() => handleAmountClick(500)}
              >
                £500
              </Button>
              <Button
                id="amount-btn"
                variant={
                  selectedAmount === 1000 ? "primary" : "outline-primary"
                }
                onClick={() => handleAmountClick(1000)}
              >
                £1000
              </Button>
            </div>

            <hr />
            <div className="credit-information">
              <h6>Personal Info</h6>
              <div className="name-email">
                <div className="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    required
                    className="form-item"
                  />
                </div>

                <div className="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="form-item"
                    required
                  />
                </div>
              </div>
              <div className="address-door">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123, Kingston Streets"
                  required
                  className="form-item"
                />
                <Form.Label>Apt/Door</Form.Label>
                <Form.Control type="text" placeholder="4A" required />
              </div>

              <Button variant="outline-primary">Make a Donation</Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
