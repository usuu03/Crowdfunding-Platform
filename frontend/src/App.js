import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Note the addition of 'Routes' here

// Import your page components (Register and Login)
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";

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
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
