import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Card, Form, Pagination, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomPopup from "../components/CustomPopup";

function Discovery() {
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountry] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(9);

  const openPopup = () => setShowModal(true);
  const closePopup = () => setShowModal(false);

  const handleSelect = (selected, dropdownType) => {
    if (dropdownType === "categoriesDropdown") {
      setSelectedCategory(selected);
    } else if (dropdownType === "countryDropdown") {
      setSelectedCountry(selected);
    }
  };

  const filterCampaigns = () => {
    let filteredCampaigns = campaigns;

    if (selectedCategory) {
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) => campaign.category === selectedCategory
      );
    }

    if (selectedCountry) {
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) => campaign.country === selectedCountry
      );
    }

    return filteredCampaigns;
  };

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = () =>
    filterCampaigns().slice(indexOfFirstCampaign, indexOfLastCampaign);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const progressWidth = (currentAmount, goal) =>
  //   (currentAmount / goal) * 100 + "%";

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/campaigns/all")
      .then((response) => setCampaigns(response.data))
      .catch((error) => console.error("Error fetching campaign data:", error));

    axios
      .get("http://localhost:4000/api/campaigns/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching category data:", error));

    axios
      .get("http://localhost:4000/api/campaigns/country")
      .then((response) => setCountry(response.data))
      .catch((error) => console.error("Error fetching region data:", error));
  }, []);

  const progressWidth = (currentAmount, goal) =>
    (currentAmount / goal) * 100 + "%";

  return (
    <div className="container">
      <div className="discovery">
        <div>
          <h2 className="register-title">Discovery</h2>
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
          <Form.Select
            value={selectedCategory}
            onChange={(e) => handleSelect(e.target.value, "categoriesDropdown")}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category?.id} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </h4>

        <h4>
          located in
          <Form.Select
            value={selectedCountry}
            onChange={(e) => handleSelect(e.target.value, "countryDropdown")}
          >
            <option value="">Select Region</option>
            {countries.map((country) => (
              <option key={country?.id} value={country}>
                {country}
              </option>
            ))}
          </Form.Select>
        </h4>
      </div>

      <div className="campaign-container">
        {currentCampaigns().map((campaign) => (
          <Card border="light">
            <Card.Img
              variant="top"
              src={`http://localhost:4000/uploads/${campaign.posterImage}`}
            />

            <Card.Body id={`campaign-${campaign.campaignID}`}>
              <Link to={`/${campaign.id}`}>
                <h3>{campaign.title}</h3>
              </Link>
              {/* <Card.Title>{campaign.title}</Card.Title> */}
              <Card.Text>
                Raised: ${campaign.currentAmount} of ${campaign.goal}
              </Card.Text>

              {/* Progress Bar */}
              <ProgressBar
                now={(campaign.currentAmount / campaign.goal) * 100}
                label={`${Math.round(
                  (campaign.currentAmount / campaign.goal) * 100
                )}%`}
              />
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <Pagination>
          {Array.from({
            length: Math.ceil(filterCampaigns().length / campaignsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default Discovery;
