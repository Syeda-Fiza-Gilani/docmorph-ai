const { generate } = require("./services/WordService");

(async () => {
  try {

    const sample = `
DocMorph AI

This is my first generated Word document.

Generated using:

React
Express
Tesseract
Gemini AI

Mission Complete 🚀
`;

    const output = await generate(sample);

    console.log("Word file created:");

    console.log(output);

  } catch (err) {
    console.error(err);
  }
})();