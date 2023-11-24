import React, { useState } from "react";
import axios from "axios";

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
    <div className="container d-flex flex-column align-items-center">
      {/* Search title */}
      <h2 className="search-title">Search Campaigns</h2>

      {/* Search form */}
      <form onSubmit={handleSearch} className="form-div">
        <div className="d-flex align-items-center">
          {/* Search input */}
          <input
            type="search"
            name="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mr-sm-2"
            placeholder="Search Campaigns..."
            id="search-bar"
          />

          {/* Search button */}
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Display search results */}
      <div className="campaign-container">
        {searchResults.map((campaign) => (
          <div key={campaign.id} className="campaign-box">
            <div className="campaign-box-content">
              {/* Campaign image */}
              <div className="campaign-image">
                <img src="image-placeholder.jpg" alt="Campaign Image" />
              </div>
              {/* Campaign details */}
              <div id={`campaign-${campaign.id}`}>
                <h3>{campaign.campaignTitle}</h3>
                <p>
                  Raised: ${campaign.currentAmount} of ${campaign.goal}
                </p>
                {/* Progress bar */}
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
