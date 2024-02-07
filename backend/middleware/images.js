// uploadMiddleware.js

const multer = require("multer");
const path = require("path");

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create multer instance
const upload = multer({ storage: storage });

module.exports = {
  uploadImage: upload.single("posterImage"),
};
