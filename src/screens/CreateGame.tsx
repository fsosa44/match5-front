import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import Input from "../components/atoms/input/Input";
import DateInput from "../components/atoms/input/DateInput";
import TimeInput from "../components/atoms/input/TimeInput";
import Button from "../components/atoms/button/Button";
import { useMatchesStore } from "../stores/matchesStore";
import { AgeRange, PlayStyle } from "../types/match";
import { createMatch } from "../api/matches";

const GAME_TYPES = [
  { label: "5v5", value: 10 },
  { label: "6v6", value: 12 },
  { label: "7v7", value: 14 },
  { label: "8v8", value: 16 },
  { label: "11v11", value: 22 },
];

const AGE_PRESETS: (AgeRange | null)[] = [
  { min: 15, max: 20, label: "Sub-20" },
  { min: 18, max: 25, label: "Jóvenes" },
  { min: 25, max: 35, label: "Adultos" },
  { min: 30, max: 50, label: "Veteranos" },
  null, // "Libre"
];

const INTENSITY_OPTIONS: { value: PlayStyle; emoji: string; label: string; desc: string }[] = [
  { value: "recreational", emoji: "⚽", label: "Recreativo", desc: "Vengo a pasarla bien" },
  { value: "competitive", emoji: "🔥", label: "Competitivo", desc: "Vengo a competir" },
  { value: "flexible", emoji: "⚡", label: "Flexible", desc: "Me adapto al partido" },
];

// Default coords for Sarandí area
const DEFAULT_LAT = -34.6775;
const DEFAULT_LNG = -58.329;

const CreateGame = () => {
  const navigate = useNavigate();
  const addMatch = useMatchesStore((s) => s.addMatch);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedAgePreset, setSelectedAgePreset] = useState<number | null>(null);
  const [customAge, setCustomAge] = useState(false);
  const [customMin, setCustomMin] = useState("18");
  const [customMax, setCustomMax] = useState("30");
  const [selectedIntensity, setSelectedIntensity] = useState<PlayStyle>("flexible");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getAgeRange = (): AgeRange | undefined => {
    if (customAge) {
      const min = parseInt(customMin);
      const max = parseInt(customMax);
      if (min && max && min < max) {
        return { min, max, label: `${min}-${max}` };
      }
      return undefined;
    }
    if (selectedAgePreset !== null) {
      return AGE_PRESETS[selectedAgePreset] || undefined;
    }
    return undefined;
  };

  const canSubmit = name.trim() && location.trim() && date && time && selectedType && !loading;

  const handleCreate = async () => {
    if (!canSubmit) return;
    setError("");

    try {
      setLoading(true);
      const formattedTime = `${time} hs`;

      const match = await createMatch({
        name: name.trim(),
        location: location.trim(),
        lat: DEFAULT_LAT + (Math.random() - 0.5) * 0.01,
        lng: DEFAULT_LNG + (Math.random() - 0.5) * 0.01,
        date,
        time: formattedTime,
        maxPlayers: selectedType!,
        ageRange: getAgeRange(),
        intensity: selectedIntensity,
      });

      addMatch(match);
      navigate(`/match/${match.id}`);
    } catch (err: any) {
      setError(err.message || "Error al crear el partido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center px-4">
        {/* Back button */}
        <div className="mt-4 mb-2 flex w-full max-w-sm justify-start">
          <BackButton />
        </div>

        {/* Hero card */}
        <div className="mt-6 flex w-full max-w-sm items-center gap-4 rounded-2xl bg-surface-container-high px-6 py-5">
          <img
            src="/f5LogoCuted.PNG"
            alt="Match 5 Logo"
            className="h-20 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold text-text-light">Match 5</h1>
            <p className="text-base font-medium text-alternate">
              Crear partido
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
          <Input
            type="text"
            placeholder="Nombre del partido"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <DateInput
            placeholder="Fecha"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TimeInput
            placeholder="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          {/* Game type selector */}
          <div className="mt-2">
            <p className="mb-2 text-sm font-semibold text-text-light/70">
              Tipo de partido
            </p>
            <div className="flex gap-2">
              {GAME_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    selectedType === type.value
                      ? "bg-accent text-button-text"
                      : "bg-input text-text-light/50 hover:text-text-light/80"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age range selector */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-text-light/70">
              Rango de edad
            </p>
            <div className="flex flex-wrap gap-2">
              {AGE_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedAgePreset(i);
                    setCustomAge(false);
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                    selectedAgePreset === i && !customAge
                      ? "bg-accent text-button-text"
                      : "bg-input text-text-light/50 hover:text-text-light/80"
                  }`}
                >
                  {preset ? `${preset.label} (${preset.min}-${preset.max})` : "🔓 Libre"}
                </button>
              ))}
              <button
                onClick={() => {
                  setCustomAge(true);
                  setSelectedAgePreset(null);
                }}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                  customAge
                    ? "bg-accent text-button-text"
                    : "bg-input text-text-light/50 hover:text-text-light/80"
                }`}
              >
                ✏️ Custom
              </button>
            </div>

            {/* Custom range inputs */}
            {customAge && (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-text-light/40">
                    Mín
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="70"
                    value={customMin}
                    onChange={(e) => setCustomMin(e.target.value)}
                    className="w-full rounded-xl bg-input px-3 py-2.5 text-center text-sm font-semibold text-text-light outline-none focus:ring-1 focus:ring-accent/50"
                  />
                </div>
                <span className="mt-5 text-text-light/30">—</span>
                <div className="flex-1">
                  <label className="mb-1 block text-xs text-text-light/40">
                    Máx
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="70"
                    value={customMax}
                    onChange={(e) => setCustomMax(e.target.value)}
                    className="w-full rounded-xl bg-input px-3 py-2.5 text-center text-sm font-semibold text-text-light outline-none focus:ring-1 focus:ring-accent/50"
                  />
                </div>
              </div>
            )}

            {/* Selected info */}
            {(selectedAgePreset !== null || customAge) && (
              <p className="mt-2 text-xs text-text-light/40">
                {getAgeRange()
                  ? `Solo jugadores de ${getAgeRange()!.min} a ${getAgeRange()!.max} años`
                  : "Todas las edades bienvenidas"}
              </p>
            )}
          </div>

          {/* Intensity selector */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-text-light/70">
              Intensidad del partido
            </p>
            <div className="flex gap-2">
              {INTENSITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedIntensity(opt.value)}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-3 transition-all ${
                    selectedIntensity === opt.value
                      ? "bg-accent text-button-text ring-2 ring-accent/30"
                      : "bg-input text-text-light/50 hover:text-text-light/80"
                  }`}
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <span className="text-xs font-semibold">{opt.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-text-light/40">
              {INTENSITY_OPTIONS.find((o) => o.value === selectedIntensity)?.desc}
            </p>
          </div>
        </div>

        <div className="mt-8 w-full max-w-sm pb-6">
          {error && (
            <p className="mb-3 text-center text-sm text-red-400">{error}</p>
          )}
          <Button onClick={handleCreate} disabled={!canSubmit}>
            {loading ? "Creando..." : "Crear partido"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateGame;
