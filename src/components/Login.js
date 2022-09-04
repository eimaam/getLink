import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { app, database, auth } from '../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import ResetPass from './ResetPass';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';

import AuthContext from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
export default function Login(props) {
  const { logInWithEmail, logInWithPopUp, error, user, setUser } = useAuth();
  
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    onAuthStateChanged(auth, data => {
        if(data) navigate('../profile')
        setUser(data)
    })
  }, [])

    function handleChange(e){
        const {name, value} = e.target
        setData(prevUser => ({
          ...prevUser,
          [name]: value
        })
      )}

    

  
        
  return (
    <form id='signup' onSubmit={logInWithEmail}>
        <div className='signup--div'>
            <input 
            id='email'
            type="email" 
            name='email' 
            value={data.email} 
            placeholder='Username/Email Address' 
            required 
            onChange={handleChange}
            />
            <input 
            id='password'
            type="password" 
            name='password' 
            value={data.password} 
            placeholder='Password' 
            required 
            onChange={handleChange}
            />
            <input type='submit' value='LOGIN' />
            <p className='alert'>{error}</p>
            <button id="customButton" onClick={logInWithPopUp}>LOGIN with <FcGoogle /></button>
            <p>Don't have an account yet?<a href="/signup"> SIGN UP! </a></p>
            <p>Forgot Password? <Link to="../reset" style={{color: 'red', fontWeight: 'bolder'}}> RESET </Link></p>
        </div>
    </form>
  )
}
