import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Note the addition of 'Routes' here

// Import your page components (Register and Login)
import CampaignCreationForm from "./pages/CampaignCreation";
import CampaignDashboard from "./pages/CampaignDashboard";
import CampaignPage from "./pages/CampaignPage";
import Discovery from "./pages/Discovery";
import EditProfile from "./pages/EditProfile";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PaymentForm from "./pages/PaymentForm";
import Register from "./pages/Register";
import SearchBar from "./pages/SearchBar";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/:id" element={<CampaignPage />} />
          <Route path="/start-fundraiser" element={<CampaignCreationForm />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/donation/:id" element={<PaymentForm />} />
          <Route path="/campaigns" element={<CampaignDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
