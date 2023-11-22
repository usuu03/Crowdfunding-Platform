import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../context/authContext";

export default function EditProfile() {
  const { user } = useAuthState();
  const navigate = useNavigate();

  const [editedUserData, setEditedUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${user.id}`);
        setEditedUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the user's details
      await axios.put(`http://localhost:4000/user/${user.id}`, editedUserData);

      // Fetch updated user data
      const response = await axios.get(`http://localhost:4000/user/${user.id}`);
      setEditedUserData(response.data);

      // Redirect to the user's profile or another appropriate page
      // You might not need this line if you are showing a success message instead
      navigate("/user/profile");
    } catch (error) {
      console.error("Edit Profile Error:", error);
      // Handle error response and set error state
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.message });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });

    // Clear the error when the user starts typing
    setErrors({});
  };

  return (
    <div className="container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <div className="form-container">
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}
        <form action="" onSubmit={handleSubmit}>
          <div className="form-elements-div">
            <div className="form-firstName">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={editedUserData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-lastName">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={editedUserData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-emailAddress">
              <input
                className={`form-control ${errors.emailMatch ? "input-error" : ""}`}
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                value={editedUserData.emailAddress}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-currentPassword">
              <input
                className="form-control"
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-newPassword">
              <input
                className="form-control"
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}