const { convert } = require("./services/PDFImageService");

(async () => {
  try {
    const result = await convert(
      "./storage/uploads/1782976088304.pdf"
    );

    console.log(result);

  } catch (err) {
    console.error(err);
  }
})();