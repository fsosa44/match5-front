import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import CreateGame from "./screens/CreateGame";
import MatchDetail from "./screens/MatchDetail";
import PlayerProfile from "./screens/PlayerProfile";
import MapScreen from "./screens/MapScreen";
import MyProfile from "./screens/MyProfile";
import ChatList from "./screens/ChatList";
import ChatRoom from "./screens/ChatRoom";
import PrivateChatRoom from "./screens/PrivateChatRoom";
import MatchHistory from "./screens/MatchHistory";
import RateMatch from "./screens/RateMatch";
import EditProfile from "./screens/EditProfile";
import { useMatchesStore } from "./stores/matchesStore";
import { useUserStore } from "./stores/userStore";
import { useChatStore } from "./stores/chatStore";
import { connectSocket, disconnectSocket, getSocket } from "./services/socket";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/register" replace />;
  return <>{children}</>;
};

const App = () => {
  const fetchAll = useMatchesStore((s) => s.fetchAll);
  const fetchUser = useUserStore((s) => s.fetchUser);
  const addUnread = useChatStore((s) => s.addUnread);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAll();
      fetchUser();
    }
  }, [fetchAll, fetchUser]);

  // Global socket for notifications
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = connectSocket();

    const handleNotification = ({ chatId }: { type: string; chatId: string }) => {
      addUnread(chatId);
    };

    socket.on("notification:message", handleNotification);

    return () => {
      socket.off("notification:message", handleNotification);
    };
  }, [addUnread]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/create-game" element={<PrivateRoute><CreateGame /></PrivateRoute>} />
        <Route path="/match/:id" element={<PrivateRoute><MatchDetail /></PrivateRoute>} />
        <Route path="/player/:playerId" element={<PrivateRoute><PlayerProfile /></PrivateRoute>} />
        <Route path="/map" element={<PrivateRoute><MapScreen /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
        <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatList /></PrivateRoute>} />
        <Route path="/chat/:matchId" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
        <Route path="/private-chat/:conversationId" element={<PrivateRoute><PrivateChatRoom /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><MatchHistory /></PrivateRoute>} />
        <Route path="/rate/:matchId" element={<PrivateRoute><RateMatch /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
