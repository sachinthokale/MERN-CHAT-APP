import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import "./SingleChat.css";
import ProfileModel from "./ProfileModel";
import { getDP, getSender, getSenderFull } from "../../config/ChatLogics";
import UpdateGroupModel from "./UpdateGroupModel";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "lottie-react";
import typingAnimationData from "../Animations/typing.json";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Navbar from "./Navbar";

const ENDPOINT = "http://localhost:5000";

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [showModel, setShowModel] = useState(false);
  const [groupChatModel, setGroupChatModel] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {}
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // give notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);

        setMessages([...messages, data]);
      } catch (error) {}
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    });

    // typing indicator logic
  };

  // console.log(selectedChat)

  return (
    <>
      {selectedChat ? (
        <>
          <div className="user-header">
            {!selectedChat.isGroupChat ? (
              <>
                <ArrowBack onClick={() => setFetchAgain(!fetchAgain)} />
                <div className="user-profile">
                  <img
                    src={getDP(user, selectedChat.users)}
                    onClick={() => setShowModel(true)}
                    alt="f"
                  />
                  <span>{getSender(user, selectedChat.users)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="user-profile">
                  <img
                    alt="f"
                    src={selectedChat.pic}
                    onClick={() => setGroupChatModel(true)}
                  />
                  <span>{selectedChat.chatName}</span>
                </div>
              </>
            )}
          </div>

          <div className="chat-message-box">
            <div className="scroable-chat">
              <ScrollableChat messages={messages} />
            </div>
            <div className="chat-input" onKeyDown={sendMessage}>
              {isTyping ? (
                <div>
                  {" "}
                  <Lottie
                    className="typing-indicator"
                    animationData={typingAnimationData}
                    loop={true}
                    width={600}
                    height={500}
                  />{" "}
                </div>
              ) : (
                <></>
              )}

              <input
                placeholder="Type a Message..."
                type="text"
                onChange={(e) => {
                  typingHandler(e);
                }}
                value={newMessage}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="start-chat">
            <h3>Click on user to start new chat...</h3>
          </div>
        </>
      )}
      {showModel && (
        <div className="profileModel">
          <ProfileModel
            className="profileModel"
            user={getSenderFull(user, selectedChat.users)}
            setShowModel={setShowModel}
          />
        </div>
      )}
      {groupChatModel && (
        <div className="profileModel">
          <UpdateGroupModel
            fetchMessages={fetchMessages}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            className="profileModel"
            user={getSenderFull(user, selectedChat.users)}
            setGroupChatModel={setGroupChatModel}
          />
        </div>
      )}
    </>
  );
};

export default SingleChat;
