# DocMorph AI

> **Transform PDFs into editable Word documents — with OCR, AI-powered text correction, and layout-aware processing.**

DocMorph AI is a full-stack web application that converts PDF documents into editable `.docx` files.

It combines **OCR technology** for scanned documents with **Google Gemini AI** to improve extracted text before generating the final Word document.

The project was built as a practical full-stack application with a clean SaaS-style interface and a focus on a simple document-conversion workflow.

---

## ✨ Features

* 📄 **PDF to Word conversion**
* 🔍 **OCR support** for scanned and image-based PDFs
* 🤖 **AI-powered text correction** using Google Gemini
* 📝 **Editable `.docx` output**
* 🖱️ **Drag & drop PDF upload**
* 📦 **File size validation**
* ⚡ **Real-time processing states**
* 🔒 **Automatic temporary-file cleanup**
* 📱 **Responsive modern UI**
* 🚨 **Error handling for invalid uploads and failed conversions**

---

## 🖥️ How It Works

```text
PDF Upload
    │
    ▼
Multer File Upload
    │
    ▼
PDF Processing
    │
    ├── Text-based PDF
    │       │
    │       ▼
    │   Text Extraction
    │
    └── Scanned PDF
            │
            ▼
          OCR
            │
            ▼
      Extracted Text
            │
            ▼
     Gemini AI Correction
            │
            ▼
      Word Document
            │
            ▼
       .docx Download
```

The application automatically processes the uploaded document and generates a Word document that can be downloaded from the browser.

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **Tailwind CSS**
* **Axios**
* **Lucide React**

### Backend

* **Node.js**
* **Express.js**
* **Multer**
* **OCR processing**
* **Google Gemini API**
* **DOCX generation**

### Architecture

```text
DocMorph AI
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── ...
│
└── server/                 # Express backend
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   └── middleware/
    └── ...
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

---

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

> **Important:** Never commit your real API key to GitHub.

Make sure `.env` is included in your `.gitignore`.

Start the backend:

```bash
npm start
```

The server should run on:

```text
http://localhost:5000
```

---

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

The backend requires a Gemini API key for AI-powered text correction.

| Variable         | Description                     |
| ---------------- | ------------------------------- |
| `PORT`           | Port used by the Express server |
| `GEMINI_API_KEY` | Google Gemini API key           |

Example:

```env
PORT=5000
GEMINI_API_KEY=your_api_key_here
```

### Security

API keys should **never** be placed directly inside frontend code or committed to GitHub.

Use environment variables and keep your `.env` file private.

---

## 📡 API

### Upload & Convert

```http
POST /api/upload
```

Accepts a PDF file using the multipart form field:

```text
pdf
```

Example response:

```json
{
  "success": true,
  "pages": 3,
  "processingTime": 5421,
  "usedOCR": true,
  "usedAI": true,
  "aiChunks": 2,
  "ocrConfidence": 94.2,
  "fileName": "document-123456789.docx",
  "downloadUrl": "/api/download/document-123456789.docx"
}
```

### Download

```http
GET /api/download/:filename
```

Returns the generated Word document.

---

## 📂 Project Structure

```text
client/
│
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── ConvertCard.jsx
│   │   │   ├── FeatureRow.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   └── SecurityStrip.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx
│   │       └── Container.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── services/
│   │   └── api.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
└── package.json


server/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── storage/
│   ├── processed/
│   └── uploads/
│
└── package.json
```

---

## 🧠 AI Processing

DocMorph AI uses Gemini to help improve OCR/extracted text before generating the Word document.

This is particularly useful for scanned documents where OCR can introduce errors such as:

* Incorrect characters
* Missing punctuation
* Broken words
* Formatting inconsistencies
* Recognition mistakes

The AI correction step helps produce cleaner text before it is converted into the final `.docx` file.

---

## 🧹 File Cleanup

Uploaded PDFs and temporary OCR files are removed after processing.

Generated Word documents are stored temporarily so they can be downloaded by the user.

This keeps the processing pipeline cleaner and reduces unnecessary temporary files.

---

## ⚠️ Current Limitations

DocMorph AI is currently a portfolio/demo project and has some limitations:

* Maximum upload size is **50 MB**
* Processing time depends on PDF size and number of pages
* Complex PDF layouts may not be reproduced perfectly
* OCR accuracy depends on the quality of the source document
* AI correction requires a valid Gemini API key
* Local development currently uses separate frontend and backend servers

---

## 🔮 Future Improvements

Possible improvements for future versions include:

* [ ] Better preservation of original PDF formatting
* [ ] Tables and image extraction
* [ ] Page-by-page conversion progress
* [ ] User authentication
* [ ] Cloud file storage
* [ ] Conversion history
* [ ] Multiple output formats
* [ ] Production deployment
* [ ] Rate limiting and advanced security
* [ ] Background job processing for large documents

---

## 🎯 Why I Built This

DocMorph AI was built as a full-stack portfolio project to explore how a real document-processing application works from end to end.

The project combines:

**Frontend development → API integration → file uploads → OCR → AI processing → document generation → file downloads**

Rather than building only a UI prototype, the goal was to create a working pipeline where a real PDF can be uploaded and converted into an actual editable Word document.

---

## 📸 Screenshots

<img width="1587" height="797" alt="image" src="https://github.com/user-attachments/assets/20a70bbf-c44e-4b8b-be5a-2b9cf21acde0" />

<img width="1588" height="797" alt="image" src="https://github.com/user-attachments/assets/a470c6dd-7814-4536-a498-800f60c547fa" />

<img width="1585" height="787" alt="image" src="https://github.com/user-attachments/assets/4f71f922-a666-45de-bac7-4018c7ddd67a" />

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you'd like to contribute:

```bash
git fork
git clone
git checkout -b feature/your-feature
```

Make your changes, test them locally, and open a pull request.

---

## 📄 License

This project is available for educational and portfolio purposes.

---

## 👨‍💻 Author

Syeda Fiza Gilani

Built with React, Node.js, Express, OCR, and Gemini AI.

⭐ If you find this project interesting, consider giving the repository a star.
