/*
 * Filename: login.test.js
 * Author: Usu Edeaghe
 * Date: November 20, 2023
 * Description: This file contains tests for the login feature
 */
// Import necessary testing libraries
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login";
import { AuthProvider } from "../context/authContext";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  it("handles form submission", async () => {
    // Mock useNavigate
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    // Simulate a successful login response from the server
    axios.post.mockResolvedValueOnce({
      data: {
        message: "Login successful",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMTA5MTIwNCwiZXhwIjoxNzAxMDk0ODA0fQ.IDgw7S3AAKPgT0DQDlsJ7FtHmD1FImzvgiuYoN1Pn7E",
        user: {
          userID: 1,
          firstName: "Usu",
          lastName: "Edeaghe",
          emailAddress: "ue34@kent.ac.uk",
          password:
            "$2b$10$Y1lNnZREUMHiXxZPuBez2.RsuwMfbrvG7ao8vyj1lhzRI6TuJZypq",
        },
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    // Simulate user input
    fireEvent.change(getByPlaceholderText("Email Address"), {
      target: { value: "ue34@kent.ac.uk" },
    });

    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "Test@2023" },
    });

    // Simulate form submission
    fireEvent.click(getByText("Sign In"));

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      // Check if the expected API call is made
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/login",
        {
          emailAddress: "ue34@kent.ac.uk",
          password: "Test@2023",
        }
      );
    });

    // Check if the redirect occurs
    expect(mockNavigate).toHaveBeenCalled();
  });
});
