import React, { useState, useEffect } from "react";
import Campaign from "../components/Campaign";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCaretDown } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import CustomPopup from "../components/CustomPopup";
import axios from "axios";

function Discovery() {
  // State variables for dropdowns, modal, campaigns, categories, regions, and selected options
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Fetch campaigns, categories, and regions from the server on component mount
  useEffect(() => {
    // Fetch campaigns
    axios
      .get("http://localhost:4000/api/campaigns/all")
      .then((response) => setCampaigns(response.data))
      .catch((error) => console.error("Error fetching campaign data:", error));
  }, []);

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:4000/api/campaigns/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching category data:", error));
  }, []);

  useEffect(() => {
    // Fetch regions
    axios
      .get("http://localhost:4000/api/campaigns/regions")
      .then((response) => setRegions(response.data))
      .catch((error) => console.error("Error fetching region data:", error));
  }, []);

  useEffect(() => {
    // Hide dropdowns initially
    document.getElementById("categoriesDropdown").style.display = "none";
    document.getElementById("regionDropdown").style.display = "none";
  }, []);

  // Open and close modal functions
  const openPopup = () => setShowModal(true);
  const closePopup = () => setShowModal(false);

  // Toggle dropdown visibility based on type
  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "categoriesDropdown") {
      setCategoriesOpen((prevOpen) => !prevOpen);
    } else if (dropdownType === "regionDropdown") {
      setRegionOpen((prevOpen) => !prevOpen);
    }
  };

  // Handle the selection of an option in the dropdown
  const handleSelect = (selected) => {
    if (categoriesOpen) {
      setSelectedCategory(selected);
      setCategoriesOpen(false);
    } else if (regionOpen) {
      setSelectedRegion(selected);
      setRegionOpen(false);
    }
  };

  const filterFunction = (event) => {
    const input = event.target.value.toUpperCase();
    const filteredCategories = categories.filter((category) =>
      category.toUpperCase().includes(input)
    );
    setCategoriesOpen(filteredCategories.length > 0);
  };

  // Calculate progress bar width
  const progressWidth = (currentAmount, goal) =>
    (currentAmount / goal) * 100 + "%";

  // Render the component
  return (
    <div className="App">
      <div className="discovery" style={{ backgroundColor: "white" }}>
        <div>
          <h2>Discovery</h2>
        </div>

        <div>
          <h3>
            Explore a world of impactful campaigns and discover the causes that
            matter to you!
          </h3>
          <button className="btn btn-primary" onClick={openPopup}>
            Learn More
          </button>
          {showModal && <CustomPopup closePopup={closePopup} />}
        </div>
      </div>

      <div className="dropdown-container">
        <h4>
          Explore Campaigns in
          <span
            onClick={() =>
              toggleDropdown(
                "categoriesDropdown",
                categoriesOpen,
                setCategoriesOpen
              )
            }
            className="dropbtn"
          >
            Categories <FaCaretDown />
          </span>
        </h4>
        <div
          id="categoriesDropdown"
          className={`categories-dropdown-content ${
            categoriesOpen ? "active" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search.."
            id="categoryInput"
            onChange={filterFunction}
          />
          {categories.map((category) => (
            <a
              href="#"
              key={category.id}
              onClick={() => handleSelect(category)}
            >
              {category}
            </a>
          ))}
        </div>
        <h4>
          located in
          <span
            onClick={() =>
              toggleDropdown("regionDropdown", regionOpen, setRegionOpen)
            }
            className="dropbtn"
          >
            Region <FaCaretDown />
          </span>
        </h4>
        <div
          id="regionDropdown"
          className={`region-dropdown-content ${regionOpen ? "active" : ""}`}
        >
          <input
            type="text"
            placeholder="Search.."
            id="regionInput"
            onChange={filterFunction}
          />
          {regions.map((region) => (
            <a href="#" key={region.id} onClick={() => handleSelect(region)}>
              {region}
            </a>
          ))}
        </div>
      </div>

      <div className="campaign-container">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-box">
            <div className="campaign-box-content">
              <div className="campaign-image">
                <img src="image-placeholder.jpg" alt="Campaign Image" />
              </div>
              <div id={`campaign-${campaign.id}`}>
                <h3>{campaign.title}</h3>
                <p>
                  Raised: ${campaign.currentAmount} of ${campaign.goal}
                </p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: progressWidth(
                        campaign.currentAmount,
                        campaign.goal
                      ),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discovery;
