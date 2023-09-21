import React, { useState } from "react";
import "../Authentication/Signup.css";
import "../Authentication/Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [shwopass, setShowpass] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpass, setConfirmpass] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showPassword = (e) => {
    e.preventDefault();
    setShowpass(!shwopass);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password || !confirmpass) {
      toast.warn("Please Fill All the Feilds", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpass) {
      toast.error("Password did not Match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast.success("Login Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error);
      toast.error("Errot Occured", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <form action="#" className="signup_form">
        <label htmlFor="">Email</label>
        <input
          value={email}
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <div className="password">
          <input
            type={shwopass === true ? "text" : "password"}
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => showPassword(e)}>show</button>
        </div>

        <label htmlFor="">Confirm Password </label>
        <div className="password">
          <input
            type={shwopass === true ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)}
          />
          <button onClick={showPassword}>show</button>
        </div>

        <Button onClick={submitHandler} isLoading={loading}>
          Login
        </Button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setEmail("guest@example.com");
            setPassword("123456");
            setConfirmpass("123456");
          }}
        >
          Login as Guest
        </button>
      </form>
      <div className="theme-for-phone"></div>
      <ToastContainer />
    </>
  );
};

export default Login;
