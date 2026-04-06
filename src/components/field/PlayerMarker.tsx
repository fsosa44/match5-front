import React, { useState, useEffect } from "react";
import { Player } from "../../types/match";

interface PlayerMarkerProps {
  player: Player | null;
  index: number;
  team: "a" | "b";
  x: number;
  y: number;
  delay: number;
  onSlotClick?: () => void;
  onPlayerClick?: (playerId: string) => void;
  justJoined?: boolean;
}

const PlayerMarker: React.FC<PlayerMarkerProps> = ({
  player,
  index,
  team,
  x,
  y,
  delay,
  onSlotClick,
  onPlayerClick,
  justJoined,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isEmpty = !player;

  const handleClick = () => {
    if (isEmpty) {
      onSlotClick?.();
    } else if (player) {
      onPlayerClick?.(player.id);
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: visible ? 1 : 0,
        animation: visible
          ? `fadeInUp 400ms ${delay}ms both ease-out`
          : "none",
      }}
    >
      <div
        onClick={handleClick}
        className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold shadow-md shadow-black/30 sm:h-9 sm:w-9 sm:text-xs ${
          isEmpty
            ? "cursor-pointer border border-dashed border-primary/40 text-primary/40 transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-primary/20"
            : "cursor-pointer transition-transform duration-150 hover:scale-110 " +
              (team === "a"
                ? "border-2 border-primary bg-background/90 text-white"
                : "border-2 border-on-surface bg-background/90 text-white")
        }`}
        style={{
          animation: isEmpty
            ? "pulseGlow 2s ease-in-out infinite"
            : justJoined
              ? "popIn 500ms ease-out"
              : "none",
        }}
      >
        {isEmpty ? "+" : index + 1}
      </div>
      {!isEmpty && (
        <span className="mt-0.5 max-w-[64px] truncate text-center text-[9px] font-medium leading-tight text-white/80">
          {player.name}
        </span>
      )}
    </div>
  );
};

export default PlayerMarker;
