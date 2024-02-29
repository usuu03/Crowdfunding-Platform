import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../axiosInstance";
import { useAuthState } from "../context/authContext";
import "../styles/creation.css";

/**
 * Component for creating a new campaign.
 * @returns {JSX.Element} Campaign creation form.
 */
function CampaignCreationForm() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const axiosInstance = useAxiosInstance();

  const initialFormData = {
    campaignTitle: "",
    campaignDescription: "",
    userID: "",
    goal: "",
    category: "",
    country: "",
    startDate: "",
    endDate: "",
    posterImage: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  // Handle category button click
  const handleCategoryClick = (category) => {
    setFormData({ ...formData, category }); // Update selected category in state
    setSelectedCategory(category);
  };

  // Handle file input change for poster image
  const handleFileChange = (e) => {
    setFormData({ ...formData, posterImage: e.target.files[0] });
    console.log(formData.posterImage);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if posterImage is null
      if (!formData.posterImage) {
        throw new Error("Poster image is required");
      }

      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axiosInstance.post(
        "/api/campaigns/add-campaign",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Campaign created successfully", response.data);
      alert("Campaign created successfully");
      navigate("/discovery");
    } catch (error) {
      console.error("Error creating campaign", error);
      // Handle error, display error message, etc.
    }
  };

  useEffect(() => {
    // Check authentication status when the component mounts
    if (!isAuthenticated) {
      // Redirect if not logged in
      navigate("/login");
      window.alert("Please Log In to see to start a Campaign");
    }
  }, [isAuthenticated, navigate]);

  // if (!isAuthenticated) {
  //   // Return null or a loading spinner, etc.
  //   return null;
  // }

  return (
    <div className="content">
      <h2 className="create-title">Create Campaign</h2>
      <h4>Let's start with basic info</h4>
      <Form onSubmit={handleSubmit}>
        {/* Campaign Title, Description and Region Section */}
        <div className="region-title-section">
          <div className="title">
            <Form.Label>What's your campaign name?</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Funds for my Research Project"
              className="formItem"
              id="title"
              name="campaignTitle"
              value={formData.campaignTitle}
              onChange={handleChange}
            />
          </div>
          <div className="description">
            <Form.Label>What's your campaign description?</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="e.g. I need funds for my research because....."
              className="formItem"
              name="campaignDescription"
              value={formData.campaignDescription}
              onChange={handleChange}
            />
          </div>

          {/* Campaign Region*/}
          <div className="region">
            <Form.Label>What's your campaign region?</Form.Label>
            <Form.Select
              className="formItem"
              id="region"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Choose your Campaign's Region</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Oceania">Oceania</option>
            </Form.Select>
          </div>
        </div>

        {/* Campaign Category */}
        <div className="category-amount-section">
          <div className="category">
            <Form.Label>What is the campaign category?</Form.Label>
            <div className="form-item">
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Community"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Community")}
              >
                Community
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Education & Learning"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Education & Learning")}
              >
                Education & Learning
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Social Welfare"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Social Welfare")}
              >
                Social Welfare
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Humanitarian"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Humanitatian")}
              >
                Humanitarian
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Healthcare"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Healthcare")}
              >
                Healthcare
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Exploration"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Exploration")}
              >
                Exploration
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Music & Audio"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Music & Audio")}
              >
                Music & Audio
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Sports & Outdoors"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Sport & Outdoors")}
              >
                Sport & Outdoors
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Pets & Animals"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Pets & Animals")}
              >
                Pets & Animals
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Business & Entrepreneurship"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() =>
                  handleCategoryClick("Business & Entrepreneurship")
                }
              >
                Business & Entrepreneurship
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Design & Tech Gadgets"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Design & Tech Gadgets")}
              >
                Design & Tech Gadgets
              </Button>
              <Button
                id="category-btn"
                variant={
                  selectedCategory === "Food & Beverages"
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick("Food & Beverages")}
              >
                Food & Beverages
              </Button>
            </div>
          </div>
          {/* Campaign Amount */}
          <div className="amount">
            <Form.Label>Let's set your Campaign goal.</Form.Label>
            <Form.Text muted>
              When your campaign hits the prescribed limit it will automatically
              shut down
            </Form.Text>
            <Form.Control
              type="number"
              placeholder="£1000"
              id="amount"
              className="formItem"
              name="goal"
            />
          </div>

          {/* Campaign Date */}
          <h4>Let's schedule your Campaign</h4>
          <div className="dates">
            <div className="start-date">
              <Form.Label>Start date </Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="start-date">
              <Form.Label>End date </Form.Label>
              <Form.Control
                type="date"
                className="formItem"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Campaign Poster Image */}
          <h4>Select the Campaign Poster</h4>
          <div className="posterImage">
            <Form.Control
              type="file"
              className="formItem"
              name="posterImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <Button type="submit" className="formItem">
            Create Campaign
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CampaignCreationForm;
