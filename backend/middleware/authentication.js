const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Check if the token starts with "Bearer " and extract the token part
    const tokenPart = token.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET_KEY);

    // Attach user information to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateUser };
