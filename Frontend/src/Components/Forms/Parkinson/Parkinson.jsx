// import React, { useState } from "react";
// import Buttonpink from "../../Buttons/Buttonpink";

// function Parkinson() {
//   const [features, setFeatures] = useState(Array(22).fill(""));
//   const [result, setResult] = useState("");
//   const fea = [
//     "Fundamental Frequency(Hz)",
//     "Maximum Frequency(Hz)",
//     "Minimum Frequency(Hz)",
//     "Jitter(%)",
//     "Absolute Jitter(%)",
//     "Relative Average Perturbation",
//     "Pitch Perturbation Quotient",
//     "Difference in Jitter",
//     "Shimmer",
//     "Shimmer in Decibels",
//     "Amplitude Perturbation Quotient",
//     "Amplitude Perturbation Quotient",
//     "Amplitude Perturbation Quotient",
//     "Shimmer in Duration-Dependent Amplitude",
//     "Noise-to-Harmonics Ratio",
//     "Harmonics-to-Noise Ratio",
//     "Diagnosis Status",
//     "Recurrence Period Density Entropy",
//     "Detrended Fluctuation Analysis",
//     "Spread1",
//     "Spread2",
//     "Correlation Dimension (D2)",
//     "Period-to-Period Entropy",
//   ];
  

//   const handleInputChange = (index, value) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/parkinson", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ features }),
//       });
//       const data = await response.json();
//       setResult(data.prediction);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="h-full w-full flex flex-wrap justify-center mt-12 mb-12 px-4">
//       {/* {showToaster && <Toaster message="Successfully Uploaded!" />} */}
//       <div className="min-h-[86vh] h-full w-full max-w-5xl p-6 z-10 flex flex-col rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
//         <h1 className="text-3xl font-extrabold text-center text-white mb-5">
//           Disease Predictor
//         </h1>
//         <form className="flex flex-wrap max-w-5xl justify-center gap-4">
//           {features.map((feature, index) => (
//             // <div key={index}>
//             //     <label>Feature {index + 1}: </label>
//             //     <input
//             //         type="number"
//             //         value={feature}
//             //         onChange={(e) => handleInputChange(index, e.target.value)}
//             //     />
//             // </div>
//             <div className="mb-5 flex flex-col max-w-40 min-h-10 justify-between" key={index}>
//               <label className="text-white font-extrabold mb-2">
//                 {fea[index]}
//               </label>
//               <input
//                 type="number"
//                 placeholder="0"
//                 min="0"
//                 className="px-2 bg-white bg-opacity-30 focus:bg-opacity-75 focus:outline-black outline-white outline rounded-sm hover:outline-gray-500"
//                 id="age"
//                 required
//                 value={feature}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//               />
//             </div>
//           ))}
//         </form>
//         <Buttonpink
//           children={"Submit"}
//           type={"Submit"}
//           classname={"py-3 px-4"}
//           onClick={handleSubmit}
//         />
//       </div>
//       <div className="h-24 w-[75%] p-[20px] my-4 z-10 rounded-2xl border border-neutral-50 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
//         {result && <h2>{result}</h2>}
//       </div>
//     </div>
//   );
// }

// export default Parkinson;
// import React, { useState } from "react";
// import Buttonpink from "../../Buttons/Buttonpink";

// function Parkinson() {
//   const [features, setFeatures] = useState(Array(22).fill(""));
//   const [result, setResult] = useState("");
//   const fea = [
//     "Fundamental Frequency(Hz)",
//     "Maximum Frequency(Hz)",
//     "Minimum Frequency(Hz)",
//     "Jitter(%)",
//     "Absolute Jitter(%)",
//     "Relative Average Perturbation",
//     "Pitch Perturbation Quotient",
//     "Difference in Jitter",
//     "Shimmer",
//     "Shimmer in Decibels",
//     "Amplitude Perturbation Quotient",
//     "Amplitude Perturbation Quotient",
//     "Amplitude Perturbation Quotient",
//     "Shimmer in Duration-Dependent Amplitude",
//     "Noise-to-Harmonics Ratio",
//     "Harmonics-to-Noise Ratio",
//     "Diagnosis Status",
//     "Recurrence Period Density Entropy",
//     "Detrended Fluctuation Analysis",
//     "Spread1",
//     "Spread2",
//     "Correlation Dimension (D2)",
//     "Period-to-Period Entropy",
//   ];

//   const handleInputChange = (index, value) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/parkinson", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ features }),
//       });
//       const data = await response.json();
//       setResult(data.prediction);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="h-full w-full flex flex-wrap justify-center mt-12 mb-12 px-4">
//       <div className="min-h-[86vh] h-full w-full max-w-5xl p-6 z-10 flex flex-col rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
//         <h1 className="text-3xl font-extrabold text-center text-white mb-5">
//           Disease Predictor
//         </h1>
//         <form className="flex flex-wrap max-w-5xl justify-center gap-4">
//           {fea.map((featureName, index) => (
//             <div className="mb-5 flex flex-col max-w-40 min-h-10 justify-between" key={index}>
//               <label className="text-white font-extrabold mb-2">
//                 {featureName}
//               </label>
//               <input
//                 type="number"
//                 placeholder="0"
//                 min="0"
//                 className="px-2 bg-white bg-opacity-30 focus:bg-opacity-75 focus:outline-black outline-white outline rounded-sm hover:outline-gray-500"
//                 id={`feature-${index}`}
//                 title={`Please enter ${featureName}`} 
//                 required
//                 value={features[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//               />
//             </div>
//           ))}
//         </form>
//         <Buttonpink
//           children={"Submit"}
//           type={"Submit"}
//           classname={"py-3 px-4"}
//           onClick={handleSubmit}
//         />
//       </div>
//       <div className="h-24 w-[75%] p-[20px] my-4 z-10 rounded-2xl border border-neutral-50 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
//         {result && <h2>{result}</h2>}
//       </div>
//     </div>
//   );
// }

