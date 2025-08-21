import React from 'react'
import axios from "axios"
import { useState } from 'react'
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import {useNavigate} from "react-router-dom"
import "./SignUp.scss"

const SignUp = () => {
  const navigate=useNavigate();
  const[userData,setUserData]=useState({username:"",email:"",password:""})
   
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      const res=await axios.post("https://auth-lqrk.onrender.com/api/signup",userData);
      toast.success("Registraion Sucessful");
      setTimeout(()=>navigate("/login"),2000);
      console.log(res.data)

    }catch(e){
      toast.error(e.response?.data || "SignUp Failed")
    }

   }
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>SignUp</h1>
         <label>Username:</label>
         <input type="text" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
           <label>Email:</label>
         <input type="email" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} />
           <label>Password:</label>
         <input type="password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} />

         <button type='submit'>Submit</button>
      </form>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false}/>
    </div>
  )
}

export default SignUp