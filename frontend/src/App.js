/*
 * Filename: App.js
 * Author: Usu Edeaghe
 * Date: October 10, 2023
 * Description: This file contains the UI and routers to different pages of the Platform
 */

// App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";
import BlockchainPaymentForm from "./pages/BlockchainPaymentForm";
import CampaignCreationForm from "./pages/CampaignCreation";
import CampaignDashboard from "./pages/CampaignDashboard";
import CampaignPage from "./pages/CampainPage";
import Discovery from "./pages/Discovery";
import EditProfile from "./pages/EditProfile";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PaymentForm from "./pages/PaymentForm";
import Register from "./pages/Register";
import SearchBar from "./pages/SearchBar";

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
            <Route
              path="/start-fundraiser"
              element={<CampaignCreationForm />}
            />
            <Route path="/:id" element={<CampaignPage />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/campaigns" element={<CampaignDashboard />} />
            <Route path="/donation/:id" element={<PaymentForm />} />
            <Route
              path="/blockchain-donation"
              element={<BlockchainPaymentForm />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
