const db = require('../config/dbConfig');

const getUserById = async (userId) => {
  const [rows] = await db.promise().query('SELECT * FROM Users WHERE userID = ?', [userId]);
  return rows[0];
};

const updateUserById = async (userId, updatedUserData) => {
  const { newPassword, ...userData } = updatedUserData;

  if (newPassword) {
    userData.password = newPassword;
  }

  const [result] = await db.promise().query('UPDATE Users SET ? WHERE UserID = ?', [userData, userId]);

  if (result.affectedRows > 0) {
    const updatedUser = await getUserById(userId);
    return updatedUser;
  }

  throw new Error('User not found or update failed');
};

module.exports = { getUserById, updateUserById };