const fs = require("fs");

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑 Deleted: ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to delete ${filePath}:`, error.message);
  }
};

const deleteFiles = (filePaths = []) => {
  filePaths.forEach(deleteFile);
};

module.exports = {
  deleteFile,
  deleteFiles,
};