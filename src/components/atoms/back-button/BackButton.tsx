import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center justify-center rounded-full bg-secondary p-2.5 text-white transition-colors duration-200 hover:bg-secondary/80 active:scale-95"
      aria-label="Volver"
    >
      <FiArrowLeft size={24} />
    </button>
  );
};

export default BackButton;
