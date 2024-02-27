/*
 * Filename: index.js
 * Author: Usu Edeaghe
 * Date: October 10, 2023
 * Description: This file contains
 *
 */

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const userRoutes = require("./routes/userRoutes");
const donationRoutes = require("./routes/donationRoutes");
const { log } = require("console");

// Use the user routes
app.use("/api/user", userRoutes);

app.use("/user", authRoutes);

app.use("/api/campaigns", campaignRoutes);

app.use("/api/donations", donationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("====================================");
  console.log(`App listening on port ${port}`);

  console.log("====================================");
});
