import axios from 'axios';

const API_KEY = 'AIzaSyC5m9czi03vQS0zgCMUgI_EWqKg6ydzIAw';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const extractTextFromImage = async (base64Image) => {
  const body = {
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: 'Extract multilingual printed and handwritten text. Preserve layout. Fix grammar. Translate to English if needed.'
          }
        ]
      }
    ]
  };

  try {
    const res = await axios.post(ENDPOINT, body);
    return res.data.candidates[0]?.content?.parts[0]?.text || 'No text found';
  } catch (err) {
    return 'Failed to extract text.';
  }
};