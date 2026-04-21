import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import SoccerField from "../components/field/SoccerField";
import ConfirmModal from "../components/atoms/confirm-modal/ConfirmModal";
import { useMatchesStore } from "../stores/matchesStore";
import { Player } from "../types/match";
import { joinMatch as joinMatchAPI, leaveMatch as leaveMatchAPI, getMatchById } from "../api/matches";
import { connectSocket } from "../services/socket";
import { FiClock, FiMapPin, FiUsers, FiHeart, FiZap, FiLogOut } from "react-icons/fi";

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const matches = useMatchesStore((s) => s.matches);
  const updateMatch = useMatchesStore((s) => s.updateMatch);
  const match = matches.find((m) => m.id === id);

  const currentUserId = localStorage.getItem("userId") || "";
  const currentUser: Player = { id: currentUserId, name: "Vos" };

  const [players, setPlayers] = useState<(Player | null)[]>(
    match?.players ?? [],
  );
  const [justJoinedIndex, setJustJoinedIndex] = useState<number | null>(null);

  // Confirm modal state
  const [pendingSlot, setPendingSlot] = useState<number | null>(null);
  const [joining, setJoining] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [error, setError] = useState("");

  const myIndex = players.findIndex((p) => p?.id === currentUser.id);
  const hasJoined = myIndex !== -1;

  // Fetch fresh match data on mount and listen for real-time updates
  useEffect(() => {
    if (!id) return;

    getMatchById(id).then(updateMatch).catch(console.error);

    const socket = connectSocket();
    socket.emit("join:match-detail", id);

    const handlePlayerUpdate = () => {
      getMatchById(id).then(updateMatch).catch(console.error);
    };

    socket.on("match:playerUpdate", handlePlayerUpdate);

    return () => {
      socket.off("match:playerUpdate", handlePlayerUpdate);
      socket.emit("leave:match-detail", id);
    };
  }, [id, updateMatch]);

  // Sync players if match data updates
  useEffect(() => {
    if (match) setPlayers(match.players);
  }, [match]);

  const handleSlotClick = useCallback(
    (slotIndex: number) => {
      if (players[slotIndex] !== null) return;

      // If already joined, just move locally (re-position)
      if (hasJoined) {
        setPendingSlot(slotIndex);
        return;
      }

      // Not yet joined — show confirmation
      setPendingSlot(slotIndex);
    },
    [players, hasJoined],
  );

  const getTeamLabel = (slotIndex: number): string => {
    const playersPerTeam = Math.floor((match?.maxPlayers ?? 10) / 2);
    return slotIndex < playersPerTeam ? "Equipo A" : "Equipo B";
  };

  const getPositionLabel = (slotIndex: number): string => {
    const playersPerTeam = Math.floor((match?.maxPlayers ?? 10) / 2);
    const posInTeam = slotIndex < playersPerTeam ? slotIndex : slotIndex - playersPerTeam;
    if (posInTeam === 0) return "Arquero";
    if (posInTeam <= 2) return "Defensor";
    if (posInTeam <= 4) return "Mediocampista";
    return "Delantero";
  };

  const handleConfirmJoin = async () => {
    if (pendingSlot === null || !id) return;
    setError("");
    setJoining(true);

    try {
      const updated = await joinMatchAPI(id, pendingSlot);
      setPlayers(updated.players);
      updateMatch(updated);
      setJustJoinedIndex(pendingSlot);
      setTimeout(() => setJustJoinedIndex(null), 600);
      setPendingSlot(null);
    } catch (err: any) {
      setError(err.message || "Error al unirse al partido");
    } finally {
      setJoining(false);
    }
  };

  const handleCancelJoin = () => {
    setPendingSlot(null);
    setError("");
  };

  const handleLeaveMatch = async () => {
    if (!id) return;
    setError("");
    setLeaving(true);
    try {
      const updated = await leaveMatchAPI(id);
      setPlayers(updated.players);
      updateMatch(updated);
      setShowLeaveModal(false);
    } catch (err: any) {
      setError(err.message || "Error al salir del partido");
    } finally {
      setLeaving(false);
    }
  };

  const handlePlayerClick = useCallback(
    (playerId: string) => {
      if (playerId !== currentUser.id) {
        navigate(`/player/${playerId}`);
      }
    },
    [navigate, currentUser.id],
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
            <span className="h-3 w-3 rounded-full border-2 border-primary bg-primary/20" />
            <span className="text-xs font-medium text-text-light/70">
              Equipo A
            </span>
          </div>
          <span className="rounded-full bg-surface-container-high px-3 py-0.5 text-xs font-semibold text-on-surface/60">
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

        {/* Leave match button */}
        {hasJoined && (
          <button
            onClick={() => setShowLeaveModal(true)}
            className="mt-5 flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-5 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-400/20"
          >
            <FiLogOut size={16} />
            Salir del partido
          </button>
        )}

        {/* Confirm join modal */}
        <ConfirmModal
          open={pendingSlot !== null}
          title={hasJoined ? "¿Cambiar posición?" : "¿Unirte al partido?"}
          message={
            pendingSlot !== null
              ? hasJoined
                ? `¿Querés moverte a ${getPositionLabel(pendingSlot)} en ${getTeamLabel(pendingSlot)}?`
                : `Vas a jugar como ${getPositionLabel(pendingSlot)} en ${getTeamLabel(pendingSlot)}. ¿Confirmás?`
              : ""
          }
          confirmText={hasJoined ? "Cambiar" : "¡Me sumo!"}
          cancelText="Cancelar"
          loading={joining}
          onConfirm={handleConfirmJoin}
          onCancel={handleCancelJoin}
        />

        {/* Leave match confirm modal */}
        <ConfirmModal
          open={showLeaveModal}
          title="¿Salir del partido?"
          message="Vas a dejar tu lugar libre para que otro jugador se sume."
          confirmText="Salir"
          cancelText="Quedarme"
          loading={leaving}
          onConfirm={handleLeaveMatch}
          onCancel={() => setShowLeaveModal(false)}
        />

        {error && (
          <p className="mt-3 text-center text-sm text-red-400">{error}</p>
        )}
      </div>
    </Layout>
  );
};

export default MatchDetail;
