import React from "react";
import Button from "../components/atoms/button/Button";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import GameCard from "../components/atoms/game-card/GameCard";
import { useNavigate } from "react-router-dom";
import { useMatches } from "../context/MatchesContext";

const Home = () => {
  const navigate = useNavigate();
  const { matches, getPendingRating } = useMatches();
  const pendingMatch = getPendingRating();

  return (
    <Layout>
      <div className="flex flex-col items-center px-4">
        {/* Back button */}
        <div className="mb-2 mt-4 flex w-full max-w-sm justify-start">
          <BackButton />
        </div>

        {/* Pending rating banner */}
        {pendingMatch && (
          <div
            onClick={() => navigate(`/rate/${pendingMatch.id}`)}
            className="mt-2 w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500/20 to-accent/20 p-4 transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-text-light">
                  Calificá a tus compañeros
                </p>
                <p className="text-xs text-text-light/60">
                  {pendingMatch.location} · {pendingMatch.date}
                </p>
              </div>
              <span className="text-lg text-text-light/40">›</span>
            </div>
          </div>
        )}

        {/* Hero card */}
        <div className="mt-6 flex w-full max-w-sm items-center gap-4 rounded-2xl bg-secondary px-6 py-5">
          <img
            src="/f5LogoCuted.png"
            alt="Match 5 Logo"
            className="h-20 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold text-text-light">Match 5</h1>
            <p className="text-base font-medium text-alternate">
              Encuentra partidos
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 w-full max-w-sm">
          <Button onClick={() => navigate("/create-game")}>
            Crear partido
          </Button>
        </div>

        {/* Próximos juegos */}
        <section className="mt-10 w-full max-w-sm">
          <h2 className="mb-3 text-xl font-bold text-text-light">
            Próximos juegos
          </h2>
          <div className="flex flex-col gap-3">
            {matches.slice(0, 1).map((match) => (
              <GameCard
                key={match.id}
                id={match.id}
                time={match.time}
                location={match.location}
                currentPlayers={match.players.filter(Boolean).length}
                maxPlayers={match.maxPlayers}
                ageLabel={match.ageRange ? `${match.ageRange.label} (${match.ageRange.min}-${match.ageRange.max})` : "Libre"}
                intensity={match.intensity}
              />
            ))}
          </div>
        </section>

        {/* Juegos cercanos */}
        <section className="mt-8 w-full max-w-sm">
          <h2 className="mb-3 text-xl font-bold text-text-light">
            Juegos cercanos
          </h2>
          <div className="flex flex-col gap-3">
            {matches.slice(1).map((match) => (
              <GameCard
                key={match.id}
                id={match.id}
                time={match.time}
                location={match.location}
                currentPlayers={match.players.filter(Boolean).length}
                maxPlayers={match.maxPlayers}
                ageLabel={match.ageRange ? `${match.ageRange.label} (${match.ageRange.min}-${match.ageRange.max})` : "Libre"}
                intensity={match.intensity}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
