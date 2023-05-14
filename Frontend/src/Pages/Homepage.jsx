import React, { useState } from 'react'
import "./Homepage.css"
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';



const Homepage = () => {
    const [togglestate, setTogglestate] = useState(1);
    const toggleTab = (index) => {
        console.log(index)
        setTogglestate(index)
    }
    return (
        <>
            <div className="body">
                <div className="main_container">
                    <div className="left_container">

                    </div>




                    <div className="right_container">
                        {/* <div className="header">
                            <img src={require('./Bbbleup.png')} alt="ffff" />
                        </div> */}
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