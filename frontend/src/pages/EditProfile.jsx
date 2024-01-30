import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../axiosInstance";
import { useAuthState } from "../context/authContext";

const isPasswordValid = (password) => {
  // Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 symbol, and 1 number
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

function EditProfile() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const axiosInstance = useAxiosInstance();

  const initialFormData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user details when component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/api/user/details");
        const userDetails = response.data[0]; // Assuming the response is an array with one element
        setFormData(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear password error when the user starts typing
    if (name === "password") {
      setErrors({ ...errors, password: "" });
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty values
    const requiredFields = ["firstName", "lastName", "emailAddress", "password"];
    const emptyFields = requiredFields.filter((field) => !formData[field].trim());

    if (emptyFields.length > 0) {
      setErrors({
        ...errors,
        general: "Please fill out all required fields.",
      });
      return;
    }

    // Validate password
    if (formData.password && !isPasswordValid(formData.password)) {
      setErrors({
        ...errors,
        password:
          "Your password must have at least: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number.",
      });
      return;
    }

    try {
      const response = await axiosInstance.put(
        "/api/user/update-user-details",
        formData
      );
      console.log(response.data);
      alert("User details updated successfully!");
      navigate("/campaigns");
    } catch (error) {
      console.error(error);
      alert("Error updating user details. Please try again.");
    }

    // Clear form data after submission
    setFormData(initialFormData);
  };

  if (!isAuthenticated) {
    return null; // Return null or a loading spinner, etc.
  }

  return (
    <div className="container">
      <h2 className="edit-title">Edit Your Details</h2>
      <div className="" id="container-edit">
        <form onSubmit={handleSubmit} className="form-div">
          {errors.general && (
            <div className="alert alert-danger" role="alert">
              {errors.general}
            </div>
          )}
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              placeholder="First Name"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="form-control"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
            />
            {errors.password && (
              <div className="alert alert-danger" role="alert">
                {errors.password}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
