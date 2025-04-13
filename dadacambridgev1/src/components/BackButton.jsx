import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = ({ fallback = "/", className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // If there's a valid navigation history
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-4 left-4 flex items-center text-gray-600 hover:text-teal-600 font-medium transition text-sm sm:text-base ${className}`}
    >
      <FiArrowLeft className="mr-2" size={18} />
      Back
    </button>
  );
};

export default BackButton;
