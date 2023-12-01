const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");

const editProfile = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, newPassword } = req.body;

  try {
    // Check if the user exists
    const [userRows] = await db.promise().query("SELECT * FROM Users WHERE userID = ?", [id]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password securely with bcrypt if provided
    let hashedPassword = userRows[0].password; // Keep the existing password if newPassword is not provided
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    // Update the user's profile in the Users table
    const [results] = await db.promise().query(
      "UPDATE Users SET firstName = ?, lastName = ?, password = ? WHERE userID = ?",
      [firstName, lastName, hashedPassword, id]
    );

    // Check if any rows were affected by the update
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch updated user data
    const [updatedUserRows] = await db.promise().query("SELECT * FROM Users WHERE userID = ?", [id]);

    // User profile updated successfully
    res.status(200).json({
      message: "User profile updated successfully",
      updatedUser: updatedUserRows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  editProfile,
};
