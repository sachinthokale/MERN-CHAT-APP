import React, { useState, useEffect } from 'react'
import "./Homepage.css"
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';



const Homepage = () => {
    const [togglestate, setTogglestate] = useState(1);
    const navigate = useNavigate()
    const toggleTab = (index) => {
        console.log(index)
        setTogglestate(index)
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))

        if (userInfo) {
            navigate("/chats")
        }
    }, [navigate])
    return (
        <>
            <div className="body">
                <div className="main_container">

                    <div className="left_container">
                    </div>

                    <div className="right_container">

                        <div className="login">
                            <div className="login_signup_buttons">
                                <button className={togglestate === 1 ? "active_button" : "btn"} onClick={() => toggleTab(1)}>Login</button>
                                <button className={togglestate === 2 ? "active_button" : "btn"} onClick={() => toggleTab(2)} >Sign Up</button>
                            </div>

                            <div className={togglestate === 1 ? "line" : "line_right"}></div>

                            <div className="login_signup_forms">
                                <div className={togglestate === 1 ? "active_tab" : "tab"} >
                                    <Login />

                                </div>
                                <div className={togglestate === 2 ? "active_tab" : "tab"} >
                                    <Signup />
                                </div>

                            </div>

                        </div>

                    </div>





                </div>
            </div>






        </>
    )
}

export default Homepage