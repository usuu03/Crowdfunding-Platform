const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const editprofileController = require("../controllers/editprofileController");

router.put("/:id", authenticateUser, editprofileController.updateProfile);

module.exports = router;
