import React from "react";

export default function Login() {
  return (
    <div className="container">
      <div>
        <p>
          Do not have an account?<a href="">Sign Up</a>
        </p>
      </div>
      <div className="form-container">
        <h6>Your Account Details</h6>
        <form action="">
          <div className="input-email">
            <label htmlFor="">Email:</label>
            <input type="text" />
          </div>

          <div className="input-password">
            <label htmlFor="">Password:</label>
            <input type="password" />
          </div>

          <button>Sign In</button>
        </form>
      </div>

      <p>
        <a href="">Forgot your password?</a>
      </p>
    </div>
  );
}
