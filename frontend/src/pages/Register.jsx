import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  //This is to get the data from the input fields
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    emailMatch: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password meets the criteria
    if (!isPasswordValid(userData.password)) {
      setErrors({
        ...errors,
        password:
          "Your password must have at least: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        userData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="container">
      <h2 className="register-title">Create an Account</h2>

      <div className="info-container">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>

      <div className="form-div">
        <h6>Your Account Details</h6>
        <form className="" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-firstName">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-lastName">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-emailAddress">
              <input
                className="form-control"
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-confirmEmailAddress">
              <input
                className="form-control"
                type="email"
                name="confirmEmail" // Add a name attribute
                placeholder="Confirm Email Address"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-password">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="password-explained">
              {errors.password && <p>{errors.password}</p>}
              {errors.emailMatch && <p>{errors.emailMatch}</p>}
              {/* <p>Your password must have at least:</p>
              <ul>
                <li>8 characters</li>
                <li>1 uppercase letter</li>
                <li>1 lowercase letter</li>
                <li>1 symbol</li>
                <li>1 number</li>
              </ul> */}
            </div>
          </div>

          <div className="form-row">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
