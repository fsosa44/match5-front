import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { MatchesProvider } from "./context/MatchesContext";

const App = () => {
  return (
    <MatchesProvider>
      <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/player/:playerId" element={<PlayerProfile />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:matchId" element={<ChatRoom />} />
        <Route path="/private-chat/:conversationId" element={<PrivateChatRoom />} />
        <Route path="/history" element={<MatchHistory />} />
        <Route path="/rate/:matchId" element={<RateMatch />} />
      </Routes>
      </Router>
    </MatchesProvider>
  );
};

export default App;
