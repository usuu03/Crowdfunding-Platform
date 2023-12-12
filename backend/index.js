const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const userRoutes = require("./routes/UserRoute"); // Add this line

const { authenticateUser } = require("./middleware/authentication");

app.use("/user", authRoutes);

// Use the user routes
app.use("/user", userRoutes);

app.use('/api/users', userRoutes);

app.use("/api/campaigns", campaignRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
