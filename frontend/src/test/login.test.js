// login.test.js

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login";
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

describe("Login Component", () => {
  it("handles form submission", async () => {
    // Mock useNavigate
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    // Mock Axios post
    axios.post.mockImplementationOnce(async (url, data) => {
      if (url === "http://localhost:4000/user/login") {
        // Simulate a successful login response
        const dynamicToken = generateDynamicToken();
        return Promise.resolve({
          data: {
            message: "Login successful",
            token: dynamicToken,
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
      }
      return Promise.reject(new Error("Unexpected URL: " + url));
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

    fireEvent.change(getByPlaceholderText("Password"), {
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

    // Ensure that the function to generate dynamic token is called
    expect(generateDynamicToken).toHaveBeenCalled();
  });
});
