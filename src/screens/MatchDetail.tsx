import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import SoccerField from "../components/field/SoccerField";
import { useMatches } from "../context/MatchesContext";
import { Player } from "../types/match";
import { FiClock, FiMapPin, FiUsers, FiHeart, FiZap } from "react-icons/fi";

const CURRENT_USER: Player = { id: "me", name: "Vos" };

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { matches } = useMatches();
  const match = matches.find((m) => m.id === id);

  const [players, setPlayers] = useState<(Player | null)[]>(
    match?.players ?? [],
  );
  const [justJoinedIndex, setJustJoinedIndex] = useState<number | null>(null);

  const myIndex = players.findIndex((p) => p?.id === CURRENT_USER.id);
  const hasJoined = myIndex !== -1;

  const handleSlotClick = useCallback(
    (slotIndex: number) => {
      if (players[slotIndex] !== null) return;

      setPlayers((prev) => {
        const next = [...prev];
        const oldIndex = next.findIndex((p) => p?.id === CURRENT_USER.id);
        if (oldIndex !== -1) next[oldIndex] = null;
        next[slotIndex] = CURRENT_USER;
        return next;
      });
      setJustJoinedIndex(slotIndex);
      setTimeout(() => setJustJoinedIndex(null), 600);
    },
    [players],
  );

  const handlePlayerClick = useCallback(
    (playerId: string) => {
      if (playerId !== CURRENT_USER.id) {
        navigate(`/player/${playerId}`);
      }
    },
    [navigate],
  );

  if (!match) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <p className="text-lg text-text-light/50">Partido no encontrado</p>
        </div>
      </Layout>
    );
  }

  const filledPlayers = players.filter(Boolean).length;
  const playersPerTeam = Math.floor(match.maxPlayers / 2);

  return (
    <Layout>
      <div className="flex flex-col items-center px-4">
        {/* Back */}
        <div className="mb-2 mt-4 flex w-full max-w-sm justify-start">
          <BackButton />
        </div>

        {/* Match info */}
        <div className="mt-4 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-text-light">
            Detalle del partido
          </h1>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <div className="flex items-center gap-1.5 text-alternate">
              <FiClock size={16} />
              <span>{match.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-alternate">
              <FiMapPin size={16} />
              <span>{match.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-alternate">
              <FiUsers size={16} />
              <span>
                {filledPlayers}/{match.maxPlayers} jugadores
              </span>
            </div>
          </div>

          {/* Tags */}
          {(match.intensity || match.ageRange) && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {match.intensity === "recreational" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-400/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                  <FiHeart size={12} /> Recreativo
                </span>
              )}
              {match.intensity === "competitive" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-400/10 px-2.5 py-1 text-xs font-semibold text-orange-400">
                  <FiZap size={12} /> Competitivo
                </span>
              )}
              {match.intensity === "flexible" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-400/10 px-2.5 py-1 text-xs font-semibold text-sky-400">
                  <FiUsers size={12} /> Flexible
                </span>
              )}
              {match.ageRange && (
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-400/10 px-2.5 py-1 text-xs font-semibold text-violet-400">
                  {match.ageRange.label}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Team legend */}
        <div className="mt-6 flex w-full max-w-sm items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-accent bg-accent/20" />
            <span className="text-xs font-medium text-text-light/70">
              Equipo A
            </span>
          </div>
          <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-text-light/60">
            {playersPerTeam} vs {playersPerTeam}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-light/70">
              Equipo B
            </span>
            <span className="h-3 w-3 rounded-full border-2 border-text-light bg-text-light/20" />
          </div>
        </div>

        {/* Soccer field */}
        <div className="mt-3 w-full max-w-sm">
          <SoccerField
            players={players}
            maxPlayers={match.maxPlayers}
            onSlotClick={handleSlotClick}
            onPlayerClick={handlePlayerClick}
            justJoinedIndex={justJoinedIndex}
          />
        </div>

        {/* Tip */}
        {!hasJoined && filledPlayers < match.maxPlayers && (
          <p className="mt-4 animate-pulse text-center text-xs text-accent/60">
            Tocá un lugar vacío para unirte
          </p>
        )}
        {hasJoined && filledPlayers < match.maxPlayers && (
          <p className="mt-4 text-center text-xs text-text-light/40">
            Podés cambiar tu posición tocando otro lugar vacío
          </p>
        )}
      </div>
    </Layout>
  );
};

export default MatchDetail;
