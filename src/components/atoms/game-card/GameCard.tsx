import React from "react";
import { useNavigate } from "react-router-dom";
import { FiZap, FiHeart, FiUsers } from "react-icons/fi";

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
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  time,
  location,
  currentPlayers,
  maxPlayers,
  ageLabel,
  intensity,
}) => {
  const navigate = useNavigate();
  const progress = (currentPlayers / maxPlayers) * 100;
  const isFull = currentPlayers >= maxPlayers;
  const intensityCfg = intensity ? INTENSITY_CONFIG[intensity] : null;

  return (
    <div
      onClick={() => navigate(`/match/${id}`)}
      className="cursor-pointer rounded-2xl bg-input p-5 transition-all duration-200 hover:bg-input/80 active:scale-[0.98]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{time}</h3>
          <p className="mt-0.5 text-sm text-text-light/70">{location}</p>
        </div>
        <span
          className={`text-sm font-semibold ${
            isFull ? "text-red-400" : "text-alternate"
          }`}
        >
          {currentPlayers}/{maxPlayers}
        </span>
      </div>

      {/* Tags row */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {intensityCfg && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${intensityCfg.color}`}>
            {intensityCfg.icon}
            {intensityCfg.label}
          </span>
        )}
        {ageLabel && (
          <span className="inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
            {ageLabel}
          </span>
        )}
      </div>

      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-primary/50">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFull ? "bg-red-400" : "bg-accent"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default GameCard;
