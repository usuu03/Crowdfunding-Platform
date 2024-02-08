import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Button,
  Modal,
  Container,
  Image,
  Col,
  Row,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  

  return (
    <div className="home-page">
      <div className="title">
        <h1>Welcome to the Helping Hand Platform!</h1>
        <h2>It takes a little to help a lot!</h2>

        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="primary" onClick={handleShow}>
              Learn More
            </Button>
          </Col>
        </Row>
      </div>

      <div className="image">
        <Container>
          <Image src="/Screenshot 2024-02-07 at 16.28.01.png" rounded />
        </Container>
      </div>

      <div className="latest-campaigns">
        
      </div>

      <div className="home-popup">
        <Modal show={showModal} onHide={handleClose}>
          {" "}
          {/* Corrected props passed to Modal */}
          <Modal.Header closeButton>
            <Modal.Title>Learn More</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            On this home page you are able to navigate through the different
            pages via, the use of the navigation bar at the top of the page.
            This allows for users to seamlessly cycle through the different
            functions of the site. Such as Login, the search feature and page
            discovery. All form one centralised point.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Footer */}
      <footer>
        <nav>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>
        <p>&copy; 2024 Helping Hand</p>
      </footer>
    </div>
  );
}

export default HomePage;
