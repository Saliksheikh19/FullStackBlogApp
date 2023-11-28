import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"
import axios from "axios"
export default function Register() {
  const[username , setUserName] = useState("")
  const[email ,setEmail] = useState("")
  const[password , setPassword] = useState("")
  const[error , setError] = useState(false)
const registerHandler = async (e)=>{
e.preventDefault()
try {
  setError(false)
  const res = await axios.post("https://alert-moccasins-slug.cyclic.app/auth/signUp" , {
    username,
    email,
    password,
  });
  res.data && window.location.replace("/login")
  console.log(res)
 
} catch (error) {
  setError(true)
 
  
}

}
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={registerHandler}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={e=> setUserName(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..."  onChange={e=> setEmail(e.target.value)} />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..."  onChange={e=> setPassword(e.target.value)}/>
        <button className="registerButton" type="submit">Register</button>
      </form>
      <Link className="link" to={"/login"}>
        <button className="registerLoginButton">Login</button>
        </Link>
       {error && <span>something went wrong!</span>}
     
    </div>
    )
}