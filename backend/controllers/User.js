// User.js
const db = require('../config/dbConfig');

const getUserById = async (userId) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  return rows[0];
};

const updateUserById = async (userId, updatedUserData) => {
  const { newPassword, ...userData } = updatedUserData;

  if (newPassword) {
    userData.password = newPassword; // Make sure to hash the password before storing in production
  }

  const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [userData, userId]);

  if (result.affectedRows > 0) {
    const updatedUser = await getUserById(userId);
    return updatedUser;
  }

  throw new Error('User not found or update failed');
};

module.exports = { getUserById, updateUserById };
