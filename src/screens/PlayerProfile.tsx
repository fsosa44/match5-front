import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import StarRating from "../components/atoms/star-rating/StarRating";
import { getUserById, UserProfile } from "../api/users";
import { FiTarget, FiShield, FiActivity } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

const PlayerProfileScreen = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerId) return;
    setLoading(true);
    getUserById(playerId)
      .then(setPlayer)
      .catch(() => setPlayer(null))
      .finally(() => setLoading(false));
  }, [playerId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <p className="text-lg text-text-light/50">Cargando...</p>
        </div>
      </Layout>
    );
  }

  if (!player) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <p className="text-lg text-text-light/50">Jugador no encontrado</p>
        </div>
      </Layout>
    );
  }

  const initials = `${player.name?.[0] || ""}${player.lastName?.[0] || ""}`.toUpperCase();
  const fullName = `${player.name || ""} ${player.lastName || ""}`.trim();

  return (
    <Layout>
      <div className="flex flex-col items-center px-4">
        {/* Back */}
        <div className="mb-2 mt-4 flex w-full max-w-sm justify-start">
          <BackButton />
        </div>

        {/* Avatar + Name */}
        <div className="mt-6 flex w-full max-w-sm flex-col items-center">
          {player.profilePhoto ? (
            <img
              src={`${API_BASE}${player.profilePhoto}`}
              alt={fullName}
              className="h-20 w-20 rounded-full border-2 border-primary object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface-container-high text-2xl font-bold text-primary">
              {initials}
            </div>
          )}
          <h1 className="mt-3 text-2xl font-bold text-text-light">
            {fullName}
          </h1>
          <span className="mt-1 rounded-full bg-surface-container-high px-3 py-0.5 text-xs font-semibold text-on-surface-variant">
            {player.position}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-5 flex flex-col items-center gap-1">
          <StarRating rating={player.rating} size={22} />
          <span className="text-sm font-semibold text-text-light/70">
            {player.rating.toFixed(1)} / 5.0
          </span>
        </div>

        {/* Stats */}
        <div className="mt-6 flex w-full max-w-sm justify-around rounded-2xl bg-surface-container-high px-4 py-4">
          <div className="flex flex-col items-center gap-1">
            <FiActivity size={20} className="text-accent" />
            <span className="text-lg font-bold text-text-light">
              {player.matchesPlayed}
            </span>
            <span className="text-[10px] text-text-light/50">Partidos</span>
          </div>
          <div className="h-10 w-px self-center bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <FiTarget size={20} className="text-accent" />
            <span className="text-lg font-bold text-text-light">
              {player.goals}
            </span>
            <span className="text-[10px] text-text-light/50">Goles</span>
          </div>
          <div className="h-10 w-px self-center bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <FiShield size={20} className="text-accent" />
            <span className="text-lg font-bold text-text-light">
              {player.reviews.length}
            </span>
            <span className="text-[10px] text-text-light/50">Reseñas</span>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-8 w-full max-w-sm pb-8">
          <h2 className="mb-3 text-lg font-bold text-text-light">
            Comentarios
          </h2>
          <div className="flex flex-col gap-3">
            {player.reviews.map((review, i) => {
              const authorName =
                typeof review.author === "object" && review.author !== null
                  ? (review.author as any).name || "Jugador"
                  : "Jugador";
              const dateLabel = review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("es-AR")
                : "";
              return (
                <div key={i} className="rounded-2xl bg-input p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-light">
                      {authorName}
                    </span>
                    <div className="flex items-center gap-1">
                      <FaStar size={12} className="text-yellow-400" />
                      <span className="text-xs font-medium text-text-light/60">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm leading-relaxed text-text-light/70">
                      {review.comment}
                    </p>
                  )}
                  {dateLabel && (
                    <span className="mt-2 block text-[10px] text-text-light/30">
                      {dateLabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PlayerProfileScreen;
