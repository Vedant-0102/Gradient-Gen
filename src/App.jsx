import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [colorOne, setColorOne] = useState('#7986cb');
  const [colorTwo, setColorTwo] = useState('#1a237e');
  const [currentDirection, setCurrentDirection] = useState('to bottom');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const directions = [
    { value: 'to top', icon: '↑', label: 'Top' },
    { value: 'to bottom', icon: '↓', label: 'Bottom' },
    { value: 'to right', icon: '→', label: 'Right' },
    { value: 'to left', icon: '←', label: 'Left' },
    { value: 'to top right', icon: '↗', label: 'Top Right' },
    { value: 'to bottom left', icon: '↙', label: 'Bottom Left' },
    { value: 'to bottom right', icon: '↘', label: 'Bottom Right' },
    { value: 'to top left', icon: '↖', label: 'Top Left' }
  ];

  const generateCode = () => {
    const code = `background: linear-gradient(${currentDirection}, ${colorOne}, ${colorTwo});`;
    setGeneratedCode(code);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = generatedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  useEffect(() => {
    generateCode();
  }, [colorOne, colorTwo, currentDirection]);

  const gradientStyle = {
    background: `linear-gradient(${currentDirection}, ${colorOne}, ${colorTwo})`
  };

  return (
    <div className="app" style={gradientStyle}>
      <div className="container">
        <div className="header">
          <h1>Gradient Generator</h1>
          <p>Create beautiful CSS gradients with ease</p>
        </div>

        <div className="color-section">
          <div className="color-picker">
            <label>Start Color</label>
            <input
              type="color"
              value={colorOne}
              onChange={(e) => setColorOne(e.target.value)}
              className="color-input"
            />
            <span className="color-value">{colorOne}</span>
          </div>
          <div className="color-picker">
            <label>End Color</label>
            <input
              type="color"
              value={colorTwo}
              onChange={(e) => setColorTwo(e.target.value)}
              className="color-input"
            />
            <span className="color-value">{colorTwo}</span>
          </div>
        </div>

        <div className="direction-section">
          <label className="section-label">Direction</label>
          <div className="direction-grid">
            {directions.map((direction) => (
              <button
                key={direction.value}
                className={`direction-btn ${currentDirection === direction.value ? 'active' : ''}`}
                onClick={() => setCurrentDirection(direction.value)}
                title={direction.label}
              >
                <span className="direction-icon">{direction.icon}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="preview-section">
          <label className="section-label">Preview</label>
          <div className="preview-box" style={gradientStyle}></div>
        </div>

        <div className="output-section">
          <label className="section-label">CSS Code</label>
          <div className="code-container">
            <textarea
              value={generatedCode}
              readOnly
              className="code-output"
              rows="2"
            />
            <button
              className={`copy-btn ${copySuccess ? 'success' : ''}`}
              onClick={copyToClipboard}
            >
              {copySuccess ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;