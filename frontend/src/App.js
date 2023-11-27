/*
 * Filename: App.js
 * Author: Usu Edeaghe
 * Date: October 10, 2023
 * Description: This file contains the UI and routers to different pages of the Platform
 */

// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Discovery from "./pages/Discovery";
import CampaignCreationForm from "./pages/CampaignCreation";
import EditProfile from "./pages/EditProfile";
import SearchBar from "./pages/SearchBar";
import CampaignDashboard from "./pages/CampaignDashboard";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/start-campaign" element={<CampaignCreationForm />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/dashboard" element={<CampaignDashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
