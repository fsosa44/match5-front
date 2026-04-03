import React from "react";
import Input from "../components/atoms/input/Input";
import Button from "../components/atoms/button/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center bg-primary px-6 py-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mt-12 flex justify-center">
          <img src="/F5Up.png" alt="Match 5 Logo" className="h-36 w-auto" />
        </div>

        {/* Title */}
        <h1 className="mb-10 mt-2 text-center text-5xl font-bold text-text-light">
          Registro
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="Nombre" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Contraseña" />
        </div>

        <div className="mt-6">
          <Button>Crear Cuenta</Button>
        </div>

        {/* Login link */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="text-base text-accent/70">
            ¿Ya tenés una cuenta?
          </span>
          <button
            onClick={() => navigate("/")}
            className="text-lg font-semibold text-accent transition-colors hover:text-accent-light"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
