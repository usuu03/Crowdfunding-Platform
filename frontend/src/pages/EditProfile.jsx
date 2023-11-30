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
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${user.id}`);
        setEditedUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editedUserData.newPassword !== editedUserData.confirmPassword) {
        setErrors({ general: "Passwords do not match." });
        return;
      }

      await axios.put(`http://localhost:4000/user/${user.id}`, {
        firstName: editedUserData.firstName,
        lastName: editedUserData.lastName,
        newPassword: editedUserData.newPassword,
      });

      const response = await axios.get(`http://localhost:4000/user/${user.id}`);
      setEditedUserData(response.data);

      setEditedUserData((prevData) => ({
        ...prevData,
        newPassword: "",
        confirmPassword: "",
      }));

      setSuccessMessage("Profile updated successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      navigate("/discovery");
    } catch (error) {
      console.error("Edit Profile Error:", error);
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.message });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });

    setErrors({});
  };

  const handleCancel = () => {
    navigate("/discovery");
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
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
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

            <div className="form-newPassword">
              <input
                className="form-control"
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={editedUserData.newPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-confirmPassword">
              <input
                className={`form-control ${
                  errors.passwordMatch ? "input-error" : ""
                }`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={editedUserData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
