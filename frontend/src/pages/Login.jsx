import React from "react";

export default function Login() {
  return (
    <div className="container">
      <h2 className="register-title">Sign in to Crowdfunding Platform</h2>
      <div>
        <p>
          Do not have an account? <a href="">Sign Up</a>
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
            <button className="btn btn-primary">Sign In</button>{" "}
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
