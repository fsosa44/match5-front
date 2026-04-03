import Layout from "../components/layout/Layout";
import StarRating from "../components/atoms/star-rating/StarRating";
import { currentUser } from "../data/mockCurrentUser";
import { useMatches } from "../context/MatchesContext";
import { useNavigate } from "react-router-dom";
import {
  FiTarget,
  FiShield,
  FiActivity,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit2,
  FiChevronRight,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const PLAY_STYLE_LABELS: Record<string, { emoji: string; label: string }> = {
  recreational: { emoji: "⚽", label: "Recreativo" },
  competitive: { emoji: "🔥", label: "Competitivo" },
  flexible: { emoji: "⚡", label: "Flexible" },
};

const getAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const MyProfile = () => {
  const user = currentUser;
  const navigate = useNavigate();
  const { finishedMatches } = useMatches();

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <Layout>
      <div className="flex flex-col items-center px-4 pb-8">
        {/* Header */}
        <div className="mt-6 flex w-full max-w-sm flex-col items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent bg-secondary text-3xl font-bold text-accent">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-button-text shadow-lg transition-transform active:scale-90">
              <FiEdit2 size={14} />
            </button>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-text-light">
            {user.name}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accent">
              {user.position}
            </span>
            <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accent">
              {getAge(user.birthDate)} años
            </span>
            <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accent">
              {PLAY_STYLE_LABELS[user.playStyle].emoji} {PLAY_STYLE_LABELS[user.playStyle].label}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <StarRating rating={user.rating} size={22} />
          <span className="text-sm font-semibold text-text-light/70">
            {user.rating.toFixed(1)} / 5.0
          </span>
        </div>

        {/* Stats */}
        <div className="mt-6 flex w-full max-w-sm justify-around rounded-2xl bg-secondary px-4 py-4">
          <div className="flex flex-col items-center gap-1">
            <FiActivity size={20} className="text-accent" />
            <span className="text-lg font-bold text-text-light">
              {user.matchesPlayed}
            </span>
            <span className="text-[10px] text-text-light/50">Partidos</span>
          </div>
          <div className="h-10 w-px self-center bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <FiTarget size={20} className="text-accent" />
            <span className="text-lg font-bold text-text-light">
              {user.goals}
            </span>
            <span className="text-[10px] text-text-light/50">Goles</span>
          </div>
          <div className="h-10 w-px self-center bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <FiShield size={20} className="text-accent" />
            <span className="text-lg font-bold text-text-light">
              {user.reviews.length}
            </span>
            <span className="text-[10px] text-text-light/50">Reseñas</span>
          </div>
        </div>

        {/* Personal Info */}
        <section className="mt-6 w-full max-w-sm">
          <h2 className="mb-3 text-lg font-bold text-text-light">Mis datos</h2>
          <div className="flex flex-col gap-3 rounded-2xl bg-secondary p-4">
            <div className="flex items-center gap-3">
              <FiMail size={16} className="text-accent" />
              <span className="text-sm text-text-light/80">{user.email}</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center gap-3">
              <FiPhone size={16} className="text-accent" />
              <span className="text-sm text-text-light/80">{user.phone}</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center gap-3">
              <FiMapPin size={16} className="text-accent" />
              <span className="text-sm text-text-light/80">
                {user.location}
              </span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center gap-3">
              <FiCalendar size={16} className="text-accent" />
              <span className="text-sm text-text-light/80">
                Miembro desde {user.memberSince}
              </span>
            </div>
          </div>
        </section>

        {/* Last matches */}
        <section className="mt-6 w-full max-w-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-light">
              Últimos partidos
            </h2>
            <button
              onClick={() => navigate("/history")}
              className="flex items-center gap-1 text-xs font-semibold text-accent"
            >
              Ver todos <FiChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {finishedMatches.slice(0, 3).map((match) => {
              const userTeam = match.teamA.find((p) => p.id === "current")
                ? "A"
                : "B";
              const myGoals =
                userTeam === "A"
                  ? match.result.teamA
                  : match.result.teamB;
              const theirGoals =
                userTeam === "A"
                  ? match.result.teamB
                  : match.result.teamA;
              const resultLabel =
                myGoals > theirGoals
                  ? { text: "V", color: "bg-accent/20 text-accent" }
                  : myGoals < theirGoals
                  ? { text: "D", color: "bg-red-400/20 text-red-400" }
                  : { text: "E", color: "bg-yellow-400/20 text-yellow-400" };

              return (
                <div
                  key={match.id}
                  onClick={() =>
                    !match.rated
                      ? navigate(`/rate/${match.id}`)
                      : undefined
                  }
                  className={`flex items-center gap-3 rounded-xl bg-input px-4 py-3 ${
                    !match.rated
                      ? "cursor-pointer active:scale-[0.98]"
                      : ""
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${resultLabel.color}`}
                  >
                    {resultLabel.text}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-light">
                      {match.location}
                    </p>
                    <p className="text-[11px] text-text-light/40">
                      {match.date} · {match.result.teamA}-{match.result.teamB}
                    </p>
                  </div>
                  {!match.rated && (
                    <span className="text-xs font-semibold text-accent">
                      Calificar
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-6 w-full max-w-sm">
          <h2 className="mb-3 text-lg font-bold text-text-light">
            Comentarios sobre mí
          </h2>
          <div className="flex flex-col gap-3">
            {user.reviews.map((review, i) => (
              <div key={i} className="rounded-2xl bg-input p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-light">
                    {review.authorName}
                  </span>
                  <div className="flex items-center gap-1">
                    <FaStar size={12} className="text-yellow-400" />
                    <span className="text-xs font-medium text-text-light/60">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-light/70">
                  {review.comment}
                </p>
                <span className="mt-2 block text-[10px] text-text-light/30">
                  {review.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default MyProfile;
