// Import necessary dependencies for testing
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// Import the component to be tested
import Login from "../pages/Login.js"; // <-- Add .js extension

// Mocking axios post method for testing
jest.mock("axios");
// Import the component to be tested
import Login from "../pages/Login";

// Mocking axios post method for testing
jest.mock("axios");

// Sample test suite
describe("Login Component", () => {
  // Mocking axios response
  const mockResponse = {
    data: {
      // You can add necessary data for successful login
    },
  };

  // Mocking a successful login
  axios.post.mockResolvedValue(mockResponse);

  it("renders the login component", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check if the component renders correctly
    expect(
      screen.getByText(/sign in to crowdfunding platform/i)
    ).toBeInTheDocument();
  });

  it("handles user input and submits the form", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simulate user input
    userEvent.type(
      screen.getByPlaceholderText(/email address/i),
      "ue34@kent.ac.uk"
    );
    userEvent.type(screen.getByPlaceholderText(/password/i), "Test@2023");

    // Simulate form submission
    fireEvent.click(screen.getByText(/sign in/i));

    // Wait for the asynchronous axios call to resolve
    await waitFor(() => {
      // Check if axios.post was called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/login",
        {
          emailAddress: "user@example.com",
          password: "password123",
        }
      );

      // Check if the component navigates to the correct route after successful login
      expect(screen.getByText(/Welcome to the Platform!/i)).toBeInTheDocument();
    });
  });
});
