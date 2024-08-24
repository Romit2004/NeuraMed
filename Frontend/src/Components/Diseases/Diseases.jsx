import React from "react";

import Buttonpink from "../Buttons/Buttonpink";
import { Link } from "react-router-dom";

const Diseases = () => {
  const diseases = [
    {
      text: "Skin Cancer",
      path: "/skin_cancer",
      id: 1,
    },
    {
      text: "Pneumonia",
      path: "/pneumonia",
      id: 2,
    },
    {
      text: "Parkinson's",
      path: "/parkinson",
      id: 3,
    },
  ];
  return (
    <div className="h-full w-full relative flex justify-center mt-12 mb-12">
      <div className="h-[86vh] w-[90%] lg:w-[75%] p-4 z-10 flex flex-col relative rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg justify-center items-center shadow-3xl">
        <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center w-full">
          {diseases &&
            diseases.map((disease, index) => (
              <div
                key={disease.id}
                className="flex justify-center lg:justify-between w-full lg:w-auto ml-1 mr-2 lg:mr-8 mt-2 lg:mt-4"
              >
                <Link to={disease.path}>
                <div className="mt-2 mb-2">
                <Buttonpink children={disease.text} type={"text"} />

                </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Diseases;
