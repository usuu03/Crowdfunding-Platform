const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authenticateUser } = require("../middleware/authentication");

router.put(
  "/update-user-details",
  authenticateUser,
  userController.updateUserDetails
);

router.get("/details", authenticateUser, userController.getUserDetails);

module.exports = router;