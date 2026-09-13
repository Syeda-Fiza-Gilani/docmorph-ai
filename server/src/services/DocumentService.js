const { analyzePDF } = require("./PDFService");
const { extractText } = require("./TextService");
const { convert } = require("./PDFImageService");
const { extract } = require("./OCRService");
const { correct } = require("./AIService");
const { chunkText } = require("../utils/chunkText");
const { retry } = require("../utils/retry");

const processDocument = async (pdfPath) => {
  const startTime = Date.now();
  const analysis = await analyzePDF(pdfPath);

  let text = "";
  let imagePaths = [];
  let usedOCR = false;

  let ocrConfidence = 0;

  let confidenceSum = 0;
let confidenceCount = 0;

  // Searchable PDF
  if (analysis.hasText) {
    console.log("📄 Searchable PDF detected...");
    text = await extractText(pdfPath);
    ocrConfidence = null;
  }

  // Scanned PDF
  else {
    console.log("🖼️ Scanned PDF detected...");
    usedOCR = true;

    imagePaths = await convert(pdfPath);

    for (const imagePath of imagePaths) {

    const result = await extract(imagePath);

    text += result.text + "\n";

    confidenceSum += result.confidence;

    confidenceCount++;
}

if (confidenceCount > 0) {

    ocrConfidence = Number(
        (confidenceSum / confidenceCount).toFixed(2)
    );

}
  }

  // Split OCR text into manageable chunks
  const chunks = chunkText(text);
  const aiChunks = chunks.length;

  let correctedText = "";
  let usedAI = false;

  console.log(`📝 Total Chunks: ${chunks.length}`);

  for (let i = 0; i < chunks.length; i++) {
    console.log(`🤖 Correcting chunk ${i + 1}/${chunks.length}...`);

    try {
      const aiResult = await retry(() => correct(chunks[i]));

      usedAI = true;
      correctedText += aiResult.correctedText + "\n\n";

      console.log(`✅ Chunk ${i + 1} complete.`);
    } catch (error) {
      console.log(
        `⚠️ Gemini unavailable for chunk ${i + 1}. Using OCR text.`
      );

      correctedText += chunks[i] + "\n\n";

      console.error(error.message);
    }
  }


  const endTime = Date.now();

const processingTime = (
  (endTime - startTime) / 1000
).toFixed(2);

  return {

    pages: analysis.pages,

    correctedText,

    processingTime,

    usedOCR,

    usedAI,

    aiChunks,

    ocrConfidence,

    tempImages: imagePaths,

};
};

module.exports = {
  processDocument,
};