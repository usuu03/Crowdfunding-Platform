import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Note the addition of 'Routes' here

export default function Login() {
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
        <form action="">
          <div className="form-elements-div">
            <div className="input-email">
              <input
                className="form-control"
                placeholder="Email Address"
                type="text"
              />
            </div>
            <div className="input-password">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
              />
            </div>
            <button id="login-btn" className="btn btn-primary">
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
