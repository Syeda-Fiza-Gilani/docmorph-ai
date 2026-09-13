import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function convertPdfToWord(file) {
  const formData = new FormData();

  formData.append("pdf", file);

  const { data } = await client.post("/upload", formData);

  return data;
}

export async function downloadConvertedFile(downloadUrl) {
  const { data } = await client.get(downloadUrl, {
    responseType: "blob",
  });

  return data;
}