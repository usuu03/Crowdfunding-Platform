import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Campaign from "../components/Campaign"; // Assuming you have a Campaign component
import axios from "axios";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const handleSearch = async () => {
    // You might want to implement the search functionality here
    // For now, let's assume you have an endpoint for searching campaigns
    try {
      const response = await axios.get(
        `http://localhost:4000/api/campaigns/search?term=${searchTerm}`
      );
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error searching campaigns:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Campaigns..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="summary">
          <h2>Summary</h2>
          {/* Add your summary content here */}
        </div>

        <div className="how-to">
          <h2>How to Get Involved</h2>
          {/* Add your "How to Get Involved" content here */}
        </div>

        <div className="contact">
          <h2>Contact Us</h2>
          {/* Add your "Contact Us" content here */}
        </div>

        <div className="campaigns">
          <h2>Featured Campaigns</h2>
          <div className="campaign-container">
            {campaigns.map((campaign) => (
              <Campaign key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
