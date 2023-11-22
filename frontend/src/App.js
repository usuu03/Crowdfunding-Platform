import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Note the addition of 'Routes' here

// Import your page components (Register and Login)
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Discovery from "./pages/Discovery";
import CampaignCreationForm from "./pages/CampaignCreation";
import EditProfile from "./pages/EditProfile";

//Importing Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          {" "}
          <Route path="/register" element={<Register />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/start-campaign" element={<CampaignCreationForm />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
