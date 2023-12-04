/*
 * Filename: register.test.js
 * Author: Usu Edeaghe
 * Date: November 17, 2023
 * Description: This file contains tests for the Registration feature
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../pages/Register";
import { AuthProvider } from "../context/authContext";
import { act } from "react-dom-testing";
import jwt from "jsonwebtoken";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock Axios post
jest.mock("axios");

// Mock the token generation function
const generateDynamicToken = jest.fn(() =>
  jwt.sign({ userId: 1 }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
);

describe("Register Component", () => {
  it("handles form submission with valid data", async () => {
    // Mock useNavigate
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    // Mock Axios post
    axios.post.mockResolvedValueOnce({
      data: {
        message: "Registration successful",
      },
    });

    // Render the component
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText("First Name"), {
      target: { value: "Testing" },
    });

    fireEvent.change(getByPlaceholderText("Last Name"), {
      target: { value: "Register" },
    });

    fireEvent.change(getByPlaceholderText("Email Address"), {
      target: { value: "test.register@test.com" },
    });

    fireEvent.change(getByPlaceholderText("Confirm Email Address"), {
      target: { value: "test.register@test.com" },
    });

    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "Test@2023" },
    });

    // Submit the form
    fireEvent.click(getByText("Sign Up"));

    // Wait for the API call to be made
    await waitFor(() => {
      // Check if the expected API call is made
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/register",
        {
          confirmEmailAddress: "test.register@test.com",
          emailAddress: "test.register@test.com",
          firstName: "Testing",
          lastName: "Register",
          password: "Test@2023",
        }
      );
    });

    // Check if the user is navigated to the correct page
    expect(mockNavigate).toHaveBeenCalledWith("/discovery");
  });

  it("displays an error message for password criteria not met", async () => {
    // Render the component
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

    // Simulate user input with an invalid password
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "invalidpassword" },
    });

    // Submit the form
    fireEvent.click(getByText("Sign Up"));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(
        getByText(
          "Your password must have at least: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number."
        )
      ).toBeInTheDocument();
    });
  });
});
