require("dotenv").config();

const { correct } = require("./services/AIService");

(async () => {
  try {
    const sample = `
MCOs

Hypotalames

Modula oblongata

metabolism of dru occur i:
`;

    const corrected = await correct(sample);

    console.log("\n===== ORIGINAL =====\n");
    console.log(sample);

    console.log("\n===== CORRECTED =====\n");
    console.log(corrected);

  } catch (err) {
    console.error(err);
  }
})();