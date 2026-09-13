const { processScannedPDF } = require("./services/DocumentService");

(async () => {
  try {
    const text = await processScannedPDF(
      "./storage/uploads/1782976088304.pdf"
    );

    console.log("\n==============================");
    console.log("FULL DOCUMENT");
    console.log("==============================\n");

    console.log(text);

  } catch (err) {
    console.error(err);
  }
})();