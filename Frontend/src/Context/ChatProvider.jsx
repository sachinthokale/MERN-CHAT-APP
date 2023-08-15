
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [notification, setNotification] = useState([])
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        if (!userInfo) {
            navigate("/")
        }
    }, [navigate])

    return (
        <ChatContext.Provider value={{ notification, setNotification, user, setUser, selectedChat, setSelectedChat, chats, setChats }}>{children}</ChatContext.Provider>

    )
}
export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider