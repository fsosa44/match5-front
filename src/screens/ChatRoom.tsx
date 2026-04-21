import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import { IoSend } from "react-icons/io5";
import { getMessages } from "../api/chat";
import {
  connectSocket,
  joinMatchRoom,
  leaveMatchRoom,
  sendMatchMessage,
  getSocket,
} from "../services/socket";
import { useChatStore } from "../stores/chatStore";
import Loader from "../components/atoms/loader/Loader";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

interface Message {
  _id: string;
  sender: { _id: string; name: string; profilePhoto?: string | null };
  text: string;
  createdAt: string;
}

const ChatRoom = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentUserId = localStorage.getItem("userId");

  const setActiveChatId = useChatStore((s) => s.setActiveChatId);

  useEffect(() => {
    if (!matchId) return;

    setActiveChatId(matchId);

    // Load existing messages
    const loadMessages = async () => {
      try {
        const data = await getMessages(matchId);
        setMessages(data);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();

    // Connect socket and join room
    const socket = connectSocket();
    joinMatchRoom(matchId);

    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message:match", handleNewMessage);

    return () => {
      socket.off("message:match", handleNewMessage);
      leaveMatchRoom(matchId);
      setActiveChatId(null);
    };
  }, [matchId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || !matchId) return;
    sendMatchMessage(matchId, text);
    setInput("");
  };

  return (
    <Layout hideNav>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/5 px-4 pb-3 pt-4">
          <BackButton />
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high">
              <span className="text-sm">⚽</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-light">
                Chat del partido
              </h2>
              <span className="text-[10px] text-accent">
                {messages.length} mensajes
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {loading ? (
            <Loader size="section" label="Cargando mensajes" />
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center pt-20">
              <p className="text-sm text-text-light/50">
                No hay mensajes. ¡Sé el primero en escribir!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((msg) => {
                const isMe = msg.sender._id === currentUserId;
                const initials = msg.sender.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2);
                return (
                  <div
                    key={msg._id}
                    className={`flex items-end gap-1.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.sender.profilePhoto ? (
                      <img
                        src={`${API_BASE}${msg.sender.profilePhoto}`}
                        alt={msg.sender.name}
                        className="h-7 w-7 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-[9px] font-bold text-primary">
                        {initials}
                      </div>
                    )}
                    <div
                      className={`flex max-w-[75%] flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      {!isMe && (
                        <span className="mb-0.5 text-[10px] font-semibold text-primary">
                          {msg.sender.name}
                        </span>
                      )}
                      <div
                        className={`rounded-2xl px-3.5 py-2 ${
                          isMe
                            ? "rounded-br-md bg-primary text-button-text"
                            : "rounded-bl-md bg-surface-container-high text-on-surface"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      <span className="mt-0.5 text-[9px] text-text-light/30">
                        {new Date(msg.createdAt).toLocaleTimeString("es-AR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribí un mensaje..."
              className="flex-1 rounded-full bg-input px-4 py-2.5 text-sm text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-button-text transition-transform active:scale-90 disabled:opacity-40"
            >
              <IoSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
