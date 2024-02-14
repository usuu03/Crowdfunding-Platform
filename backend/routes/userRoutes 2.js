// user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authentication");

router.get("/details", authenticateUser, userController.getUserDetails);

module.exports = router;
