// Login.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Login from "../pages/Login";

jest.mock("axios");

describe("Login Component", () => {
  it("renders without crashing", () => {
    render(<Login />);
  });

  it("handles form submission", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        /* your response data here */
      },
    });

    const { getByPlaceholderText, getByText } = render(<Login />);

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
    // Note: You might need to adjust this based on how navigation is handled
    // using the `useNavigate` hook in your component.
    // For example, if `navigate` is called upon successful login.
    // Here, you might check if certain elements are present on the page after login.
    // Example:
    expect(getByText("Discovery")).toBeInTheDocument();
  });
});
