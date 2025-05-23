import React from "react";
import Input from "../components/atoms/input/Input";
import Button from "../components/atoms/button/Button";
import { colors } from "../constants/colors";

const Register = () => {
  return (
    <div
      className="flex flex-col min-h-screen px-6 py-4"
      style={{ backgroundColor: colors.primaryBg }}
    >
      <div className="flex justify-center w-full mt-12">
        <img src="/F5Up.png" alt="Logo" className="w-auto h-40" />
      </div>
      <h1
        className="text-6xl font-bold mb-12 text-center w-full"
        style={{ color: colors.textLight }}
      >
        Registro
      </h1>
      <div className="flex flex-col gap-3 w-full">
        <Input type="text" placeholder="Nombre" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Contraseña" />
      </div>
      <div className="mt-6">
        <Button>Crear Cuenta</Button>
      </div>
      <div className="flex flex-col items-center mt-4">
        <span
          className="text-center text-xl"
          style={{ color: colors.accent }}
        >
          ¿Ya tenés una cuenta?
        </span>
        <span
          className="text-center font-semibold text-2xl mt-2 cursor-pointer"
          style={{ color: colors.accent }}
        >
          Ingresar
        </span>
      </div>
    </div>
  );
};

export default Register;
