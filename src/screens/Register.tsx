import React, { useState } from "react";
import Input from "../components/atoms/input/Input";
import Button from "../components/atoms/button/Button";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useUserStore } from "../stores/userStore";
import { useMatchesStore } from "../stores/matchesStore";

const Register = () => {
  const navigate = useNavigate();
  const fetchUser = useUserStore((s) => s.fetchUser);
  const fetchAll = useMatchesStore((s) => s.fetchAll);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!name.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Completá todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name: name.trim(), lastName: lastName.trim(), email: email.trim(), password });
      await Promise.all([fetchUser(), fetchAll()]);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mt-12 flex justify-center">
          <img src="/f5Up.png" alt="Match 5 Logo" className="h-36 w-auto" />
        </div>

        {/* Title */}
        <h1 className="mb-10 mt-2 text-center text-5xl font-bold text-text-light">
          Registro
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-red-400">{error}</p>
        )}

        <div className="mt-6">
          <Button onClick={handleRegister} disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </div>

        {/* Login link */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="text-base text-accent/70">
            ¿Ya tenés una cuenta?
          </span>
          <button
            onClick={() => navigate("/login")}
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
