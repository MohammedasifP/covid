import { useState } from "react";
import './Login.css'
import { loginloading} from "../Redux/Login/Loginaction";
import { loginsuccess } from "../Redux/Login/Loginaction";
import { loginfailure } from "../Redux/Login/Loginaction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login=()=>{
const [logindata,setLoginData]=useState({});
const dispatch=useDispatch();
const navigate=useNavigate();

const handlechange=(e)=>{
   const {id,value}=e.target;
   setLoginData({...logindata,[id]:value})
}

const senddata=(e)=>{
  e.preventDefault();
  dispatch(loginloading())
  fetch("https://asifcovidapp.herokuapp.com/login",{
      method:"POST",
      body:JSON.stringify(logindata),
      headers:{"content-type":"application/json"}
  }).then(Response=>Response.json()).then((data)=>{dispatch(loginsuccess(data));if(data.token)navigate("/home"); else{alert(data.message)}}).catch(dispatch(loginfailure()))
}

  return(
      <div className="singup-container">
        <div className="Covid-Login-Form">CovidApp Login Form</div>
        <div className="form_container">
         <div className='signup-img-div'>
                <img width="100%" height="100%" src="https://images.unsplash.com/photo-1584291527905-f930791fb1ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
           </div>
         <form onSubmit={senddata} className="form_containe">
             <label  id='lab'>Enter Your Registered Email Id</label><br/>
             <input className='signinp' type='text' id="email" onChange={handlechange} required/><br/><br/>
             <label id='lab'>Enter Your Registered Password </label><br/>
             <input className='signinp' type='text' id="password" onChange={handlechange} required/><br/><br/>
             <input id='subbtn'  type='submit'/>
         </form>
     </div>

      </div>
  )
}