import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BackButton from "../components/atoms/back-button/BackButton";
import { mockChats, ChatMessage } from "../data/mockChats";
import { IoSend } from "react-icons/io5";

const ChatRoom = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const chat = mockChats.find((c) => c.matchId === matchId);
  const [messages, setMessages] = useState<ChatMessage[]>(
    chat?.messages ?? []
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: `new-${Date.now()}`,
      senderId: "current",
      senderName: "Francisco Sosa",
      text,
      time: new Date().toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  if (!chat) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <p className="text-lg text-text-light/50">Chat no encontrado</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNav>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/5 px-4 pb-3 pt-4">
          <BackButton />
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <span className="text-sm">⚽</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-light">
                {chat.matchLocation}
              </h2>
              <span className="text-[10px] text-accent">
                {chat.matchDate} — {chat.matchTime}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            {messages.map((msg) => {
              const isMe = msg.senderId === "current";
              const initials = msg.senderName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2);
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-1.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-accent">
                    {initials}
                  </div>

                  {/* Bubble */}
                  <div className={`flex max-w-[75%] flex-col ${isMe ? "items-end" : "items-start"}`}>
                    {!isMe && (
                      <span className="mb-0.5 text-[10px] font-semibold text-accent">
                        {msg.senderName}
                      </span>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2 ${
                        isMe
                          ? "rounded-br-md bg-accent text-button-text"
                          : "rounded-bl-md bg-secondary text-text-light"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="mt-0.5 text-[9px] text-text-light/30">
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
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
