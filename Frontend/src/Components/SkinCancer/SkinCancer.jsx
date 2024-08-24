import React, { useState } from 'react';
import axios from 'axios';

const SkinCancer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/skin_cancer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setResult(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('Error processing the request.');
    }
  };

  return (
    <div>
      <h2>Skin Cancer Detection</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload and Predict</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default SkinCancer;