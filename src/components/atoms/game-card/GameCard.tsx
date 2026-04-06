import React from "react";
import { useNavigate } from "react-router-dom";
import { FiZap, FiHeart, FiUsers } from "react-icons/fi";
import { MdSportsSoccer } from "react-icons/md";

type Intensity = "recreational" | "competitive" | "flexible";

const INTENSITY_CONFIG: Record<Intensity, { icon: React.ReactNode; label: string; color: string }> = {
  recreational: {
    icon: <FiHeart size={10} />,
    label: "Recreativo",
    color: "text-green-400 bg-green-400/10",
  },
  competitive: {
    icon: <FiZap size={10} />,
    label: "Competitivo",
    color: "text-orange-400 bg-orange-400/10",
  },
  flexible: {
    icon: <FiUsers size={10} />,
    label: "Flexible",
    color: "text-sky-400 bg-sky-400/10",
  },
};

interface GameCardProps {
  id: string;
  time: string;
  location: string;
  currentPlayers: number;
  maxPlayers: number;
  ageLabel?: string;
  intensity?: Intensity;
  variant?: "featured" | "compact";
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  time,
  location,
  currentPlayers,
  maxPlayers,
  ageLabel,
  intensity,
  variant = "featured",
}) => {
  const navigate = useNavigate();
  const progress = (currentPlayers / maxPlayers) * 100;
  const isFull = currentPlayers >= maxPlayers;
  const intensityCfg = intensity ? INTENSITY_CONFIG[intensity] : null;

  if (variant === "compact") {
    return (
      <div
        onClick={() => navigate(`/match/${id}`)}
        className="cursor-pointer rounded-2xl bg-surface-container-high p-4 transition-all duration-200 active:scale-[0.98]"
      >
        <div className="flex items-center gap-4">
          {/* Icon square */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-surface-container-highest">
            <MdSportsSoccer size={22} className="text-primary" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-on-surface">{time}</h3>
            <p className="mt-0.5 truncate text-xs text-on-surface-variant">{location}</p>
          </div>

          {/* Spots + mini progress */}
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-sm font-bold ${isFull ? "text-error" : "text-primary"}`}>
              {currentPlayers}/{maxPlayers}
            </span>
            <div className="h-1 w-12 overflow-hidden rounded-full bg-outline-variant/40">
              <div
                className={`h-full rounded-full ${isFull ? "bg-error" : "bg-primary"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {intensityCfg && (
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${intensityCfg.color}`}>
              {intensityCfg.icon}
              {intensityCfg.label}
            </span>
          )}
          {ageLabel && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              {ageLabel}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Featured variant (default)
  return (
    <div
      onClick={() => navigate(`/match/${id}`)}
      className="cursor-pointer rounded-2xl bg-surface-container-high p-5 transition-all duration-200 active:scale-[0.98]"
    >
      {/* Time + spots */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-headline text-2xl font-extrabold tracking-tight text-primary">
            {time}
          </h3>
          <p className="mt-1 text-sm text-on-surface-variant">{location}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xl font-bold ${isFull ? "text-error" : "text-primary"}`}>
            {currentPlayers}/{maxPlayers}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/50">
            lugares
          </span>
        </div>
      </div>

      {/* Progress bar with glow */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-outline-variant/40">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFull ? "bg-error" : "bg-primary shadow-[0_0_8px_rgba(175,253,124,0.4)]"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {intensityCfg && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${intensityCfg.color}`}>
            {intensityCfg.icon}
            {intensityCfg.label}
          </span>
        )}
        {ageLabel && (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            {ageLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default GameCard;
