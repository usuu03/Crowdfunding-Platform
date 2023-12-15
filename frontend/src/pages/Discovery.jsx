// import React, { useState, useEffect } from "react";
// import CustomPopup from "../components/CustomPopup";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Discovery() {
//   const [showModal, setShowModal] = useState(false);
//   const [campaigns, setCampaigns] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [countries, setCountry] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const navigate = useNavigate();

//   const openPopup = () => setShowModal(true);
//   const closePopup = () => setShowModal(false);

//   const handleSelect = (selected, dropdownType) => {
//     if (dropdownType === "categoriesDropdown") {
//       setSelectedCategory(selected);
//     } else if (dropdownType === "countryDropdown") {
//       setSelectedCountry(selected);
//     }
//   };

//   const filterCampaigns = () => {
//     let filteredCampaigns = campaigns;

//     if (selectedCategory) {
//       filteredCampaigns = filteredCampaigns.filter(
//         (campaign) => campaign.category === selectedCategory
//       );
//     }

//     if (selectedCountry) {
//       filteredCampaigns = filteredCampaigns.filter(
//         (campaign) => campaign.country === selectedCountry
//       );
//     }

//     return filteredCampaigns;
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/campaigns/all")
//       .then((response) => setCampaigns(response.data))
//       .catch((error) => console.error("Error fetching campaign data:", error));

//     axios
//       .get("http://localhost:4000/api/campaigns/categories")
//       .then((response) => setCategories(response.data))
//       .catch((error) => console.error("Error fetching category data:", error));

//     axios
//       .get("http://localhost:4000/api/campaigns/country")
//       .then((response) => setCountry(response.data))
//       .catch((error) => console.error("Error fetching region data:", error));
//   }, []);

//   const progressWidth = (currentAmount, goal) =>
//     (currentAmount / goal) * 100 + "%";

//   return (
//     <div className="container">
//       <div className="discovery" style={{ backgroundColor: "white" }}>
//         <div>
//           <h2 className="register-title">Discovery</h2>
//         </div>

//         <div>
//           <h3>
//             Explore a world of impactful campaigns and discover the causes that
//             matter to you!
//           </h3>
//           <button className="btn btn-primary" onClick={openPopup}>
//             Learn More
//           </button>
//           {showModal && <CustomPopup closePopup={closePopup} />}
//         </div>
//       </div>

//       <div className="dropdown-container">
//         <h4>
//           Explore Campaigns in
//           <select
//             value={selectedCategory}
//             onChange={(e) => handleSelect(e.target.value, "categoriesDropdown")}
//             className="dropdown"
//           >
//             <option value="">Select Category</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </h4>

//         <h4>
//           located in
//           <select
//             value={selectedCountry}
//             onChange={(e) => handleSelect(e.target.value, "countryDropdown")}
//             className="dropdown"
//           >
//             <option value="">Select Region</option>
//             {countries.map((country) => (
//               <option key={country?.id} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>
//         </h4>
//       </div>

//       <div className="campaign-container">
//         {filterCampaigns().map((campaign) => (
//           <div key={campaign.id} className="campaign-box">
//             <div className="campaign-box-content">
//               <div className="campaign-image">
//                 <img src={campaign.image} alt="Campaign Image" />
//               </div>
//               <div id={`campaign-${campaign.campaignID}`}>
//                 <Link to={`/${campaign.id}`}>
//                   <h3>{campaign.title}</h3>
//                 </Link>
//                 <p>
//                   Raised: ${campaign.currentAmount} of ${campaign.goal}
//                 </p>
//                 <div className="progress">
//                   <div
//                     className="progress-bar"
//                     style={{
//                       width: progressWidth(
//                         campaign.currentAmount,
//                         campaign.goal
//                       ),
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Discovery;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomPopup from "../components/CustomPopup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Discovery() {
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountry] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");


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
      <div className="discovery" style={{ backgroundColor: "white" }}>
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
          <select
            value={selectedCategory}
            onChange={(e) => handleSelect(e.target.value, "categoriesDropdown")}
            className="dropdown"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category}>
                {category}
              </option>
            ))}
          </select>
        </h4>

        <h4>
          located in
          <select
            value={selectedCountry}
            onChange={(e) => handleSelect(e.target.value, "countryDropdown")}
            className="dropdown"
          >
            <option value="">Select Region</option>
            {countries.map((country) => (
              <option key={country?.id} value={country}>
                {country}
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
                <img src={campaign.image} alt="Campaign Image" />
              </div>
              <div id={`campaign-${campaign.campaignID}`}>
                <Link to={`/${campaign.id}`}>
                  <h3>{campaign.title}</h3>
                </Link>
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
