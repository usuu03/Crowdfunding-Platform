const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");

//Categories of Campaigns
router.get("/categories", campaignController.getAllCategories);

// Region of the Campaign
router.get("/regions", campaignController.getAllRegions);

router.get("/all", campaignController.getAllCampaigns);

router.post("/add-campaign", campaignController.addCampaign);

module.exports = router;
