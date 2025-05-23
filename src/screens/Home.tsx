import * as React from "react";
import { colors } from "../constants/colors";
import Button from "../components/atoms/button/Button";
import { FiArrowLeft } from "react-icons/fi";
import BottomNav from "../components/atoms/navigation/BottomNav";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex flex-col items-center " style={{ backgroundColor: colors.primaryBg }}>
        <div className="w-full flex justify-start mt-4 mb-2 px-4">
          <div
            className="rounded-full p-2"
            style={{ backgroundColor: colors.secondaryBg, display: "inline-flex" }}
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
        <div className="mt-8 w-[350px]">
          <Button onClick={() => navigate("/create-game")}>Crear partido</Button>
        </div>

        {/* Título sección 1 */}
        <div className="w-[350px] mt-8">
          <h2 className="text-2        npm install react-icons
          npm install --save-dev @types/react-iconsxl font-bold mb-2 text-left" style={{ color: colors.textLight }}>
            Próximos juegos
          </h2>
          <div
            className="flex flex-col items-center justify-center rounded-2xl px-0 py-4 mx-auto"
            style={{
              backgroundColor: colors.inputBg,
              width: "350px",
              height: "100px",
            }}
          >
            <h1 className="text-2xl font-bold" style={{ color: "#fff" }}>
              18:00 hs
            </h1>
            <span className="text-lg" style={{ color: "#fff" }}>
              Parque Central
            </span>
            <span className="text-lg font-semibold" style={{ color: colors.alternateText }}>
              5/10 jugadores
            </span>
          </div>
        </div>

        {/* Título sección 2 */}
        <div className="w-[350px] mt-4">
          <h2 className="text-2xl font-bold mb-2 text-left" style={{ color: colors.textLight }}>
            Juegos cercanos
          </h2>
          <div
            className="flex flex-col items-center justify-center rounded-2xl px-0 py-4 mx-auto"
            style={{
              backgroundColor: colors.inputBg,
              width: "350px",
              height: "100px",
            }}
          >
            <h1 className="text-2xl font-bold" style={{ color: "#fff" }}>
              20:30 hs
            </h1>
            <span className="text-lg" style={{ color: "#fff" }}>
              Cancha Sur
            </span>
            <span className="text-lg font-semibold" style={{ color: colors.alternateText }}>
              7/12 jugadores
            </span>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Home;
