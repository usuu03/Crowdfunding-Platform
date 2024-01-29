import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function UserEditForm({ userId }) {
  const initialFormData = {
    lastName: '',
    firstName: '',
    emailAddress: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/users/${userId}`, formData);
      alert('User details updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating user details. Please try again.');
    }

    // You can add additional logic here if needed, such as redirecting the user.
  };

  return (
    <div className="UserEditForm">
      <form onSubmit={handleSubmit}>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>

        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>

        <label>
          Email Address:
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Details</button>
      </form>
    </div>
  );
}

export default UserEditForm;
