/*
 * Filename: donationRoutes.js
 * Author: Usunobu Edeaghe
 * Date: December 11, 2023
 * Description: This file contains endpoints for the querying the Donation Table
 *
 */
const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const { authenticateUser } = require("../middleware/authentication");

/**
 * @route GET /api/donations/categories
 * @description Retrieves the total amount that has been donated by a User
 * @access Private (requires authentication)
 */
router.get("/total", authenticateUser, donationController.getUserDonatedAmount);

module.exports = router;
