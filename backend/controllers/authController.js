const db = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;

    // Hash the password securely with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the Users table with the hashed password
    const insertQuery =
      "INSERT INTO Users (firstName, lastName, emailAddress, password) VALUES (?, ?, ?, ?)";
    await db
      .promise()
      .query(insertQuery, [firstName, lastName, emailAddress, hashedPassword]);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error during registration" });
  }
};

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Find the user by email address
    const selectQuery = "SELECT * FROM Users WHERE emailAddress = ?";
    const [results] = await db.promise().query(selectQuery, [emailAddress]);

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    // console.log("Input Password:", password);
    // console.log("Stored Password Hash:", user.password);

    // Check the password using bcrypt
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    // console.log("Password Match:", isMatch);

    if (isMatch) {
      // Generate a JWT token if the password is correct
      const token = jwt.sign(
        { userId: user.userID },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Login successful", token, user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);

    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: `Login Unsuccessful: ${error.message}` });
    }
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const [userRows] = await db
      .promise()
      .query("SELECT * FROM Users WHERE userID = ?", [id]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from the User table
    const [results] = await db
      .promise()
      .query("DELETE FROM Users WHERE userID = ?", [id]);

    // Check if any rows were affected by the delete
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // User deleted successfully
    res.status(200).json({ message: "User deleted successfully", results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  deleteUser,
};
