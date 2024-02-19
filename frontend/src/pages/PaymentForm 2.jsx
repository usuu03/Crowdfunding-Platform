import React from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";

export default function PaymentForm() {
  return (
    <Container>
      <div className="payment">
        <h2>Donate to Campaign</h2>
        <div className="payment-form">
          <Form>
            <Form.Control
              placeholder="Amount to Donate"
              type="number"
              className="form-item"
            />
            <hr />
            <div className="credit-information">
              <h5>Credit/Debit Information</h5>
              <Form.Control
                type="text"
                placeholder="Full Name"
                required
                className="form-item"
              />
              <Form.Control
                type="email"
                placeholder="Email Address"
                className="form-item"
                required
              />
              <Form.Control
                type="text"
                placeholder="Card Number"
                required
                className="form-item"
              />
              <InputGroup className="form-item">
                <Form.Control type="text" placeholder="MM/YY" required />
                <Form.Control type="text" placeholder="CVV" required />
              </InputGroup>
              <Button variant="outline-primary">Make a Donation</Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
