const fs = require("fs");
const pdf = require("pdf-parse");

const analyzePDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdf(buffer);

  const textLength = data.text.trim().length;
  const hasText = textLength > 50;

  return {
    pages: data.numpages,
    textLength,
    hasText,
    documentType: hasText ? "searchable" : "scanned",
    needsOCR: !hasText,
  };
};

module.exports = {
  analyzePDF,
};