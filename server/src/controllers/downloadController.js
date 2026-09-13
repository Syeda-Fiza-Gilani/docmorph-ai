const path = require("path");
const fs = require("fs");

exports.downloadWord = (req, res) => {
  const { filename } = req.params;

  const filePath = path.join(
    __dirname,
    "../../storage/processed",
    filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found.",
    });
  }

  res.download(filePath);
};