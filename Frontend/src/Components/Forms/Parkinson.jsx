import React, { useState } from "react";
import Buttonpink from "../Buttons/Buttonpink";

function Parkinson() {
  const [features, setFeatures] = useState(Array(22).fill(""));
  const [result, setResult] = useState("");

  const handleInputChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/parkinson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features }),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-wrap justify-center mt-12 mb-12 px-4">
      {/* {showToaster && <Toaster message="Successfully Uploaded!" />} */}
      <div className="min-h-[86vh] h-full w-full max-w-5xl p-6 z-10 flex flex-col rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
        <h1 className="text-3xl font-extrabold text-center text-white mb-5">
          Disease Predictor
        </h1>
        <form className="grid grid-cols-4 gap-x-5 gap-y-8 py-5">
          {features.map((feature, index) => (
            // <div key={index}>
            //     <label>Feature {index + 1}: </label>
            //     <input
            //         type="number"
            //         value={feature}
            //         onChange={(e) => handleInputChange(index, e.target.value)}
            //     />
            // </div>
            <div className="mb-5 flex flex-col" key={index}>
              <label className="text-gray-700 font-semibold mb-2">
                Feature:
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                className="px-2 bg-white bg-opacity-30 focus:bg-opacity-75 focus:outline-black outline-white outline rounded-sm hover:outline-gray-500"
                id="age"
                required
                value={feature}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </form>
        <Buttonpink
          children={"Submit"}
          type={"Submit"}
          classname={"py-3 px-4"}
          onClick={handleSubmit}
        />
      </div>
      <div className="h-24 w-[75%] p-[20px] my-4 z-10 rounded-2xl border border-neutral-50 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
        {result && <h2>{result}</h2>}
      </div>
    </div>
  );
}

export default Parkinson;
