require("dotenv").config();

const ai = require("./config/gemini");

(async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: "Say hello to DocMorph AI in one sentence.",
    });

    console.log("\nGemini Response:\n");
    console.log(response.text);

  } catch (error) {
    console.error(error);
  }
})();