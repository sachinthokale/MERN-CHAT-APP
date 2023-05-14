import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />


      </Routes>
    </Router>
  );
}

export default App;
