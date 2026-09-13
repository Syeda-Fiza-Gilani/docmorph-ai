const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const retry = async (
  fn,
  maxAttempts = 3,
  initialDelay = 2000
) => {
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxAttempts}`);

      return await fn();

    } catch (error) {

      const status = error.status || error.code;

      console.log(`❌ Attempt ${attempt} failed.`);

      if (attempt === maxAttempts) {
        throw error;
      }

      console.log(`⏳ Waiting ${delay / 1000} seconds...`);

      await sleep(delay);

      delay *= 2; // Exponential Backoff
    }
  }
};

module.exports = {
  retry,
};