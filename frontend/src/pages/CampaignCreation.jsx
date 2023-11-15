import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function CampaignCreationForm() {
  const initialFormData = {
    campaignTitle: "",
    campaignDescription: "",
    userID: "",
    goal: "",
    category: "",
    region: "",
    endDate: "",
    posterImage: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.campaignTitle.trim() ||
      isNaN(formData.goal) ||
      parseFloat(formData.goal) <= 0 ||
      new Date(formData.endDate) <= new Date()
    ) {
      alert("Please fill out the form correctly.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/campaigns",
        formData
      );
      console.log(response.data);
      alert("Campaign created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating campaign. Please try again.");
    }

    // Clear form data after submission
    setFormData(initialFormData);
  };

  return (
    <div className="CampaignCreationForm">
      <form onSubmit={handleSubmit}>
        <label>
          Campaign Title:
          <input
            type="text"
            name="campaignTitle"
            value={formData.campaignTitle}
            onChange={handleChange}
          />
        </label>

        <label>
          Campaign Description:
          <textarea
            name="campaignDescription"
            value={formData.campaignDescription}
            onChange={handleChange}
          />
        </label>

        <label>
          User ID:
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
          />
        </label>

        <label>
          Funding Goal:
          <input
            type="number"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Region:
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="form-control"
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Poster Image:
          <input
            type="file"
            name="posterImage"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
}

export default CampaignCreationForm;
