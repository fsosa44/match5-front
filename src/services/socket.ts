import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (socket?.connected) return socket;

  const token = localStorage.getItem("token");
  socket = io(SOCKET_URL, {
    auth: { token },
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("Socket conectado:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Error de conexión Socket:", err.message);
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Match chat
export const joinMatchRoom = (matchId: string) => {
  socket?.emit("join:match", matchId);
};

export const leaveMatchRoom = (matchId: string) => {
  socket?.emit("leave:match", matchId);
};

export const sendMatchMessage = (matchId: string, text: string) => {
  socket?.emit("message:match", { matchId, text });
};

// Private chat
export const joinConversationRoom = (conversationId: string) => {
  socket?.emit("join:conversation", conversationId);
};

export const leaveConversationRoom = (conversationId: string) => {
  socket?.emit("leave:conversation", conversationId);
};

export const sendPrivateMessage = (conversationId: string, text: string) => {
  socket?.emit("message:private", { conversationId, text });
};
