import React, { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ChatPage.css"
import { ChatState } from "../Context/ChatProvider"
import Navbar from '../Components/ChatpgCompo/Navbar';

import MyChats from "../Components/ChatpgCompo/MyChats"
import ChatBox from "../Components/ChatpgCompo/ChatBox"



export const ChatPage = () => {
    const { user } = ChatState()
    const [fetchAgain, setFetchAgain] = useState(false)

    return (
        <>

            <div className="chatpage">
                {user && <Navbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}

                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}


            </div>





        </>
    )
}
export default ChatPage
