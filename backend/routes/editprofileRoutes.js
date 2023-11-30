const express = require("express");
const router = express.Router();
const profileController = require("../controllers/editprofileController");

router.put("/:id", profileController.editProfile);

module.exports = router;
