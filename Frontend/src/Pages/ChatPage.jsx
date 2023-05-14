import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export const ChatPage = () => {



    return (
        <div>
            <button onClick={() => {
                toast('🦄 Wow so easy!');
            }}> click me</button>
            <ToastContainer />
        </div>
    )
}
export default ChatPage
