import { useContext, useRef } from "react";
import "./login.css";
import { Context } from "../../context/Context";
import axios from "axios"
import { Link } from "react-router-dom";

export default function Login() {
 
 
  const passwordRef = useRef()
  const emailRef = useRef()
  const {dispatch , isFetching} = useContext(Context)
  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post("https://helpful-mittens-ant.cyclic.app/auth/login",{
        email:emailRef.current.value,
        password:passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS" , payload:res.data.loggedInUser})
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." ref={emailRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <Link to={"/signup"}>
        <button className="loginRegisterButton">Register</button>
        </Link>
    </div>
  );
}