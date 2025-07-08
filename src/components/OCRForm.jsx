import React, { useState } from 'react';
import { extractTextFromImage } from '../services/geminiAPI';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph } from 'docx';

const OCRForm = () => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const synth = window.speechSynthesis;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(setImages);
  };

  const captureFromCamera = () => {
    window.open('/camera.html', 'Camera Capture', 'width=600,height=500');

    const handleMessage = (event) => {
      if (event.data?.type === 'captured-image' && event.data.image) {
        setImages([event.data.image]);
      }
    };

    window.addEventListener('message', handleMessage, { once: true });
  };

  const handleSubmit = async () => {
    if (!images.length) return;
    setLoading(true);
    let fullText = '';
    for (let img of images) {
      const base64 = img.split(',')[1];
      const result = await extractTextFromImage(base64);
      fullText += result + '\n';
    }
    setText(fullText);
    setLoading(false);
  };

  const copyText = () => navigator.clipboard.writeText(text);

  const saveAsTxt = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'output.txt');
  };

  const saveAsPdf = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save('output.pdf');
  };

  const saveAsDocx = async () => {
    const doc = new Document({
      sections: [{
        children: [new Paragraph(text)]
      }]
    });
    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, 'output.docx');
  };

  // 🔁 Reset image & text
  const resetAll = () => {
    setImages([]);
    setText('');
  };

  return (
    <div className="ocr-container">
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <button onClick={captureFromCamera} className="mt-2">📸 Capture from Camera</button>

      <div className="preview mt-4">
        {images.length > 0 && (
          <img
            src={images[0]}
            alt="Preview"
            style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: '10px' }}
          />
        )}
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Extract Text'}
      </button>
      <button onClick={resetAll} className="ml-2 bg-red-600 text-white rounded px-4 py-1 hover:bg-red-700">
        🔁 Reset
      </button>

      <textarea
        value={text}
        readOnly
        className="text-preview"
        placeholder="Extracted text will appear here..."
        rows={8}
      />

      <div className="action-buttons">
        <button onClick={copyText}>📋 Copy Text</button>
        <button onClick={saveAsTxt}>💾 Save .txt</button>
        <button onClick={saveAsPdf}>💾 Save .pdf</button>
        <button onClick={saveAsDocx}>💾 Save .docx</button>
      </div>
    </div>
  );
};

export default OCRForm;
