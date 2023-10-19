import React from "react";

export default function Register() {
  return (
    <div className="container">
      <h2>Create an Account</h2>

      <div className="info-container">
        <p>
          Already have an account? <a href="http://">Sign In</a>
        </p>
      </div>

      <div className="form-div">
        <h6>Your Account Details</h6>
        <form className="" action="">
          <div className="form-firstName">
            <input type="text" placeholder="First Name" />
          </div>

          <div className="form-lastName">
            <input type="text" placeholder="Last Name" />
          </div>

          <div className="form-emailAddress">
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="form-confirmEmailAddress">
            <input type="email" placeholder="Confirm Email Address" />
          </div>

          <div className="form-password">
            <input type="password" placeholder="Password" />
          </div>

          <div className="password-explained">
            <p>Your password must have at least:</p>
            <ul>
              <li>At least 8 characters</li>
              <li>1 uppercase letter</li>
              <li>1 lowercase letter</li>
              <li>1 symbol</li>
              <li>1 number</li>
            </ul>
          </div>

          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}
