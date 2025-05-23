import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./screens/Register";
import Home from "./screens/Home";
import CreateGame from "./screens/CreateGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-game" element={<CreateGame />} />
      </Routes>
    </Router>
  );
};

export default App;
