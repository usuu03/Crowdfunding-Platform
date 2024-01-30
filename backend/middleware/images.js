// uploadMiddleware.js
import { v2 as cloudinary } from "cloudinary";
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: "djaylhbph",
  api_key: "149185691639867",
  api_secret: "jkBm42de6S5CBFzt3tT-lbucqv4",
});

// Define storage for multer
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create multer instance
const upload = multer({ storage: storage });

// Middleware function to upload image to Cloudinary
const uploadImage = (req, res, next) => {
  upload.single("posterImage")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Failed to upload image" });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Set the Cloudinary URL as the file path
      req.file.path = result.secure_url;

      // Call next middleware
      next();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res
        .status(500)
        .json({ error: "Failed to upload image to Cloudinary" });
    }
  });
};

module.exports = {
  uploadImage: uploadImage,
};
