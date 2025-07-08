import React, { useState, useEffect } from 'react';
import OCRForm from './components/OCRForm';
import './App.css'; // Make sure your CSS file is imported

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Optional: Persist dark mode with localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem('theme');
    if (storedMode) setDarkMode(storedMode === 'dark');
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : 'light'}`}>
      <div className="app-container">
        <h1 className="title">Cobra AI Image to Text Extractor</h1>

        <button
          className="toggle-mode"
          onClick={() => setDarkMode(prev => !prev)}
        >
         {darkMode ? 'Light' : 'Dark'} Mode
        </button>

        <OCRForm darkMode={darkMode} />
      </div>
    </div>
  );
};

export default App;
