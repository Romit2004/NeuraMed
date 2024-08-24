import React from "react";

function Buttonpink({ children, type, classname = "", onClick = null }) {
  return (
    <>
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        <button
          type={type}
          className={`rounded-md border border-white text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 hover:border-spacing-1 hover:px-7 hover:transition-all hover:ease-in-out hover:duration-100 hover:bg-pink-700 hover:text-white hover:border-none ${
            classname != "" ? classname : "px-6 py-4"
          }`}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    </>
  );
}

export default Buttonpink;
