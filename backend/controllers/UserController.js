const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const emailController = require('../controllers/emailController');

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
    }));

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { lastName, firstName, emailAddress, password } = req.body;

    // Hash the password securely with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateQuery = `UPDATE Users
      SET lastName=?, firstName=?, emailAddress=?, password=?
      WHERE userId=?`;

    const values = [lastName, firstName, emailAddress, hashedPassword, userId];

    const subject = 'Profile Update Confirmation';
    const html = `<p>Dear ${firstName},</p><p>Your profile has been successfully updated.</p>`;
    await emailController.sendEmail(emailAddress, subject, html);

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating user details:", err);
        res
          .status(500)
          .json({ error: "Internal Server Error", details: err.message });
      } else {
        console.log("User details updated successfully");
        res.status(200).json({ message: "User details updated successfully" });
      }
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  updateUserDetails,
  getUserDetails,
};
