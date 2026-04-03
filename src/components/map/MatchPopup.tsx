import { useNavigate } from "react-router-dom";
import { MatchData } from "../../types/match";

interface MatchPopupProps {
  match: MatchData;
}

const MatchPopup = ({ match }: MatchPopupProps) => {
  const navigate = useNavigate();
  const currentPlayers = match.players.filter(Boolean).length;
  const isFull = currentPlayers >= match.maxPlayers;

  return (
    <div className="min-w-[220px] font-sans">
      {/* Title row */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">⚽</span>
        <span className="text-base font-bold text-primary">
          {match.location}
        </span>
      </div>

      {/* Info rows */}
      <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
        <span>📍</span>
        <span>Sarandí, Avellaneda</span>
      </div>

      <div className="mb-1 flex items-center gap-2 text-sm text-gray-600">
        <span>📅</span>
        <span>
          {match.date} a las {match.time}
        </span>
      </div>

      <div className="mb-3 flex items-center gap-2 text-sm">
        <span>👥</span>
        <span className={isFull ? "font-semibold text-red-500" : "text-gray-600"}>
          {currentPlayers}/{match.maxPlayers} jugadores
        </span>
      </div>

      {/* Tags */}
      {(match.intensity || match.ageRange) && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {match.intensity === "recreational" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              Recreativo
            </span>
          )}
          {match.intensity === "competitive" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
              Competitivo
            </span>
          )}
          {match.intensity === "flexible" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
              Flexible
            </span>
          )}
          {match.ageRange && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
              {match.ageRange.label}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-2.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-accent">
            M5
          </div>
          <span className="text-xs text-gray-500">Match 5</span>
        </div>
        <button
          onClick={() => navigate(`/match/${match.id}`)}
          className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-secondary"
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default MatchPopup;
