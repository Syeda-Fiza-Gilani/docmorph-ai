const fs = require("fs");
const path = require("path");

const convert = async (pdfPath) => {
  const { pdf } = await import("pdf-to-img");

  const document = await pdf(pdfPath);

  const outputDir = path.join(
    __dirname,
    "../../storage/temp"
  );

  const imagePaths = [];

  let pageNumber = 1;

  for await (const image of document) {
    const imagePath = path.join(
      outputDir,
      `page-${pageNumber}.png`
    );

    fs.writeFileSync(imagePath, image);

    imagePaths.push(imagePath);

    pageNumber++;
  }

  await document.destroy();

  return imagePaths;
};

module.exports = {
  convert,
};