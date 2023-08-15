import React from 'react'
import ScrollableFeed from "react-scrollable-feed"
import { isLastMessage, isSameSenderMargin, isSameSender, isSameUser } from '../../config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'
import "./ScrollableChat.css"
import { Tooltip, Avatar } from "@chakra-ui/react"

const ScrollableChat = ({ messages }) => {
    const { user, selectedChat, setSelectedChat } = ChatState()
    return (
        <ScrollableFeed className='ScrollableFeed'>
            {
                messages && messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {
                            (isSameSender(messages, m, i, user._id) ||
                                isLastMessage(messages, i, user._id)
                            ) && (
                                <img className='scroll-avatar' style={{ height: "40px", width: "40px" }} src={m.sender.pic} alt="" />
                            )
                        }
                        <span
                            className='single-chat-message'
                            style={{

                                backgroundColor: `${m.sender._id === user._id ?
                                    "#ff4f5bc4" : "#8c52ffa7"}`,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 2 : 10,






                            }}
                        >
                            {m.content}

                        </span>
                    </div>
                )

                )
            }

        </ScrollableFeed>
    )
}

export default ScrollableChat