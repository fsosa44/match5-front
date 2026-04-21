import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/layout/Layout";
import GameCard from "../components/atoms/game-card/GameCard";
import { useNavigate } from "react-router-dom";
import { useMatchesStore } from "../stores/matchesStore";
import { useChatStore, NotificationItem } from "../stores/chatStore";
import { FiPlus, FiBell, FiSliders, FiMessageCircle, FiUsers, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Home = () => {
  const navigate = useNavigate();
  const matches = useMatchesStore((s) => s.matches);
  const getPendingRating = useMatchesStore((s) => s.getPendingRating);
  const pendingMatch = getPendingRating();
  const unreadCount = useChatStore((s) => s.totalUnread)();
  const notifications = useChatStore((s) => s.notifications);
  const removeNotification = useChatStore((s) => s.removeNotification);
  const clearAllNotifications = useChatStore((s) => s.clearAllNotifications);

  const [showNotif, setShowNotif] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showNotif) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showNotif]);

  const handleNotifClick = (notif: NotificationItem) => {
    removeNotification(notif.id);
    setShowNotif(false);
    if (notif.type === "private") {
      navigate(`/private-chat/${notif.chatId}`);
    } else {
      navigate(`/chat/${notif.chatId}`);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col">
        {/* Sticky header */}
        <header className="sticky top-0 z-50 flex items-center justify-between bg-background/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7 text-primary" />
            <span className="font-headline text-2xl font-black italic tracking-tighter text-primary">
              Match 5
            </span>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowNotif((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotif && (
              <div className="absolute right-0 top-12 z-[100] w-80 overflow-hidden rounded-2xl border border-white/10 bg-surface-container shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-light/50">
                    Notificaciones
                  </span>
                  {notifications.length > 0 && (
                    <button
                      onClick={() => clearAllNotifications()}
                      className="text-[11px] font-semibold text-accent"
                    >
                      Limpiar todo
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center py-8">
                      <FiBell size={28} className="text-text-light/20" />
                      <p className="mt-2 text-xs text-text-light/40">
                        Sin notificaciones
                      </p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => handleNotifClick(notif)}
                        className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 active:bg-white/10"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          {notif.type === "private" ? (
                            <FiMessageCircle size={14} />
                          ) : (
                            <FiUsers size={14} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-text-light">
                            <span className="font-bold">{notif.senderName}</span>
                            {" te envió un mensaje"}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-text-light/40">
                            {notif.text}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="px-6">
          {/* Hero */}
          <div className="relative mt-2 overflow-hidden rounded-2xl bg-gradient-to-t from-background via-surface-container to-surface-container-high aspect-[16/9]">
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h1 className="font-headline text-3xl font-extrabold leading-tight tracking-tight text-on-background">
                Encuentra partidos
              </h1>
              <p className="mt-1 text-sm text-on-surface-variant">
                Juega hoy en las mejores canchas.
              </p>
            </div>
          </div>

          {/* Pending rating banner */}
          {pendingMatch && (
            <div
              onClick={() => navigate(`/rate/${pendingMatch.id}`)}
              className="mt-4 cursor-pointer rounded-2xl bg-primary/20 p-4 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
                  <FaStar size={18} className="relative text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary">
                    Calificá a tus compañeros
                  </p>
                  <p className="mt-0.5 text-xs text-on-surface-variant">
                    {pendingMatch.location} · {pendingMatch.date}
                  </p>
                </div>
                <span className="text-lg text-on-surface-variant">›</span>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => navigate("/create-game")}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary-container py-4 text-base font-bold text-button-text shadow-lg shadow-primary/10 transition-all duration-200 active:scale-[0.98]"
          >
            <FiPlus size={20} strokeWidth={3} />
            Crear partido
          </button>

          {/* Próximos juegos */}
          <section className="mt-9">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-on-background">
                Próximos juegos
              </h2>
              <button
                onClick={() => navigate("/history")}
                className="text-xs font-semibold text-primary"
              >
                Ver todos
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {matches.slice(0, 2).map((match) => (
                <GameCard
                  key={match.id}
                  id={match.id}
                  time={match.time}
                  location={match.location}
                  currentPlayers={match.players.filter(Boolean).length}
                  maxPlayers={match.maxPlayers}
                  ageLabel={
                    match.ageRange
                      ? `Edad: ${match.ageRange.min}-${match.ageRange.max}`
                      : undefined
                  }
                  intensity={match.intensity}
                  variant="featured"
                />
              ))}
            </div>
          </section>

          {/* Juegos cercanos */}
          {matches.length > 2 && (
            <section className="mt-8 pb-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-headline text-lg font-bold text-on-background">
                  Juegos cercanos
                </h2>
                <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-container-high text-on-surface-variant">
                  <FiSliders size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {matches.slice(2).map((match) => (
                  <GameCard
                    key={match.id}
                    id={match.id}
                    time={match.time}
                    location={match.location}
                    currentPlayers={match.players.filter(Boolean).length}
                    maxPlayers={match.maxPlayers}
                    ageLabel={
                      match.ageRange
                        ? `Edad: ${match.ageRange.min}-${match.ageRange.max}`
                        : undefined
                    }
                    intensity={match.intensity}
                    variant="compact"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
