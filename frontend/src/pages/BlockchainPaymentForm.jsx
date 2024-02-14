import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function BlockchainPaymentForm() {
  return (
    <Container>
      <div className="blockchain">
        <h2>Pay by Blockchain</h2>
        <Form>
          <Form.Control
            type="text"
            placeholder="Enter Wallet Address"
            required
          />
          <Form.Control type="text" placeholder="Enter Amount" required />
          <Form.Select placeholder="Select the Cryptocurrency">
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETC)</option>
            <option value="LTC">Litecoin (LTC)</option>
            <option value="ADA">Cardano (ADA)</option>
            <option value="SOL">Solana (SOL)</option>
            <option value="LTC">Dogecoin (DOGE)</option>
          </Form.Select>
          <Button variant="outline-primary">Donate with Blockchain</Button>
        </Form>
      </div>
    </Container>
  );
}
