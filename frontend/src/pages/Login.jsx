/*
 * Filename: Login.jsx
 * Author: Usu Edeaghe
 * Date: October 17, 2023
 * Description: This file contains the UI implementation of Login Page
 */
import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../context/authContext";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const [userData, setUserData] = useState({
    emailAddress: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        userData
      );

      dispatch({ type: "LOGIN", payload: response.data });

      // Redirecting to the Homepage if successfully logged in
      navigate("/discovery");
    } catch (error) {
      console.error("Login Error:", error);
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

  return (
    <Container className="">
      <div className="login">
        <h2 className="" id="">
          Sign in to Crowdfunding Platform
        </h2>
        <p id="text">
          Do not have an account? <Link to="/register">Sign Up</Link>
        </p>
        <Form onSubmit={handleSubmit} className="login-form">
          <div className="login-form">
            <Form.Control
              placeholder="Email Address"
              size="md"
              name="emailAddress"
              id="input"
              onChange={handleInputChange}
            />
            <Form.Control
              placeholder="*******"
              name="password"
              size="md"
              type="password"
              id="input"
              onChange={handleInputChange}
            />
            <Button
              variant="outline-primary"
              name="login-btn"
              type="submit"
              size="md"
              block
              id="input"
            >
              Log In
            </Button>
          </div>
        </Form>
        {/* Display Bootstrap alert for password error */}
        {errors.password && <Alert variant="danger">{errors.password}</Alert>}
      </div>
    </Container>
  );
}
