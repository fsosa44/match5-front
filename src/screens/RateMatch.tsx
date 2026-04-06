import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import { useMatches } from "../context/MatchesContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Player } from "../types/match";
import { motion, AnimatePresence } from "framer-motion";
import { rateMatch as rateMatchAPI } from "../api/ratings";

interface PlayerRatingState {
  rating: number;
  comment: string;
}

const RateMatch = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { finishedMatches, rateMatch } = useMatches();
  const match = finishedMatches.find((m) => m.id === matchId);
  const currentUserId = localStorage.getItem("userId") || "current";

  const allPlayers = match
    ? [...match.teamA, ...match.teamB].filter((p) => p.id !== currentUserId)
    : [];

  const [ratings, setRatings] = useState<Record<string, PlayerRatingState>>(
    () =>
      Object.fromEntries(
        allPlayers.map((p) => [p.id, { rating: 0, comment: "" }])
      )
  );

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Track which stars just changed for burst animation
  const [starBurst, setStarBurst] = useState<string | null>(null);

  if (!match) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <p className="text-text-light/50">Partido no encontrado</p>
        </div>
      </Layout>
    );
  }

  const userTeam = match.teamA.find((p) => p.id === currentUserId)
    ? "A"
    : "B";
  const userTeamPlayers =
    userTeam === "A"
      ? match.teamA.filter((p) => p.id !== currentUserId)
      : match.teamB.filter((p) => p.id !== currentUserId);
  const opponentPlayers = userTeam === "A" ? match.teamB : match.teamA;

  const setPlayerRating = (playerId: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [playerId]: { ...prev[playerId], rating },
    }));
    setStarBurst(`${playerId}-${rating}`);
    setTimeout(() => setStarBurst(null), 400);
  };

  const setPlayerComment = (playerId: string, comment: string) => {
    setRatings((prev) => ({
      ...prev,
      [playerId]: { ...prev[playerId], comment },
    }));
  };

  const allRated = allPlayers.every((p) => ratings[p.id]?.rating > 0);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    const playerRatings = allPlayers.map((p) => ({
      playerId: p.id,
      rating: ratings[p.id].rating,
      comment: ratings[p.id].comment || undefined,
    }));

    // Llamada al backend
    try {
      await rateMatchAPI(
        match.id,
        allPlayers.map((p) => ({
          player: p.id,
          rating: ratings[p.id].rating,
          comment: ratings[p.id].comment || undefined,
        }))
      );
    } catch {
      // Si falla el backend, seguimos con el flujo local
    }

    rateMatch(match.id, playerRatings);
    setSubmitted(true);
    setTimeout(() => navigate("/"), 1500);
  };

  const renderStars = (playerId: string) => {
    const current = ratings[playerId]?.rating || 0;
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= current;
          const isBursting = starBurst === `${playerId}-${star}`;
          return (
            <motion.button
              key={star}
              onClick={() => setPlayerRating(playerId, star)}
              whileTap={{ scale: 1.4 }}
              animate={
                isFilled
                  ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, -12, 12, 0],
                    }
                  : { scale: 1, rotate: 0 }
              }
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: isFilled ? (star - 1) * 0.06 : 0,
              }}
              className="relative"
            >
              {isFilled ? (
                <FaStar size={24} className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" />
              ) : (
                <FaRegStar size={24} className="text-yellow-400/30" />
              )}
              {/* Burst ring */}
              <AnimatePresence>
                {isBursting && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 rounded-full border-2 border-yellow-400/60"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderPlayerCard = (player: Player, index: number) => {
    const initials = player.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

    const hasRating = ratings[player.id]?.rating > 0;

    return (
      <motion.div
        key={player.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`rounded-2xl p-4 transition-colors duration-300 ${
          hasRating
            ? "bg-input ring-1 ring-accent/20"
            : "bg-input"
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={
              hasRating
                ? { scale: [1, 1.1, 1], borderColor: "rgba(122, 195, 74, 0.6)" }
                : { scale: 1 }
            }
            transition={{ duration: 0.3 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-transparent bg-secondary text-sm font-bold text-accent"
          >
            {initials}
          </motion.div>
          <div className="flex-1">
            <p className="font-semibold text-text-light">{player.name}</p>
            {renderStars(player.id)}
          </div>
          {/* Rating number badge */}
          <AnimatePresence>
            {hasRating && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/20 text-sm font-bold text-yellow-400"
              >
                {ratings[player.id].rating}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Animated comment input */}
        <AnimatePresence>
          {hasRating && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <input
                type="text"
                placeholder="Comentario opcional..."
                value={ratings[player.id]?.comment || ""}
                onChange={(e) => setPlayerComment(player.id, e.target.value)}
                className="w-full rounded-xl bg-secondary px-3 py-2 text-sm text-text-light placeholder-text-light/30 outline-none focus:ring-1 focus:ring-accent/50"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  if (submitted) {
    return (
      <Layout>
        <div className="flex h-[70vh] flex-col items-center justify-center gap-4 px-4">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-6xl"
          >
            🎉
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-text-light"
          >
            ¡Gracias por calificar!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-text-light/50"
          >
            Tus calificaciones ayudan a mejorar la comunidad
          </motion.p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col px-4 pb-8">
        {/* Header */}
        <div className="mb-2 mt-4 flex items-center gap-3">
          <BackButton />
          <h1 className="text-xl font-bold text-text-light">
            Calificar jugadores
          </h1>
        </div>

        {/* Match info */}
        <div className="mt-4 rounded-2xl bg-secondary p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light/60">{match.date}</p>
              <p className="font-semibold text-text-light">
                {match.location}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-primary px-3 py-1.5">
              <span className="text-lg font-bold text-accent">
                {match.result.teamA}
              </span>
              <span className="text-sm text-text-light/40">-</span>
              <span className="text-lg font-bold text-accent">
                {match.result.teamB}
              </span>
            </div>
          </div>
        </div>

        {/* Your team */}
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-text-light">
            🟢 Tu equipo
          </h2>
          <div className="flex flex-col gap-3">
            {userTeamPlayers.map((p, i) => renderPlayerCard(p, i))}
          </div>
        </section>

        {/* Opponents */}
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-text-light">
            🔴 Oponentes
          </h2>
          <div className="flex flex-col gap-3">
            {opponentPlayers.map((p, i) => renderPlayerCard(p, i + userTeamPlayers.length))}
          </div>
        </section>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          disabled={!allRated}
          animate={
            allRated
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0.5, y: 0, scale: 0.97 }
          }
          whileTap={allRated ? { scale: 0.96 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`mt-8 w-full rounded-2xl py-4 text-lg font-bold ${
            allRated
              ? "bg-accent text-button-text"
              : "bg-secondary text-text-light/30"
          }`}
        >
          Enviar calificaciones ⭐
        </motion.button>
      </div>
    </Layout>
  );
};

export default RateMatch;
