const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Campaign route
router.get("/categories", categoryController.getAllCategories);

// Campaign route
router.get("/regions", regionController.getAllRegions);

router.get("/all", campaignController.getAllCampaigns);

module.exports = router;
