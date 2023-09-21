import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { useEffect } from "react";
import { getDP, getSender } from "../../config/ChatLogics";
import "./MyChats.css";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, user, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);

      setChats(data);
      console.log(chats);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log(loggedUser);
    console.log("first");
    fetchChats();
  }, [fetchAgain]);
  return (
    <>
      {chats.map((chat) => (
        <div
          onClick={() => {
            setSelectedChat(chat);
          }}
          className={selectedChat === chat ? "active-chat" : "chat"}
          key={chat._id}
        >
          <img
            src={
              !chat.isGroupChat ? getDP(loggedUser, chat.users) : chat.chatName
            }
            alt=""
          />
          <span>
            {!chat.isGroupChat
              ? getSender(loggedUser, chat.users)
              : chat.chatName}
          </span>
        </div>
      ))}
    </>
  );
};

export default MyChats;
