import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import { IoSend } from "react-icons/io5";
import Loader from "../components/atoms/loader/Loader";
import { getPrivateMessages, getConversationById, PrivateMessage, ConversationParticipant } from "../api/conversations";
import {
  connectSocket,
  joinConversationRoom,
  leaveConversationRoom,
  sendPrivateMessage,
} from "../services/socket";
import { useChatStore } from "../stores/chatStore";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace("/api", "");

const PrivateChatRoom = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [otherUser, setOtherUser] = useState<ConversationParticipant | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentUserId = localStorage.getItem("userId");

  const setActiveChatId = useChatStore((s) => s.setActiveChatId);

  useEffect(() => {
    if (!conversationId) return;

    setActiveChatId(conversationId);

    const loadMessages = async () => {
      try {
        const msgs = await getPrivateMessages(conversationId);
        setMessages(msgs);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
      }
    };

    const loadConversation = async () => {
      try {
        const conv = await getConversationById(conversationId);
        const other = conv.participants.find((p) => p._id !== currentUserId);
        if (other) setOtherUser(other);
      } catch (err) {
        console.error("Error cargando conversación:", err);
      }
    };

    Promise.all([loadMessages(), loadConversation()]).finally(() =>
      setLoading(false)
    );

    const socket = connectSocket();
    joinConversationRoom(conversationId);

    const handleNewMessage = (msg: PrivateMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message:private", handleNewMessage);

    return () => {
      socket.off("message:private", handleNewMessage);
      leaveConversationRoom(conversationId);
      setActiveChatId(null);
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || !conversationId) return;
    sendPrivateMessage(conversationId, text);
    setInput("");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <Layout hideNav>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/5 px-4 pb-3 pt-4">
          <BackButton />
          <div className="flex items-center gap-2">
            {otherUser?.profilePhoto ? (
              <img
                src={`${API_BASE}${otherUser.profilePhoto}`}
                alt={otherUser.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {getInitials(otherUser?.name ?? "?")}
              </div>
            )}
            <h2 className="text-sm font-bold text-on-surface">{otherUser ? `${otherUser.name} ${otherUser.lastName || ""}`.trim() : "Chat privado"}</h2>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {loading ? (
            <Loader size="section" label="Cargando mensajes" />
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center pt-20">
              <p className="text-sm text-text-light/50">
                No hay mensajes. ¡Empezá la conversación!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((msg) => {
                const isMe = msg.sender._id === currentUserId;
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
                        {getInitials(msg.sender.name)}
                      </div>
                    )}
                    <div
                      className={`flex max-w-[75%] flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`rounded-2xl px-3.5 py-2 ${
                          isMe
                            ? "rounded-br-md bg-accent text-button-text"
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

export default PrivateChatRoom;
