import './Signup.css'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const Signup=()=>{
const [userdata,setUserdata]=useState({})
const [token,setToken]=useState("")
const navigate=useNavigate();

const handlechange=(e)=>{
    const {id,value}=e.target;
    setUserdata({...userdata,[id]:value})
}

const senddata=(e)=>{
    e.preventDefault();
    fetch("https://asifcovidapp.herokuapp.com/register",{
      method:"POST",
      body:JSON.stringify(userdata),
      headers:{"content-type":"application/json"}
    }).then(Response=>Response.json()).then(data=>{if(data.token){navigate('/login')} else alert(data.message)})
}

   return(
       <div className='singup-container'>
           <div className='covid-signup-heading'>CovidApp Signup Form</div>
           <div  className="form_container">
              <div className='signup-img-div'>
                <img width="100%" height="100%" src="https://images.unsplash.com/photo-1584291527905-f930791fb1ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
              </div>
             <form id="signup_form" onSubmit={senddata}>
               <label id='lab'>First Your First Name*</label><br/>
               <input className='signinp' type="text" id="name"  onChange={handlechange} required /><br/><br/>
               <label id='lab'>Last Your Last Name*</label><br/>
               <input className='signinp' type="text" id="lastname"  onChange={handlechange} required /><br/><br/>
               <label id='lab'>Enter Your Email Id*</label><br/>
               <input className='signinp' type="text" id="email" onChange={handlechange} required /><br/><br/>
               <label id='lab'>Enter Your New Password*</label><br/>
               <input className='signinp' type="text" id="password" onChange={handlechange} required /><br/><br/>
               <label id='lab'>Enter Your Mobile Number*</label><br/>
               <input className='signinp' type="text" id="number"  onChange={handlechange} required /><br/><br/>
               <input id='subbtn' type="submit"/>
               <p>If Account Already Exist login <span onClick={()=>{navigate("/login")}} className='logn-btn'>Login</span></p>
              </form>
           </div>
       </div>
   )

}