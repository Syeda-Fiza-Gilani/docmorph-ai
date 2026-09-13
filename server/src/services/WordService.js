const fs = require("fs");
const path = require("path");

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
} = require("docx");

const generate = async (text) => {
  const lines = text.split("\n");

  const paragraphs = lines.map((line) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: line,
        }),
      ],
    });
  });

  const doc = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  const fileName = `document-${Date.now()}.docx`;

const outputPath = path.join(
  __dirname,
  "../../storage/processed",
  fileName
);

  fs.writeFileSync(outputPath, buffer);

  return {
  fileName,
  outputPath,
};
};

module.exports = {
  generate,
};