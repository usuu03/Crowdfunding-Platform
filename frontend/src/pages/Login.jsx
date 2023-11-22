//login.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    emailAddress: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        userData
      );
      console.log(response.data);

      //Redirecting to the Homepage if successfully logged in
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="container">
      <h2 className="register-title">Sign in to Crowdfunding Platform</h2>
      <div>
        <p>
          Do not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
      <div className="form-container">
        <h6>Your Account Details</h6>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-elements-div">
            <div className="input-email">
              <input
                className="form-control"
                placeholder="Email Address"
                name="emailAddress"
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-password">
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" id="login-btn" className="btn btn-primary">
              Sign In
            </button>{" "}
            <span>
              {" "}
              <p>
                <a href="">Forgot your password?</a>
              </p>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
