import React, { useState } from 'react'
import "../Authentication/Signup.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';






const Signup = () => {
    const [shwopass, setShowpass] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpass, setConfirmpass] = useState()
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    // console.log(pic);





    const postDetails = (file) => {

        setLoading(true)
        if (file === undefined) {
            toast.warn('Please Upload valid Image', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
        if (file.type === "image/jpeg" || file.type === "image/png") {
            const formdata = new FormData();
            formdata.append('file', file)
            formdata.append("upload_preset", "sachin_bubbleup")
            axios.post("https://api.cloudinary.com/v1_1/duzbsi4wn/image/upload", formdata)
                .then((res) => setPic(res.data.secure_url)).catch((err) => {
                    console.log(err)

                })
            setLoading(false)

        } else {
            toast.warn('Please Select an Image', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false)
            return;

        }

    }






    const showPassword = (e) => {
        e.preventDefault()
        setShowpass(!shwopass);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!name || !email || !password || !confirmpass) {

            toast.warn('Please Fill All the Feilds', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false)
            return;

        }
        if (password !== confirmpass) {

            toast.error('password and confirm password does not match', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            }
            const { data } = await axios.post("/api/user", { name, email, password, pic }, config)
            toast.success('Registration Successful', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            navigate("/chats")


        } catch (error) {
            console.log(error)

        }

    }
    return (
        <>
            <form className="signup_form" >
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)} />

                <label htmlFor="">Email</label>
                <input type="email" placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <div className="password">
                    <input type={shwopass === true ? "text" : "password"} placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={showPassword}>show</button>
                </div>

                <label htmlFor="">Confirm Password </label>
                <div className="password">
                    <input type={shwopass === true ? "text" : "password"} placeholder='Confirm Password'
                        onChange={(e) => setConfirmpass(e.target.value)}
                    />
                    <button onClick={(e) => showPassword(e)}>show</button>
                </div>
                <label htmlFor="">Upload your Picture</label>
                <input type="file"
                    accept="image/"
                    onChange={(e) => { postDetails(e.target.files[0]) }} />
                <Button colorScheme='blue' isLoading={loading}
                    onClick={submitHandler}>Sign up</Button>

            </form>
            <ToastContainer />




        </>

    )
}



export default Signup