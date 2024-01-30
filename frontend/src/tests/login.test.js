/*
 * Filename: login.test.js
 * Author: Usu Edeaghe
 * Date: November 17, 2023
 * Description: This file contains tests for the Login feature
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import axios from "axios";
import jwt from "jsonwebtoken";
import React from "react";
import { act } from "react-dom-testing";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import Login from "../pages/Login";

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

describe("Login Component", () => {
  it("handles form submission with valid credentials", async () => {
    // Mock useNavigate
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    // Mock Axios post
    axios.post.mockResolvedValueOnce({
      data: {
        message: "Login successful",
        token: "mocked-token",
        user: {
          userID: 1,
          firstName: "Usu",
          lastName: "Edeaghe",
          emailAddress: "ue34@kent.ac.uk",
        },
      },
    });

    // Render the component
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText("Email Address"), {
      target: { value: "moo39@kent.ac.uk" },
    });

    fireEvent.change(getByPlaceholderText("*******"), {
      target: { value: "Test@2023" },
    });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(getByText("Sign In"));
      await Promise.resolve(); // Let pending promises resolve
    });

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      // Check if the expected API call is made
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/login",
        {
          emailAddress: "moo39@kent.ac.uk",
          password: "Test@2023",
        }
      );
    });

    // Check if the redirect occurs
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("displays an error message for invalid credentials", async () => {
    // Mock useNavigate
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    // Mock Axios post for invalid credentials
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    });

    // Render the component
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText("Email Address"), {
      target: { value: "invalid@kent.ac.uk" },
    });

    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "InvalidPassword" },
    });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(getByText("Sign In"));
      await Promise.resolve(); // Let pending promises resolve
    });

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      // Check if the expected API call is made
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/login",
        {
          emailAddress: "invalid@kent.ac.uk",
          password: "InvalidPassword",
        }
      );
    });

    // Check if the error message is displayed
    expect(getByText("Invalid credentials")).toBeTruthy();
    // Check if the redirect does not occur
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
