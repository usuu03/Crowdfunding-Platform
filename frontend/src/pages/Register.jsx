import React from "react";

export default function Register() {
  return (
    <div className="container">
      <h2 className="register-title">Create an Account</h2>

      <div className="info-container">
        <p>
          Already have an account? <a href="http://">Sign In</a>
        </p>
      </div>

      <div className="form-div">
        <h6>Your Account Details</h6>
        <form className="" action="">
          <div className="form-row">
            <div className="form-firstName">
              <input
                className="form-control"
                type="text"
                placeholder="First Name"
              />
            </div>

            <div className="form-lastName">
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-emailAddress">
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-confirmEmailAddress">
              <input
                className="form-control"
                type="email"
                placeholder="Confirm Email Address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-password">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="password-explained">
              <p>Your password must have at least:</p>
              <ul>
                <li>8 characters</li>
                <li>1 uppercase letter</li>
                <li>1 lowercase letter</li>
                <li>1 symbol</li>
                <li>1 number</li>
              </ul>
            </div>
          </div>

          <div className="form-row">
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
