import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CampaignCreationForm() {
  const navigate = useNavigate();
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
        "http://localhost:4000/api/campaigns/add-campaign",
        formData
      );
      console.log(response.data);
      alert("Campaign created successfully!");
      navigate("/discovery");
    } catch (error) {
      console.error(error);
      alert("Error creating campaign. Please try again.");
    }

    // Clear form data after submission
    setFormData(initialFormData);
  };

  return (
    <div className="container">
      <h2 className="create-title">Create a Campaign</h2>
      <div className="" id="container-create">
        <form onSubmit={handleSubmit} className="form-div">
          <div className="form-row">
            <input
              type="text"
              name="campaignTitle"
              value={formData.campaignTitle}
              onChange={handleChange}
              className="form-control"
              placeholder="Campaign Title"
            />
          </div>

          <div className="form-row">
            <textarea
              name="campaignDescription"
              value={formData.campaignDescription}
              onChange={handleChange}
              placeholder="Campaign Description..."
              className="form-control"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              className="form-control"
              placeholder="User ID"
            />
          </div>

          <div className="form-row">
            <input
              type="number"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="form-control"
              placeholder="Funding Goal..."
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              placeholder="Category"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-control"
              placeholder="Region"
            />
          </div>

          <label>End Date:</label>
          <div className="form-row">
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <label>Poster Image:</label>
          <div className="form-row">
            <input
              type="file"
              name="posterImage"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
}

export default CampaignCreationForm;
