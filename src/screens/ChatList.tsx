import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useMatches } from "../context/MatchesContext";
import { getConversations, getOrCreateConversation, Conversation } from "../api/conversations";
import { searchUsers, SearchUser } from "../api/users";
import { IoSearch, IoClose } from "react-icons/io5";
import { FiMessageCircle, FiUsers } from "react-icons/fi";

type Tab = "partidos" | "privados";

const ChatList = () => {
  const navigate = useNavigate();
  const { matches } = useMatches();
  const [tab, setTab] = useState<Tab>("partidos");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConv, setLoadingConv] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [searching, setSearching] = useState(false);
  const currentUserId = localStorage.getItem("userId");

  // Load conversations when private tab is active
  useEffect(() => {
    if (tab === "privados") {
      setLoadingConv(true);
      getConversations()
        .then(setConversations)
        .catch(console.error)
        .finally(() => setLoadingConv(false));
    }
  }, [tab]);

  // Search users with debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchUsers(searchQuery.trim());
        setSearchResults(results);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleStartConversation = async (userId: string) => {
    try {
      const conversation = await getOrCreateConversation(userId);
      setSearchQuery("");
      setSearchResults([]);
      navigate(`/private-chat/${conversation._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Only matches where the current user is a player
  const myMatches = matches.filter((m) =>
    m.players.some((p) => p && p.id === currentUserId)
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  const getOtherParticipant = (conv: Conversation) =>
    conv.participants.find((p) => p._id !== currentUserId) ?? conv.participants[0];

  const positionLabels: Record<string, string> = {
    goalkeeper: "Arquero",
    defender: "Defensor",
    midfielder: "Mediocampista",
    forward: "Delantero",
  };

  return (
    <Layout>
      <div className="px-4 pt-6">
        <h1 className="mb-4 text-2xl font-bold text-text-light">Chats</h1>

        {/* Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setTab("partidos")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              tab === "partidos"
                ? "bg-accent text-button-text"
                : "bg-secondary text-text-light/60"
            }`}
          >
            <FiUsers size={14} />
            Partidos
          </button>
          <button
            onClick={() => setTab("privados")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              tab === "privados"
                ? "bg-accent text-button-text"
                : "bg-secondary text-text-light/60"
            }`}
          >
            <FiMessageCircle size={14} />
            Privados
          </button>
        </div>

        {/* ======= MATCH CHATS TAB ======= */}
        {tab === "partidos" && (
          <>
            {myMatches.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-20">
                <FiUsers size={48} className="text-text-light/20" />
                <p className="mt-4 text-center text-sm text-text-light/50">
                  No estás en ningún partido todavía.
                  <br />
                  Unite a uno para chatear con el grupo.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {myMatches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => navigate(`/chat/${match.id}`)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-secondary p-4 text-left transition-colors active:bg-input"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                      <span className="text-xl">⚽</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="truncate text-sm font-bold text-text-light">
                        {match.location}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-accent">
                        {match.date} — {match.time}
                      </span>
                      <p className="mt-0.5 text-xs text-text-light/40">
                        {match.location} · {match.players.filter(Boolean).length}/{match.maxPlayers} jugadores
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* ======= PRIVATE CHATS TAB ======= */}
        {tab === "privados" && (
          <>
            {/* Search bar */}
            <div className="relative mb-4">
              <IoSearch
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light/30"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar jugador por nombre..."
                className="w-full rounded-full bg-input py-2.5 pl-9 pr-9 text-sm text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light/40"
                >
                  <IoClose size={16} />
                </button>
              )}
            </div>

            {/* Search results */}
            {searchQuery.trim().length >= 2 && (
              <div className="mb-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-light/40">
                  Resultados
                </p>
                {searching ? (
                  <p className="text-sm text-text-light/50">Buscando...</p>
                ) : searchResults.length === 0 ? (
                  <p className="text-sm text-text-light/50">No se encontraron jugadores</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {searchResults.map((user) => (
                      <button
                        key={user._id}
                        onClick={() => handleStartConversation(user._id)}
                        className="flex w-full items-center gap-3 rounded-xl bg-secondary p-3 text-left transition-colors active:bg-input"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-text-light">
                            {user.name}
                          </span>
                          {user.position && (
                            <span className="block text-[11px] text-text-light/40">
                              {positionLabels[user.position] ?? user.position}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Existing conversations */}
            {!searchQuery && (
              <>
                {loadingConv ? (
                  <p className="pt-10 text-center text-sm text-text-light/50">Cargando...</p>
                ) : conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center pt-20">
                    <FiMessageCircle size={48} className="text-text-light/20" />
                    <p className="mt-4 text-center text-sm text-text-light/50">
                      No tenés conversaciones privadas.
                      <br />
                      Buscá un jugador arriba para empezar.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {conversations.map((conv) => {
                      const other = getOtherParticipant(conv);
                      return (
                        <button
                          key={conv._id}
                          onClick={() => navigate(`/private-chat/${conv._id}`)}
                          className="flex w-full items-center gap-3 rounded-2xl bg-secondary p-4 text-left transition-colors active:bg-input"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                            {getInitials(other.name)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="truncate text-sm font-bold text-text-light">
                                {other.name}
                              </span>
                              {conv.lastMessage?.createdAt && (
                                <span className="shrink-0 text-[10px] text-text-light/40">
                                  {new Date(conv.lastMessage.createdAt).toLocaleTimeString(
                                    "es-AR",
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}
                                </span>
                              )}
                            </div>
                            {conv.lastMessage?.text && (
                              <p className="mt-1 truncate text-xs text-text-light/50">
                                {conv.lastMessage.sender === currentUserId ? "Vos: " : ""}
                                {conv.lastMessage.text}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ChatList;
