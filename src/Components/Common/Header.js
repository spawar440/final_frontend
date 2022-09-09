import React from 'react'
import '../../Styles/Header.css'
import Modal from 'react-modal'
import { useState } from 'react'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import '../../Styles/LoginForm.css'
import { Link } from 'react-router-dom';

const responseFacebook = (response) => {
   console.log(response);
 }
export default function () {
   const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    const styleobj={
      textAlign: "center"
    }
    const[isLoginModalOpen,setLoginModel]=useState(false)
    const[isCreateModalOpen,setCreateModal]=useState(false)


  return (
    <div className="header">
    <span className="logo">
       e!
    </span>
    <span className="login" onClick={()=>setLoginModel(true)}>
       Login
    </span>
  
    
     {/* <div className='btn-group login-block'> */}
       <span className="border"> </span>
     <span className="account1" onClick={()=>setCreateModal(true)}>
        Create an account
     </span>

  <Modal isOpen={isLoginModalOpen}
         style={customStyles}>
      <h2 style={styleobj}>Login
          <button onClick={()=>setLoginModel(false)} className='btn btn-danger float-end'>X</button>    
      </h2>
      <div className='container'>
      <form className="modal-content animate">
         <input placeholder='Enter Email Id' type="text"></input>
         <input placeholder='Enter Password' type="password"></input>
        <button className="sub_button" type='submit'>Login</button>
      </form>
      </div>
      <div className="container">
    <button onClick={()=>setLoginModel(false)} type="button" className="cancelbtn">Cancel</button>
    <span className="psw float-end">Forgot <a href="#">password?</a></span>
  </div>
      <FacebookLogin 
         appId="1088597931155576"
         fields="name,email,picture"
         callback={()=>responseFacebook}

       />

  <GoogleLogin
         clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
         buttonText="Login with Google"
         cookiePolicy={'single_host_origin'}
  />

      

  </Modal>


  <Modal isOpen={isCreateModalOpen}
         style={customStyles}>
      <h2 style={styleobj}>Register 
          <button onClick={()=>setCreateModal(false)} className='btn btn-danger float-end'>X</button>    
      </h2>
      <div className='container'>
      <form className="modal-content animate">
         <input placeholder='First Name' type="text"></input>
         <input placeholder='Last Name' type="password"></input>
         <input placeholder='Email' type="email"></input>
         <input placeholder='Password' type="password"></input>
         <input placeholder='Confirm Password' type="password"></input>
        <button className="sub_button" type='submit'>Login</button>
      </form>
      </div>
      <div className="container">
    <button onClick={()=>setCreateModal(false)} type="button" className="cancelbtn">Cancel</button>
    <span className="psw float-end">Already Register? 
    <Link to="">Login Here</Link></span>
  </div>
   </Modal>   

     </div>

  )
}
