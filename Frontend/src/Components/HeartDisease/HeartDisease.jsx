import React, { useState } from 'react';
import axios from 'axios';

function HeartDisease() {
    const [formData, setFormData] = useState({
        age: '',
        sex: '0',
        cp: '0',
        trestbps: '',
        chol: '',
        fbs: '0',
        restecg: '0',
        thalach: '',
        exang: '0',
        oldpeak: '',
        slope: '0',
        ca: '',
        thal: '0'
    });

    const [prediction, setPrediction] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/heart_disease', { data: formData });

            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Heart Disease Prediction</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
                <select name="sex" value={formData.sex} onChange={handleChange}>
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                </select>
                <input type="number" name="cp" value={formData.cp} onChange={handleChange} placeholder="Chest Pain Type" />
                <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} placeholder="Resting Blood Pressure" />
                <input type="number" name="chol" value={formData.chol} onChange={handleChange} placeholder="Serum Cholesterol" />
                <select name="fbs" value={formData.fbs} onChange={handleChange}>
                    <option value="0">False</option>
                    <option value="1">True</option>
                </select>
                <select name="restecg" value={formData.restecg} onChange={handleChange}>
                    <option value="0">Normal</option>
                    <option value="1">ST-T wave abnormality</option>
                    <option value="2">Left ventricular hypertrophy</option>
                </select>
                <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} placeholder="Maximum Heart Rate" />
                <select name="exang" value={formData.exang} onChange={handleChange}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
                <input type="number" name="oldpeak" value={formData.oldpeak} onChange={handleChange} placeholder="ST Depression" />
                <select name="slope" value={formData.slope} onChange={handleChange}>
                    <option value="0">Upsloping</option>
                    <option value="1">Flat</option>
                    <option value="2">Downsloping</option>
                </select>
                <input type="number" name="ca" value={formData.ca} onChange={handleChange} placeholder="Number of Major Vessels" />
                <select name="thal" value={formData.thal} onChange={handleChange}>
                    <option value="0">Normal</option>
                    <option value="1">Fixed Defect</option>
                    <option value="2">Reversible Defect</option>
                </select>
                <button type="submit">Predict</button>
            </form>
            {prediction && <h2>Prediction: {prediction}</h2>}
        </div>
    );
}

export default HeartDisease;
