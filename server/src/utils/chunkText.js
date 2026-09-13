const chunkText = (text, maxLength = 4000) => {
  const chunks = [];

  let start = 0;

  while (start < text.length) {
    let end = start + maxLength;

    // Don't split in the middle of a word
    if (end < text.length) {
      while (end > start && text[end] !== " ") {
        end--;
      }
    }

    chunks.push(text.slice(start, end).trim());

    start = end;
  }

  return chunks;
};

module.exports = {
  chunkText,
};