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
    <Container className="mt-5">
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Sign in to Crowdfunding Platform
        </h2>
        <p>
          Do not have an account? <Link to="/register">Sign Up</Link>
        </p>
        <div className="form-container" id="form-div">
          <h6>Your Account Details</h6>
          {/* Display Bootstrap alert for password error */}
          {errors.password && <Alert variant="danger">{errors.password}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="form-elements-div">
              <div className="mb-3">
                <Form.Control
                  placeholder="Email Address"
                  name="emailAddress"
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <Form.Control
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                id="login-btn"
                className="btn btn-dark"
                block
              >
                Sign In
              </Button>{" "}
              <p className="mt-2">
                <a href="#">Forgot your password?</a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
