# 🔍 AI Image to Text Extractor

An advanced, stylish, and fully functional React + Vite-based web app that extracts text from uploaded images or camera captures using AI (Gemini API). Supports dark/light mode, PDF/.docx export, and text-to-speech functionality.

---

## 🚀 Features

- 📸 Upload or capture images via webcam
- 🤖 AI-powered OCR using Gemini API
- 🌗 Toggle between Dark and Light modes
- 📄 Download extracted text as `.txt`, `.pdf`, `.docx`
- 🎨 Beautiful Neon UI with Glassmorphism
- 🧹 Reset input/output instantly
- 🪄 Smooth animations and responsive design

---
## 🚀 Live Preview

---
## 📷 Screenshots

---

## 🛠️ Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React + Vite       |
| Styling   | Pure CSS (Glassmorphism, Animations) |
| API       | Gemini AI (OCR)    |
| Exporting | `file-saver`, `jspdf`, `docx` |
| Webcam    | `navigator.mediaDevices.getUserMedia` |

---

## 📁 Project Structure

```

Ai-Image-to-Text/
├── public/
│   └── camera.html            # Standalone camera capture window
├── src/
│   ├── components/
│   │   └── OCRForm.jsx        # Main OCR UI & logic
│   ├── services/
│   │   └── geminiAPI.js       # Gemini API handler
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css              # Theme & UI styling
├── index.html
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kingofallsnakes/Ai-Image-to-Text.git
   cd Ai-Image-to-Text
   ````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the App**

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🔐 Gemini API Setup

> ✨ You must have a valid [Gemini API Key](https://aistudio.google.com/apikey).

 Create your API key the paste in src/services/geminiApi.js :

   ```
  const API_KEY=your_api_key_here
   ```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📢 Credits

* 💡 Developed by [@kingofallsnakes](https://github.com/kingofallsnakes)
* 🔍 Gemini OCR API by Google
* 🛠️ Tools: React, Vite, jsPDF, docx, FileSaver

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---
