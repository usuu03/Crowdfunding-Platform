// UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserEditForm from './UserEditForm';

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user details from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/1'); // Assuming user ID is 1
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateUser = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  return (
    <div className="UserProfile">
      {userData && (
        <div>
          <h2>User Profile</h2>
          <p>User ID: {userData.userID}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email Address: {userData.emailAddress}</p>
          {/* Other user details display */}
          <UserEditForm userData={userData} onUpdateUser={handleUpdateUser} />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
