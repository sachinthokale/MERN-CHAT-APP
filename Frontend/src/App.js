import { Route, Routes } from "react-router-dom"
import './App.css';
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chats" element={<ChatPage />} />
    </Routes>

  );
}

export default App;
