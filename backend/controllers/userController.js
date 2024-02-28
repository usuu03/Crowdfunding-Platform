// User.js
const db = require("../config/dbConfig");

const getUserById = async (userId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  return rows[0];
};

const updateUserById = async (userId, updatedUserData) => {
  const { newPassword, ...userData } = updatedUserData;

  if (newPassword) {
    userData.password = newPassword; // Make sure to hash the password before storing in production
  }

  const [result] = await db.query("UPDATE users SET ? WHERE id = ?", [
    userData,
    userId,
  ]);

  if (result.affectedRows > 0) {
    const updatedUser = await getUserById(userId);
    return updatedUser;
  }

  throw new Error("User not found or update failed");
};

const getTotalDonatedAmount = () => {};

const getUserDetails = async (req, res) => {
  try {
    const userID = req.user.userId;

    const userQuery = "SELECT * FROM Users WHERE userID=?";

    const [results] = await db.promise().query(userQuery, [userID]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User could not be found" });
    }

    const userDetails = results.map((user) => ({
      id: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      coins: user.coins,
    }));

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserById, updateUserById, getUserDetails };
