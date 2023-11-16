import React, { useState, useEffect } from "react";
import Campaign from "../components/Campaign";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCaretDown } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import CustomPopup from "../components/CustomPopup";
import axios from "axios";

function Discovery() {
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const openPopup = () => setShowModal(true);
  const closePopup = () => setShowModal(false);

  const handleSelect = (selected, dropdownType) => {
    if (dropdownType === "categoriesDropdown") {
      setSelectedCategory(selected); // Update to set the category name
    } else if (dropdownType === "regionDropdown") {
      setSelectedRegion(selected);
    }
  };

  const filterFunction = (event, dropdownType) => {
    const input = event.target.value.toUpperCase();
    const dataToFilter = dropdownType === "categories" ? categories : regions;

    const filteredData = dataToFilter.filter((item) =>
      item.toUpperCase().includes(input)
    );

    if (dropdownType === "categories") {
      setFilteredCategories(filteredData);
    } else if (dropdownType === "regions") {
      setRegions(filteredData);
    }
  };

  const filterCampaigns = () => {
    let filteredCampaigns = campaigns;

    if (selectedCategory) {
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) => campaign.category === selectedCategory
      );
    }

    if (selectedRegion) {
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) => campaign.region === selectedRegion
      );
    }

    return filteredCampaigns;
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/campaigns/all")
      .then((response) => setCampaigns(response.data))
      .catch((error) => console.error("Error fetching campaign data:", error));

    axios
      .get("http://localhost:4000/api/campaigns/categories")
      .then((response) => {
        setCategories(response.data);
        setFilteredCategories(response.data);
      })
      .catch((error) => console.error("Error fetching category data:", error));

    axios
      .get("http://localhost:4000/api/campaigns/regions")
      .then((response) => setRegions(response.data))
      .catch((error) => console.error("Error fetching region data:", error));
  }, []);

  const progressWidth = (currentAmount, goal) =>
    (currentAmount / goal) * 100 + "%";

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
          <select
            value={selectedCategory}
            onChange={(e) => handleSelect(e.target.value, "categoriesDropdown")}
            className="dropdown"
          >
            <option value="">Select Category</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </h4>

        <h4>
          located in
          <select
            value={selectedRegion}
            onChange={(e) => handleSelect(e.target.value, "regionDropdown")}
            className="dropdown"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region.id} value={region}>
                {region}
              </option>
            ))}
          </select>
        </h4>
      </div>

      <div className="campaign-container">
        {filterCampaigns().map((campaign) => (
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