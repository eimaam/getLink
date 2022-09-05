import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import ResetPass from './ResetPass';

import { useAuth } from '../context/AuthContext';

export default function Login(props) {
  const { logInWithPopUp, error, setError, user, setUser } = useAuth();

  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, data => {
        if(data) navigate('../profile')
        // setUser(data)
    })
  }, [])

  function handleChange(e){
    const {name, value} = e.target
    setData(prevData => ({
      ...prevData,
      [name]:value
    })
    )
  }

  // LOGIN with Email and Password Function:
  const logInWithEmail = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, data.email, data.password)
        .then(result => {
            setUser({
                email: data.email,
                password: data.password,
            })
        })
        .catch(err => {
          if(err.code === 'auth/network-request-failed'){
            setError('Opps! Seems you are not connected to the internet...')
          }else if(err.code === 'auth/wrong-password'){
            setError('Incorrect Password!')
          }else if(err.code === 'auth/user-not-found'){
            setError('User not found!')
          }else if(err.code === 'auth/user-disabled'){
            setError('Account disabled!')
          }else{
            setError(err.code)
          }
        })
  }

    

    

  
        
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

            <input 
            type='submit' 
            value='LOGIN' 
            />
            <p className='alert'>{error}</p>
            <button id="customButton" onClick={logInWithPopUp}>
              LOGIN with <FcGoogle />
            </button>
            <p>Don't have an account yet?<a href="/signup"> SIGN UP! </a></p>
            <p>Forgot Password? <Link to="../reset" style={{color: 'red', fontWeight: 'bolder'}}> RESET </Link></p>
        </div>
    </form>
  )
}
