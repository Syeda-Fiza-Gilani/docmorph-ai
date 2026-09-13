const { processDocument } = require("../services/DocumentService");
const { generate } = require("../services/WordService");

const {
  deleteFile,
  deleteFiles,
} = require("../services/CleanupService");

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded.",
      });
    }

    const result = await processDocument(req.file.path);

const wordFile = await generate(result.correctedText);

// Delete uploaded PDF
deleteFile(req.file.path);

// Delete temporary OCR images
deleteFiles(result.tempImages);

res.status(200).json({
  success: true,
  pages: result.pages,

processingTime: result.processingTime,

usedOCR: result.usedOCR,

usedAI: result.usedAI,

aiChunks: result.aiChunks,
ocrConfidence: result.ocrConfidence,
  correctedText: result.correctedText,
  fileName: wordFile.fileName,

  downloadUrl: `/api/download/${wordFile.fileName}`,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Processing failed.",
    });
  }
};