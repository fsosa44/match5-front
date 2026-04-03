import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { mockChats } from "../data/mockChats";
import { mockMatches } from "../data/mockMatches";

const ChatList = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 pt-6">
        <h1 className="mb-6 text-2xl font-bold text-text-light">Chats</h1>

        {mockChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <span className="text-5xl">💬</span>
            <p className="mt-4 text-center text-sm text-text-light/50">
              No tenés chats todavía.
              <br />
              Unite a un partido para empezar a hablar.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mockChats.map((chat) => {
              const match = mockMatches.find((m) => m.id === chat.matchId);
              const currentPlayers = match?.players.filter(Boolean).length ?? 0;

              return (
                <button
                  key={chat.matchId}
                  onClick={() => navigate(`/chat/${chat.matchId}`)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-secondary p-4 text-left transition-colors active:bg-input"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-xl">⚽</span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-bold text-text-light">
                        {chat.matchLocation}
                      </span>
                      <span className="shrink-0 text-[10px] text-text-light/40">
                        {chat.lastMessageTime}
                      </span>
                    </div>

                    <span className="mt-0.5 block text-[11px] text-accent">
                      {chat.matchDate} — {chat.matchTime}
                    </span>

                    <div className="mt-1 flex items-center justify-between">
                      <p className="truncate text-xs text-text-light/50">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-button-text">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChatList;
