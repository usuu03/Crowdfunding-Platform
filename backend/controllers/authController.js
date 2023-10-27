const db = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    //Finding the user by email address
    db.query(
      "SELECT * FROM User WHERE emailAddress = ?",
      [emailAddress],
      async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Login Failed" });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "User not found" });
        }

        //Checking the password
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ emailAddress }, "your-secret-key", {
          expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login successful", token });
  }
};

const register = (req, res) => {};

module.exports = {
  login,
  register,
};
