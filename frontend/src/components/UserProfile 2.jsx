import React from "react";
import { Link } from "react-router-dom";

export default function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.emailAddress}</p>
      {/* Add other user details */}
      <Link to="/edit-profile">Edit Profile</Link>
    </div>
  );
}
