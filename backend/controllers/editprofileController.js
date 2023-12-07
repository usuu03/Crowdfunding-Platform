const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, newPassword } = req.body;
    const { id } = req.params;

    // Use the promise interface to create a connection
    const connection = await db.promise();

    // Check if the user exists
    const [userRows] = await connection.query("SELECT * FROM Users WHERE userID = ?", [id]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile
    const updateQuery =
      "UPDATE Users SET firstName = ?, lastName = ?, password = ? WHERE userID = ?";
    
    // Hash the new password securely with bcrypt, if provided
    let hashedPassword = userRows[0].password;
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    await connection.query(updateQuery, [firstName, lastName, hashedPassword, id]);

    // Retrieve the updated user data
    const [updatedUserRows] = await connection.query("SELECT * FROM Users WHERE userID = ?", [id]);

    res.status(200).json({ message: "Profile updated successfully", user: updatedUserRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { updateProfile };
