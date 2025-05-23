import * as React from "react";
import { colors } from "../constants/colors";
import BottomNav from "../components/atoms/navigation/BottomNav";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: colors.primaryBg }}>
        <div className="w-full flex justify-start mt-4 mb-2 px-4">
          <div
            className="rounded-full p-2 cursor-pointer"
            style={{ backgroundColor: colors.secondaryBg, display: "inline-flex" }}
            onClick={() => navigate(-1)}
          >
            {FiArrowLeft({ size: 28, color: "#fff" })}
          </div>
        </div>
        <div
          className="flex flex-row items-center justify-center rounded-2xl px-0 py-4 mt-8 mx-auto"
          style={{
            backgroundColor: colors.secondaryBg,
            width: "350px",
            height: "120px",
          }}
        >
          <img src="/f5LogoCuted.png" alt="Logo" className="w-auto h-24 mb-1" />
          <div className="flex flex-col items-start ml-4">
            <div className="text-3xl font-bold" style={{ color: colors.textLight }}>
              Match 5
            </div>
            <div className="text-lg font-semibold" style={{ color: colors.alternateText }}>
              Encuentra partidos
            </div>
          </div>
        </div>
        {/* Sección inferior vacía, espera instrucciones */}
      </div>
      <BottomNav />
    </>
  );
};

export default CreateGame;
