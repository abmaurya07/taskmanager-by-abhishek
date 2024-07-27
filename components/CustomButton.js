import React, { useState } from "react";




const CustomButton = ({
  type,
  loading,
  onClick,
  children

}) => {


  return (
    <div className="relative w-full h-12">
      <button
        type={type}
        className={`absolute inset-0 bg-purple-600 text-white rounded-full font-semibold transition-all duration-300 ease-in-out ${
          loading ? "transform scale-0 opacity-0" : "hover:bg-purple-700"
        }`}
        onClick={onClick}
        disabled={loading}
      >
        <span
          className={`transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {children}
        </span>
      </button>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};


export default CustomButton;
