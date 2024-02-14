import React from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";

export default function PaymentForm() {
  return (
    <Container>
      <div className="payment">
        <h2>Donate to Campaign</h2>
        <div className="payment-form">
          <Form>
            <Form.Control placeholder="Amount to Donate" type="number" />
            <hr />
            <div className="credit-information">
              <h5>Credit/Debit Information</h5>
              <Form.Control type="text" placeholder="Full Name" required />
              <Form.Control type="email" placeholder="Email Address" />
              <Form.Control type="text" placeholder="Card Number" required />
              <InputGroup>
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
