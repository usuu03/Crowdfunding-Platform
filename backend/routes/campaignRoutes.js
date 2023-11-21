const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const { authenticateUser } = require("../middleware/authentication");

//Categories of Campaigns
router.get("/categories", campaignController.getAllCategories);

// Region of the Campaign
router.get("/regions", campaignController.getAllRegions);

router.get("/all", authenticateUser, campaignController.getAllCampaigns);

router.post("/add-campaign", authenticateUser, campaignController.addCampaign);

module.exports = router;
