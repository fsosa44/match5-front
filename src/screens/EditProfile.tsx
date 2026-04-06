import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import Input from "../components/atoms/input/Input";
import Button from "../components/atoms/button/Button";
import { currentUser } from "../data/mockCurrentUser";
import { updateProfile } from "../api/users";
import { PlayStyle } from "../types/match";

const POSITIONS = ["Arquero", "Defensor", "Mediocampista", "Delantero"];

const PLAY_STYLES: { value: PlayStyle; emoji: string; label: string }[] = [
  { value: "recreational", emoji: "⚽", label: "Recreativo" },
  { value: "competitive", emoji: "🔥", label: "Competitivo" },
  { value: "flexible", emoji: "⚡", label: "Flexible" },
];

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);
  const [position, setPosition] = useState(currentUser.position);
  const [playStyle, setPlayStyle] = useState<PlayStyle>(currentUser.playStyle);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError("");
    if (!name.trim()) {
      setError("El nombre es requerido");
      return;
    }

    try {
      setLoading(true);
      const updated = await updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        position,
        playStyle,
        location: location.trim(),
      });

      // Actualizar datos locales
      currentUser.name = updated.name;
      currentUser.phone = updated.phone || currentUser.phone;
      currentUser.position = updated.position;
      currentUser.playStyle = updated.playStyle as PlayStyle;
      currentUser.location = updated.location || currentUser.location;

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err: any) {
      setError(err.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center px-4 pb-8">
        {/* Back */}
        <div className="mb-2 mt-4 flex w-full max-w-sm justify-start">
          <BackButton />
        </div>

        <h1 className="mt-2 text-2xl font-bold text-text-light">
          Editar perfil
        </h1>

        {/* Form */}
        <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="tel"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Position selector */}
          <div className="mt-2">
            <p className="mb-2 text-sm font-semibold text-text-light/70">
              Posición
            </p>
            <div className="flex gap-2">
              {POSITIONS.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                    position === pos
                      ? "bg-accent text-button-text"
                      : "bg-input text-text-light/50 hover:text-text-light/80"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* PlayStyle selector */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-text-light/70">
              Estilo de juego
            </p>
            <div className="flex gap-2">
              {PLAY_STYLES.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPlayStyle(opt.value)}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-3 transition-all ${
                    playStyle === opt.value
                      ? "bg-accent text-button-text ring-2 ring-accent/30"
                      : "bg-input text-text-light/50 hover:text-text-light/80"
                  }`}
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <span className="text-xs font-semibold">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-center text-sm text-accent">
            ¡Perfil actualizado!
          </p>
        )}

        {/* Save button */}
        <div className="mt-8 w-full max-w-sm">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
