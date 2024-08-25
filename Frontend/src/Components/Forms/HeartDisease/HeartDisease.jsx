import React, { useState } from "react";
import axios from "axios";

function HeartDisease() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "0",
    cp: "0",
    trestbps: "",
    chol: "",
    fbs: "0",
    restecg: "0",
    thalach: "",
    exang: "0",
    oldpeak: "",
    slope: "0",
    ca: "",
    thal: "0",
  });

  const [prediction, setPrediction] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/heart_disease", {
        data: formData,
      });

      setPrediction(response.data.prediction);
      setShowModal(true); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPrediction(""); 
  };

  return (
    <div className="App min-h-screen bg-slate-700 flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Heart Disease Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
          <input
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            placeholder="Chest Pain Type"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
            placeholder="Resting Blood Pressure"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
            placeholder="Serum Cholesterol"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="0">False</option>
            <option value="1">True</option>
          </select>
          <select
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="0">Normal</option>
            <option value="1">ST-T wave abnormality</option>
            <option value="2">Left ventricular hypertrophy</option>
          </select>
          <input
            type="number"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
            placeholder="Maximum Heart Rate"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="exang"
            value={formData.exang}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
          <input
            type="number"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            placeholder="ST Depression"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="slope"
            value={formData.slope}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
          <input
            type="number"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
            placeholder="Number of Major Vessels"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="thal"
            value={formData.thal}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="0">Normal</option>
            <option value="1">Fixed Defect</option>
            <option value="2">Reversible Defect</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Predict
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-center">
                Prediction: {prediction}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeartDisease;
