const express = require("express");

const router = express.Router();

const {
  downloadWord,
} = require("../controllers/downloadController");

router.get("/download/:filename", downloadWord);

module.exports = router;