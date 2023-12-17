/*
 * Filename: campaignRoutes.js
 * Author: Michael Omoyele
 * Date: October 25, 2023
 * Description: Defines routes related to campaigns using the campaignController.
 */

const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const { authenticateUser } = require("../middleware/authentication");

/**
 * @route GET /api/campaigns/categories
 * @description Retrieves all unique categories of campaigns.
 * @access Public
 */
router.get("/categories", campaignController.getAllCategories);

/**
 * @route GET /api/campaigns/country
 * @description Retrieves all unique countries associated with campaigns.
 * @access Public
 */
router.get("/country", campaignController.getAllCountries);

/**
 * @route GET /api/campaigns/all
 * @description Retrieves all campaigns.
 * @access Public
 */
router.get("/all", campaignController.getAllCampaigns);

/**
 * @route POST /api/campaigns/add-campaign
 * @description Adds a new campaign to the database.
 * @access Private (Requires authentication)
 */
router.post("/add-campaign", authenticateUser, campaignController.addCampaign);

/**
 * @route POST /api/campaigns/search
 * @description Searches campaigns based on a provided title.
 * @access Public
 */
router.post("/search", campaignController.searchCampaigns);

/**
 * @route GET /api/campaigns/user
 * @description Retrieves campaigns created by the authenticated user.
 * @access Private (Requires authentication)
 */
router.get("/user", authenticateUser, campaignController.getUserCampaigns);

/**
 * @route GET /api/campaigns/user/following
 * @description Retrieves campaigns followed by the authenticated user.
 * @access Private (Requires authentication)
 */
router.get(
  "/user/following",
  authenticateUser,
  campaignController.getUserFollowedCampaigns
);

/**
 * @route GET /api/campaigns/user/donated
 * @description Retrieves campaigns that the authenticated user has donated to
 * @access Private (Requires authentication)
 */

router.get(
  "/user/donated",
  authenticateUser,
  campaignController.getUserDonatedCampaigns
);

/**
 * @route PUT /api/campaigns/update/:id
 * @description Updates the Campaign the user has created
 * @access Private (Requires authentication)
 */
router.put("/update/:id", authenticateUser, campaignController.updateCampaigns);

/**
 * @route DELETE /api/campaigns/delete/:id
 * @description Deletes the Campaign created has created
 * @access Private (Requires authentication)
 */
router.delete(
  "/delete/:id",
  authenticateUser,
  campaignController.deleteCampaign
);

router.get("/:id", campaignController.getCampaignById);

module.exports = router;
