import React, { useState } from 'react';
import axios from 'axios';
import Buttonpink from '../../Buttons/Buttonpink';
function PreDiabetes() {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        polyuria: 0,
        polydipsia: 0,
        sudden_weight_loss: 0,
        weakness: 0,
        polyphagia: 0,
        genital_thrush: 0,
        visual_blurring: 0,
        itching: 0,
        irritability: 0,
        delayed_healing: 0,
        partial_paresis: 0,
        muscle_stiffness: 0,
        alopecia: 0,
        obesity: 0
    });

    const [result, setResult] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let val;

        if (type === 'checkbox') {
            val = checked ? 1 : 0;
        } else if (name === 'gender') {
            val = value === 'Male' ? 1 : 0;
        } else {
            val = value;
        }

        setFormData({ ...formData, [name]: val });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setResult('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            setResult(response.data.prediction);
            console.log(response.data.prediction);
            setShowModal(true);
        } catch (error) {
            console.error('Error making prediction:', error);
            setResult('Error making prediction');
            setShowModal(true);
        }
    };

    return (
        <div className="h-full w-full flex flex-wrap justify-center mt-12 mb-12 px-4">
            <div className="min-h-[86vh] h-full w-full max-w-5xl p-6 z-10 flex flex-col rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
                <h1 className="text-3xl font-extrabold text-center text-white mb-5">
                    Pre-Diabetes Prediction
                </h1>
                <form className='flex flex-wrap max-w-5xl justify-center gap-5'>
                    {Object.keys(formData).map((key, index) => (
                        <div className='mb-5 flex flex-col w-[33%] min-h-10 justify-between' key={index}>
                            {(key === 'age' || key === 'gender') && (
                                <label className='text-white font-extrabold mb-2'>
                                    {key.replace(/_/g, ' ')}
                                </label>
                            )}
                           
                            {key === 'age' ? (
                                <input
                                    type='number'
                                    name={key}
                                    placeholder='Enter age'
                                    className='px-2 bg-white bg-opacity-30 focus:bg-opacity-75 outline-white outline rounded-sm hover:outline-gray-500 text-black'
                                    value={formData[key]}
                                    onChange={handleChange}
                                />
                            ) : key === 'gender' ? (
                                <select
                                    name={key}
                                    className="px-2 bg-white bg-opacity-30 focus:bg-opacity-75 outline-white outline rounded-sm hover:outline-gray-500 text-black"
                                    value={formData[key] ? 'Male' : 'Female'}
                                    onChange={handleChange}
                                >
                                    <option className='text-black' disabled value="">Select Gender</option>
                                    <option className='text-black' value="Male">Male</option>
                                    <option className='text-black' value="Female">Female</option>
                                </select>
                            ) : (
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className='text-white font-extrabold mb-2'>{key.replace(/_/g, ' ')}</span>
                                        <input
                                            type="checkbox"
                                            name={key}
                                            checked={formData[key] === 1}
                                            onChange={handleChange}
                                            className="checkbox checkbox-info"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    ))}
                </form>
                {/* <button className='btn' onClick={handleSubmit}>
                    Predict
                </button> */}
                <Buttonpink children="Predict" type="Submit" onClick={handleSubmit} />
                {showModal && (
                    <dialog id='my_modal_3' className='modal' open>
                        <div className='modal-box'>
                            <form method='dialog'>
                                <button
                                    className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                                    onClick={handleCloseModal}
                                >
                                    ✕
                                </button>
                            </form>
                            <h2 className='text-3xl font-extrabold text-center text-white mb-5'>
                                {result === "Diabetic" ? "Pre-Diabetic" 
                            
                                : "Non-Pre-Diabetic"}

                            </h2>
                            <p>
                            {result === "Diabetic"? "You must focus on a diet rich in whole grains, vegetables, lean proteins, and healthy fats. Limit sugary foods and refined carbs. Exercise regularly, maintain a healthy weight, and monitor blood sugar levels. Avoid smoking and manage stress to prevent progression to diabetes." 
                            
                            : "Since you are non-pre-diabetic, you can enjoy a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. It's essential to stay active and maintain a healthy weight. Regular exercise, moderate sugar intake, and staying hydrated are key to overall wellness without strict dietary restrictions."}
                            </p>
                        </div>
                    </dialog>
                )}
            </div>
        </div>
    );
}

export default PreDiabetes;
