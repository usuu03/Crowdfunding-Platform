import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Col, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../context/authContext";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    confirmEmailAddress: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    emailMatch: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email addresses match
    if (userData.emailAddress !== userData.confirmEmailAddress) {
      setErrors({
        ...errors,
        emailMatch: "Email addresses do not match",
        password: "", // Clear password error
      });
      return;
    }

    // Check if the password meets the criteria
    if (!isPasswordValid(userData.password)) {
      setErrors({
        ...errors,
        password:
          "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.",
        emailMatch: "", // Clear email match error
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        userData
      );

      dispatch({ type: "LOGIN", payload: response.data });
      navigate("/discovery");
    } catch (error) {
      console.error("Registration error:", error);

      // Handle error response and set error state
      if (error.response && error.response.data) {
        setErrors({ password: error.response.data.message });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Clear the error when the user starts typing
    setErrors({});
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      <div className="register">
        <h2 className="">Create an Account</h2>

        <div className="info-container">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>

        <h6>Your Account Details</h6>
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Col>
              <Form.Control
                placeholder="First Name"
                size="md"
                name="firstName"
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last Name"
                size="md"
                name="lastName"
                onChange={handleInputChange}
              />
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email Address"
              size="md"
              name="emailAddress"
              onChange={handleInputChange}
            />
            <Form.Control
              placeholder="Confirm Email Address"
              size="md"
              name="confirmEmailAddress"
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="*******"
              size="md"
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </InputGroup>
          <Form.Text
            id="passwordHelpBlock"
            muted
            style={{ marginBottom: "10px" }}
          >
            {"  "}
          </Form.Text>{" "}
          {"    "}
          <Button
            variant="outline-primary"
            type="submit"
            size="md"
            id="register-btn"
            block
          >
            Sign Up
          </Button>
        </form>
      </div>

      {/* Displaying errors if User fails to register */}
      {errors.password && (
        <div className="">
          <div className="alert">
            <Alert variant="danger">{errors.password}</Alert>
          </div>
        </div>
      )}

      {errors.emailMatch && (
        <div className="">
          <div className="alert">
            <Alert variant="danger">{errors.emailMatch}</Alert>
          </div>
        </div>
      )}
    </>
  );
}
