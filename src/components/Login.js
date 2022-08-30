import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { app } from '../firebaseConfig'
import { getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  sendPasswordResetEmail
} from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import ResetPass from './ResetPass';

export default function Login(props) {
  let auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [error, setError] = useState('')

  const [data, setData] = useState({
    email:"",
    password:"",
  })


    function handleChange(e){
        const {name, value} = e.target
        setData(prevData => ({
          ...prevData,
          [name]: value
        })
      )}
  
      
    function emailLogin(e){
      e.preventDefault()
      signInWithEmailAndPassword(auth, data.email, data.password)
          .then(res => {
              console.log(res.user)
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
              console.log(err.code)
            }
          })
    }

    // Gmail Login
    function gmailLogin(e){
      e.preventDefault()
      signInWithPopup(auth, googleProvider)
          .then(res => {
              console.log(res.user)
          })
          .catch(err => {
              alert(err.message)
          })
    }

    

  useEffect(() => {
    onAuthStateChanged(auth, data => {
        if(data) navigate('../profile')
    })
  }, [])
        
  return (
    <form id='signup' onSubmit={emailLogin}>
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
            <button id="customButton" onClick={gmailLogin}>LOGIN with <FcGoogle /></button>
            <p>Don't have an account yet?<a href="/signup"> SIGN UP! </a></p>
            <p>Forgot Password? <Link to="../reset" style={{color: 'red', fontWeight: 'bolder'}}> RESET </Link></p>
        </div>
    </form>
  )
}
