import React, { useState, useEffect } from "react";
import Campaign from "../components/Campaign";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCaretDown } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import CustomPopup from "./custompopup";
import axios from "axios";

function Discovery() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const openPopup = () => setShowModal(true);
  const closePopup = () => setShowModal(false);

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "categories") {
      setCategoriesOpen(!categoriesOpen);
    } else if (dropdownType === "region") {
      setRegionOpen(!regionOpen);
    }
  };

  const handleSelect = (selected) => {
    if (categoriesOpen) {
      setSelectedCategory(selected);
      setCategoriesOpen(false);
    } else if (regionOpen) {
      setSelectedRegion(selected);
      setRegionOpen(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/campaigns/all") // Make a GET request to your API endpoint
      .then((response) => {
        setCampaigns(response.data); // Assuming the response contains campaign data
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching campaign data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categories/all") // Make a GET request to your API endpoint
      .then((response) => {
        setCategories(response.data); // Assuming the response contains campaign data
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching category data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/regions/all") // Make a GET request to your API endpoint
      .then((response) => {
        setRegions(response.data); // Assuming the response contains campaign data
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching region data:", error);
      });
  }, []);

  useEffect(() => {
    document.getElementById("categoriesDropdown").style.display = "none";
    document.getElementById("regionDropdown").style.display = "none";
  }, []);

  const filterFunction = (event) => {
    const input = event.target.value.toUpperCase();
    const filteredCategories = categories.filter((category) =>
      category.toUpperCase().includes(input)
    );
    setCategoriesOpen(filteredCategories);
  };

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
              onClick={() => handleSelect(category, setSelectedCategory)}
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
        {campaigns.map((campaign, index) => (
          <div key={index} className="campaign-box">
            <div className="campaign-box-content">
              <div className="campaign-image">
                <img src="image-placeholder.jpg" alt="Campaign Image" />
              </div>
              <div id={`campaign-${index}`}>
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
