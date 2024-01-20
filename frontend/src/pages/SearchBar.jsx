import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, InputGroup, ProgressBar } from "react-bootstrap";
import "../styles/searchbar.css";

// SearchBar component for searching campaigns
export default function SearchBar() {
  // State to manage search query and results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server with the search query
      const response = await axios.post(
        "http://localhost:4000/api/campaigns/search",
        {
          campaignTitle: searchQuery,
        }
      );

      // Extract data from the response and set search results
      const data = response.data;
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error searching campaigns:", error);
    }
  };

  // Function to calculate progress bar width based on current amount and goal
  const progressWidth = (currentAmount, goal) =>
    (currentAmount / goal) * 100 + "%";

  return (
    <div className="container">
      {/* Search title */}
      <h2 className="search-title">Search Campaigns</h2>

      {/* Search form */}
      <div className="searchbar">
        <form onSubmit={handleSearch} className="form-div">
          {/* Search input */}

          <InputGroup>
            <Form.Control
              onSubmit={handleSearch}
              placeholder="Search Campaings..."
              size="lg"
              type="search"
              name="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">Search Campaigns</Button>
          </InputGroup>
        </form>
      </div>

      {/* Display search results */}
      <div className="campaign-container">
        {searchResults.map((campaign) => (
          <Card border="light" id={campaign.campaignID}>
            <Card.Img
              variant="top"
              src={`http://localhost:4000/uploads/${campaign.posterImage}`}
            />

            <Card.Body id={`campaign-${campaign.campaignID}`}>
              <Card.Title>{campaign.campaignTitle}</Card.Title>

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
    </div>
  );
}
