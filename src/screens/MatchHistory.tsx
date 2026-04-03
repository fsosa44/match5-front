import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import { useMatches } from "../context/MatchesContext";
import { FaStar } from "react-icons/fa";

const MatchHistory = () => {
  const navigate = useNavigate();
  const { finishedMatches } = useMatches();

  const getUserTeam = (match: (typeof finishedMatches)[0]) => {
    return match.teamA.find((p) => p.id === "current") ? "A" : "B";
  };

  const getResultLabel = (match: (typeof finishedMatches)[0]) => {
    const team = getUserTeam(match);
    const myGoals =
      team === "A" ? match.result.teamA : match.result.teamB;
    const theirGoals =
      team === "A" ? match.result.teamB : match.result.teamA;
    if (myGoals > theirGoals) return { text: "Victoria", color: "text-accent" };
    if (myGoals < theirGoals)
      return { text: "Derrota", color: "text-red-400" };
    return { text: "Empate", color: "text-yellow-400" };
  };

  return (
    <Layout>
      <div className="flex flex-col px-4 pb-8">
        {/* Header */}
        <div className="mb-2 mt-4 flex items-center gap-3">
          <BackButton />
          <h1 className="text-xl font-bold text-text-light">
            Historial de partidos
          </h1>
        </div>

        {/* Stats summary */}
        <div className="mt-4 flex justify-around rounded-2xl bg-secondary px-4 py-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-text-light">
              {finishedMatches.length}
            </span>
            <span className="text-[10px] text-text-light/50">Jugados</span>
          </div>
          <div className="h-10 w-px self-center bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-accent">
              {
                finishedMatches.filter(
                  (m) => getResultLabel(m).text === "Victoria"
                ).length
              }
            </span>
            <span className="text-[10px] text-text-light/50">Victorias</span>
          </div>
          <div className="h-10 w-px self-center bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-400">
              {
                finishedMatches.filter(
                  (m) => getResultLabel(m).text === "Empate"
                ).length
              }
            </span>
            <span className="text-[10px] text-text-light/50">Empates</span>
          </div>
          <div className="h-10 w-px self-center bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-red-400">
              {
                finishedMatches.filter(
                  (m) => getResultLabel(m).text === "Derrota"
                ).length
              }
            </span>
            <span className="text-[10px] text-text-light/50">Derrotas</span>
          </div>
        </div>

        {/* Match list */}
        <div className="mt-6 flex flex-col gap-3">
          {finishedMatches.map((match) => {
            const result = getResultLabel(match);
            const team = getUserTeam(match);
            return (
              <div
                key={match.id}
                onClick={() =>
                  !match.rated
                    ? navigate(`/rate/${match.id}`)
                    : undefined
                }
                className={`rounded-2xl bg-input p-4 transition-all duration-200 ${
                  !match.rated
                    ? "cursor-pointer hover:bg-input/80 active:scale-[0.98]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-text-light/40">
                      {match.date} · {match.time}
                    </p>
                    <p className="mt-0.5 font-semibold text-text-light">
                      {match.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 rounded-lg bg-primary px-2.5 py-1">
                      <span
                        className={`text-base font-bold ${
                          team === "A" ? "text-accent" : "text-text-light"
                        }`}
                      >
                        {match.result.teamA}
                      </span>
                      <span className="text-xs text-text-light/30">-</span>
                      <span
                        className={`text-base font-bold ${
                          team === "B" ? "text-accent" : "text-text-light"
                        }`}
                      >
                        {match.result.teamB}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold ${result.color}`}>
                      {result.text}
                    </span>
                  </div>
                </div>

                {/* Teams preview */}
                <div className="mt-3 flex gap-4 text-xs text-text-light/50">
                  <div className="flex-1">
                    <span className="font-medium text-text-light/70">
                      Equipo A:{" "}
                    </span>
                    {match.teamA.map((p) => p.name.split(" ")[0]).join(", ")}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-text-light/70">
                      Equipo B:{" "}
                    </span>
                    {match.teamB.map((p) => p.name.split(" ")[0]).join(", ")}
                  </div>
                </div>

                {/* Rating status */}
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                  {match.rated ? (
                    <span className="flex items-center gap-1 text-xs text-text-light/40">
                      <FaStar size={10} className="text-yellow-400" />
                      Calificado
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-accent">
                      ⭐ Calificar jugadores
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MatchHistory;
