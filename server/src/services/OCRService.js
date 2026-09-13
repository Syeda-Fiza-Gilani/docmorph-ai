const Tesseract = require("tesseract.js");

const extract = async (imagePath) => {
  console.log(`\n📄 OCR: ${imagePath}`);

  const result = await Tesseract.recognize(
    imagePath,
    "eng",
    {
      logger: (info) => {
        if (info.status === "recognizing text") {
          process.stdout.write(
            `\rProgress: ${Math.round(info.progress * 100)}%`
          );
        }
      },
    }
  );

  console.log("\n✅ OCR Complete");

  return {
    text: result.data.text,
    confidence: result.data.confidence,
    words: result.data.words,
  };
};

module.exports = {
  extract,
};