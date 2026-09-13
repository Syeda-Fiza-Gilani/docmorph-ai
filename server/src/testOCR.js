const { extractText } = require("./services/OCRService");

(async () => {
  try {
    const text = await extractText(
      "./storage/temp/page-1.png"
    );

    console.log("\n====================");
    console.log("OCR RESULT");
    console.log("====================\n");

    
console.log("\nConfidence:");
console.log(result.confidence);

console.log("\nText:");
console.log(result.text);

console.log("\nWords detected:");
console.log(result.words.length);
  } catch (err) {
    console.error(err);
  }
})();