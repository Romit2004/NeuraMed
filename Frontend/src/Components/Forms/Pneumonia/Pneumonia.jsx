import React, { useState, useEffect, useRef } from 'react';
import Buttonpink from '../../Buttons/Buttonpink';
import Toaster from '../../Toaster/Toaster';
import axios from 'axios';

const Pneumonia = () => {
    // const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    const inputRef = useRef(null)


    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setPreviews(URL.createObjectURL(event.target.files[0]));
        console.log(selectedFile);
        console.log(previews)

    };

    const onFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image file");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://127.0.0.1:5000/pneumonia", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response) {

                setShowToaster(false);
                setTimeout(() => setShowToaster(true), 100);


                setTimeout(() => setShowToaster(false), 3000);
            } else {
                alert('Failed to upload files');
            }
            setPrediction(response.data);
            console.log(inputRef.current)


        } catch (error) {
            console.error("Error uploading the file:", error);
        } finally {
            inputRef.current.value = "";
            setPreviews("")
        }
    };

    return (
        <div className="h-full w-full flex flex-wrap justify-center mt-12 mb-12 px-4">
            {showToaster && <Toaster message="Successfully Uploaded!" />}
            <div
                className="min-h-[86vh] h-full w-full max-w-5xl p-6 z-10 flex flex-col rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl"
            >
                <h1 className="text-3xl font-extrabold text-center text-white mb-5">
                    Disease Predictor
                </h1>

                {/* <input
                        className="flex h-10 w-full md:w-[50vw] rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                        type="file"
                    
                        multiple
                        onChange={onFileChange} 
                        accept="image/*"
                        ref={inputRef}
                    /> */}
                <div className="flex items-center justify-center w-full bg-white bg-opacity-10 mb-6">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white bg-opacity-10  dark:border-white dark:hover:border-gray-500 hover:bg-white hover:bg-opacity-5">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                
                <div class="flex items-center justify-center w-full bg-white bg-opacity-10 mb-6">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white bg-opacity-10  dark:border-white dark:hover:border-gray-500 hover:bg-white hover:bg-opacity-5">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-white dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-white dark:text-white">SVG, PNG or JPG </p>
                        </div>
                        
                        <input id="dropzone-file" type="file" className="hidden" onChange={onFileChange}
                            accept="image/*"
                            ref={inputRef} />
                    </label>
                </div>
                <div>
                    <Buttonpink children={"Submit"} type={"Submit"} classname={'py-3 px-4'} onClick={onFileUpload} />
                    

                </div>





                <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center mt-6">

                    {previews ?
                        <div
                            className="relative h-[200px] w-[150px] md:h-[300px] md:w-[200px] lg:h-[400px] lg:w-[300px] rounded-md mt-2 md:mx-2"

                        >
                            <img
                                src={previews}
                                className="z-0 h-fit w-fit rounded-md object-cover"

                            />
                        </div>
                        : <div></div>
                    }
                </div>


            </div>
            <div
                className="h-24 w-[75%] p-[20px] my-4 z-10 rounded-2xl border border-neutral-50 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl"

            >
                {prediction && (
                    <div>
                        <h1>Prediction: {prediction.prediction}</h1>
                    
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pneumonia;