import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Login from "../pages/Login";

jest.mock("axios");

describe("Login Component", () => {
  it("handles user input, submits the form, and redirects on successful login", async () => {
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

    // Mocking a successful login
    axios.post.mockResolvedValue({
      data: {
        // Mock the necessary data for a successful login
      },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/sign in/i));

    // Wait for the asynchronous axios call to resolve
    await waitFor(() => {
      // Check if axios.post was called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/login",
        {
          emailAddress: "ue34@kent.ac.uk",
          password: "Test@2023",
        }
      );

      // Check if the component navigates to the correct route after successful login
      expect(screen.getByText(/Welcome to the Platform!/i)).toBeInTheDocument();
    });
  });

  // You can add more test cases for edge cases and error handling
});