// export default Parkinson;
import React, { useState } from "react";
import Buttonpink from "../../Buttons/Buttonpink";

function Parkinson() {
  const [features, setFeatures] = useState(Array(22).fill(""));
  const [result, setResult] = useState("");

  const fea = [
    "Fundamental Frequency(Hz)",
    "Maximum Frequency(Hz)",
    "Minimum Frequency(Hz)",
    "Jitter(%)",
    "Absolute Jitter(%)",
    "Relative Average Perturbation",
    "Pitch Perturbation Quotient",
    "Difference in Jitter",
    "Shimmer",
    "Shimmer in Decibels",
    "Amplitude Perturbation Quotient",
    "Amplitude Perturbation Quotient",
    "Amplitude Perturbation Quotient",
    "Shimmer in Duration-Dependent Amplitude",
    "Noise-to-Harmonics Ratio",
    "Harmonics-to-Noise Ratio",
    "Diagnosis Status",
    "Recurrence Period Density Entropy",
    "Detrended Fluctuation Analysis",
    "Spread1",
    "Spread2",
    "Correlation Dimension (D2)",
    "Period-to-Period Entropy",
  ];

  const descriptions = {
    "Fundamental Frequency(Hz)": "The average pitch frequency of the voice, measured in Hertz (Hz). It reflects the basic rate at which the vocal cords vibrate.",
    "Maximum Frequency(Hz)": "The highest fundamental frequency reached during voice recording, measured in Hertz (Hz). It indicates the maximum pitch variation.",
    "Minimum Frequency(Hz)": "The lowest fundamental frequency during voice recording, measured in Hertz (Hz). It shows the minimum pitch variation.",
    "Jitter(%)": "The percentage variation in frequency between cycles of the voice. Jitter reflects the frequency stability of the voice.",
    "Absolute Jitter(%)": "The absolute variation in frequency between cycles of the voice, measured in milliseconds. It indicates the variability in pitch.",
    "Relative Average Perturbation": "A measure of frequency variation that normalizes jitter by the average frequency, reflecting periodicity of the voice.",
    "Pitch Perturbation Quotient": "A measure of the variability in pitch over a fixed period, used to quantify voice stability.",
    "Difference in Jitter": "The variation in jitter between consecutive cycles, reflecting irregularity in voice frequency.",
    "Shimmer": "The variation in amplitude (loudness) of the voice signal from cycle to cycle, measured in percentage. It reflects the stability of loudness.",
    "Shimmer in Decibels": "The variation in amplitude of the voice signal measured in decibels (dB), indicating loudness stability.",
    "Amplitude Perturbation Quotient": "A general measure of amplitude variation, quantifying how much the loudness fluctuates.",
    "Shimmer in Duration-Dependent Amplitude": "A measure of amplitude variation adjusted for duration, reflecting stability of loudness over time.",
    "Noise-to-Harmonics Ratio": "The ratio of noise to harmonics in the voice signal, indicating the degree of voice irregularity.",
    "Harmonics-to-Noise Ratio": "The ratio of harmonics to noise in the voice signal, reflecting voice quality and periodicity.",
    "Diagnosis Status": "The target variable indicating the presence (1) or absence (0) of Parkinson’s disease.",
    "Recurrence Period Density Entropy": "A measure of the complexity and irregularity of the voice signal, used to assess voice stability.",
    "Detrended Fluctuation Analysis": "A measure of the scaling properties of voice signal fluctuations, reflecting the long-term statistical properties of the voice.",
    "Spread1": "A measure of voice signal spread in the frequency domain, indicating how the voice frequencies are distributed.",
    "Spread2": "Another measure of voice signal spread, providing additional information about frequency distribution.",
    "Correlation Dimension (D2)": "A measure of the complexity of the voice signal’s phase space, reflecting the degree of nonlinearity and chaos.",
    "Period-to-Period Entropy": "A measure of the variability and unpredictability of the voice signal, indicating irregularity in voice patterns.",
  };

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
      <div className="min-h-[86vh] h-full w-full max-w-5xl p-6 z-10 flex flex-col rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
        <h1 className="text-3xl font-extrabold text-center text-white mb-5">
          Disease Predictor
        </h1>
        <form className="flex flex-wrap max-w-5xl justify-center gap-4">
          {fea.map((featureName, index) => (
            <div className="mb-5 flex flex-col max-w-40 min-h-10 justify-between" key={index}>
              <label className="text-white font-extrabold mb-2">
                {featureName}
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                className="px-2 bg-white bg-opacity-30 focus:bg-opacity-75 outline-white outline rounded-sm hover:outline-gray-500"
                id={`feature-${index}`}
                title={descriptions[featureName]} 
                required
                value={features[index]}
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
