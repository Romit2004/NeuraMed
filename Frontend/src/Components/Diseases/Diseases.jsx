import React from "react";
import { Link } from "react-router-dom";

const Diseases = () => {
  const diseases = [
    {
      text: "Skin Cancer",
      path: "/skin_cancer",
      desk: "Upload image to predict if you have Skin Cancer or not",
      id: 1,
    },
    {
      text: "Pneumonia",
      path: "/pneumonia",
      desk: "Upload image to predict if you have Pneumonia or not",
      id: 2,
    },
    {
      text: "Parkinson's Disease",
      path: "/parkinson",
      desk: "Upload image to predict if you have Parkinson's Disease or not",
      id: 3,
    },
    {
      text: "Heart Disease",
      path: "/heart_disease",
      id: 4,
    },
  ];

  return (
    <div className='h-full w-full relative flex justify-center mt-12 mb-12'>
      <div className='h-auto w-[90%] lg:w-[75%] p-4 z-10 flex flex-col relative rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl'>
        <div className='flex flex-col lg:flex-row lg:flex-wrap justify-center items-center w-full'>
          {diseases &&
            diseases.map((disease) => (
              <div
                key={disease.id}
                className='flex justify-center lg:justify-between lg:w-auto ml-1 mr-2 lg:mr-8 mt-2 lg:mt-4 card bg-primary text-primary-content w-auto'
              >
                <div className='card-body'>
                  <h2 className='card-title'>{disease.text}</h2>
                  <p>{disease.desk}</p>
                  <div className='mt-2 mb-2 card-actions justify-end'>
                    <Link to={disease.path}>
                      <button className='btn'>Predict</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Diseases;
