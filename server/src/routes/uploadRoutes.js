const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadPDF,
} = require("../controllers/uploadController");

router.post(
  "/upload",
  upload.single("pdf"),
  uploadPDF
);

module.exports = router;