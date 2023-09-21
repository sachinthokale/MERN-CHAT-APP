import React, { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./ChatPage.css";
import { ChatState } from "../Context/ChatProvider";
import Navbar from "../Components/ChatpgCompo/Navbar";

import MyChats from "../Components/ChatpgCompo/MyChats";
import ChatBox from "../Components/ChatpgCompo/ChatBox";

export const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, user, setSelectedChat, chats, setChats } = ChatState();
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <div className="chatpage">
        {isMobile ? (
          selectedChat ? (
            <>
              {user && (
                <ChatBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </>
          ) : (
            <>
              {user && (
                <Navbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
              )}
            </>
          )
        ) : (
          <>
            {user && (
              <Navbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}

            {user && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </>
        )}
      </div>
    </>
  );
};
export default ChatPage;
