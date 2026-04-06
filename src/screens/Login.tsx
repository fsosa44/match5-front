import React, { useState } from "react";
import Input from "../components/atoms/input/Input";
import Button from "../components/atoms/button/Button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completá todos los campos");
      return;
    }

    try {
      setLoading(true);
      await loginUser({ email: email.trim(), password });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-primary px-6 py-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mt-12 flex justify-center">
          <img src="/F5Up.png" alt="Match 5 Logo" className="h-36 w-auto" />
        </div>

        {/* Title */}
        <h1 className="mb-10 mt-2 text-center text-5xl font-bold text-text-light">
          Ingresar
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-3">
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
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-red-400">{error}</p>
        )}

        <div className="mt-6">
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>

        {/* Register link */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="text-base text-accent/70">
            ¿No tenés cuenta?
          </span>
          <button
            onClick={() => navigate("/register")}
            className="text-lg font-semibold text-accent transition-colors hover:text-accent-light"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
