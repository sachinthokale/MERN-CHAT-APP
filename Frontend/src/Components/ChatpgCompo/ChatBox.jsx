import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat";
import "./ChatBox.css";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user, chats, setChats } = ChatState();
  return (
    <div className="chat-box">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
