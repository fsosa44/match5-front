import React from "react";
import { Player } from "../../types/match";
import {
  getFormation,
  getMirroredFormation,
} from "../../constants/formations";
import PlayerMarker from "./PlayerMarker";
import { ReactComponent as FieldSvg } from "../../assets/soccer-field.svg";

interface SoccerFieldProps {
  players: (Player | null)[];
  maxPlayers: number;
  onSlotClick?: (slotIndex: number) => void;
  onPlayerClick?: (playerId: string) => void;
  justJoinedIndex?: number | null;
}

const SoccerField: React.FC<SoccerFieldProps> = ({
  players,
  maxPlayers,
  onSlotClick,
  onPlayerClick,
  justJoinedIndex,
}) => {
  const playersPerTeam = Math.floor(maxPlayers / 2);

  const allPlayers = [...players];
  while (allPlayers.length < maxPlayers) allPlayers.push(null);

  const teamA = allPlayers.slice(0, playersPerTeam);
  const teamB = allPlayers.slice(playersPerTeam);

  const formationA = getFormation(playersPerTeam);
  const formationB = getMirroredFormation(playersPerTeam);

  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-black/30">
      {/* Field SVG (grass + lines + arcs) */}
      <FieldSvg className="absolute inset-0 h-full w-full" />

      {/* Team A – bottom half */}
      {formationA.map((pos, i) => (
        <PlayerMarker
          key={`a-${i}`}
          player={teamA[i]}
          index={i}
          team="a"
          x={pos.x}
          y={pos.y}
          delay={i * 60}
          onSlotClick={() => onSlotClick?.(i)}
          onPlayerClick={onPlayerClick}
          justJoined={justJoinedIndex === i}
        />
      ))}

      {/* Team B – top half (mirrored) */}
      {formationB.map((pos, i) => {
        const globalIndex = playersPerTeam + i;
        return (
          <PlayerMarker
            key={`b-${i}`}
            player={teamB[i]}
            index={i}
            team="b"
            x={pos.x}
            y={pos.y}
            delay={(playersPerTeam + i) * 60}
            onSlotClick={() => onSlotClick?.(globalIndex)}
            onPlayerClick={onPlayerClick}
            justJoined={justJoinedIndex === globalIndex}
          />
        );
      })}
    </div>
  );
};

export default SoccerField;
