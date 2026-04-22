import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import Input from "../components/atoms/input/Input";
import Button from "../components/atoms/button/Button";
import { useUserStore } from "../stores/userStore";
import { PlayStyle } from "../types/match";
import { FiCamera } from "react-icons/fi";
import Loader from "../components/atoms/loader/Loader";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

const POSITIONS = ["Arquero", "Defensor", "Mediocampista", "Delantero"];

const PLAY_STYLES: { value: PlayStyle; emoji: string; label: string }[] = [
  { value: "recreational", emoji: "⚽", label: "Recreativo" },
  { value: "competitive", emoji: "🔥", label: "Competitivo" },
  { value: "flexible", emoji: "⚡", label: "Flexible" },
];

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const updateUser = useUserStore((s) => s.updateUser);
  const uploadPhoto = useUserStore((s) => s.uploadPhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "");
  const [position, setPosition] = useState(user?.position || "Mediocampista");
  const [playStyle, setPlayStyle] = useState<PlayStyle>((user?.playStyle as PlayStyle) || "flexible");
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user?.profilePhoto ? `${API_BASE}${user.profilePhoto}` : null
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setError("");
    if (!name.trim()) {
      setError("El nombre es requerido");
      return;
    }
    if (!lastName.trim()) {
      setError("El apellido es requerido");
      return;
    }

    try {
      setLoading(true);

      // Upload photo first if changed
      if (photoFile) {
        await uploadPhoto(photoFile);
      }

      await updateUser({
        name: name.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        position,
        playStyle,
        location: location.trim(),
      });

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err: any) {
      setError(err.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const initials = `${name?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

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

        {/* Profile photo */}
        <div className="mt-6 flex flex-col items-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative cursor-pointer"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Foto de perfil"
                className="h-24 w-24 rounded-full border-2 border-primary object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary bg-surface-container-high text-3xl font-bold text-primary">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-button-text shadow-lg">
              <FiCamera size={14} />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <p className="mt-2 text-xs text-text-light/40">
            Tocá para cambiar la foto
          </p>
        </div>

        {/* Form */}
        <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
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
            Guardar cambios
          </Button>
        </div>
      </div>

      {loading && <Loader size="overlay" label="Guardando" />}
    </Layout>
  );
};

export default EditProfile;
