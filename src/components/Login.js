import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { app, database, auth } from '../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import ResetPass from './ResetPass';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';

import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
export default function Login(props) {
  const { logInWithEmail, logInWithPopUp, error, user, setUser } = useAuth();

  const navigate = useNavigate();

  // let auth = getAuth();
  // const googleProvider = new GoogleAuthProvider();
  // const navigate = useNavigate();
  // const DocRef = collection(database, 'users')

  // const [error, setError] = useState('')

  // const [user, setUser] = useState({
  //   email:"",
  //   password:"",
  // })


    function handleChange(e){
        const {name, value} = e.target
        setUser(prevUser => ({
          ...prevUser,
          [name]: value
        })
      )}
  
  //   function addUserToCollection(){
  //     onSnapshot(addDoc(DocRef, {
  //       email: user.email
  //     }))
  //   }
      
    // function emailLogin(e){
    //   e.preventDefault()
    //   signInWithEmailAndPassword(auth, user.email, user.password)
    //       .then( async (res) => {
    //           setUser(res.user)
    //           const ref = doc(database, "UserInfo", res.user.uid);
    //           const docRef = await setDoc(ref, user.email)
    //       })
    //       .then(re => {alert('Data entered oo!')})
    //       .catch(err => {
    //         if(err.code === 'auth/network-request-failed'){
    //           setError('Opps! Seems you are not connected to the internet...')
    //         }else if(err.code === 'auth/wrong-password'){
    //           setError('Incorrect Password!')
    //         }else if(err.code === 'auth/user-not-found'){
    //           setError('User not found!')
    //         }else if(err.code === 'auth/user-disabled'){
    //           setError('Account disabled!')
    //         }else{
    //           console.log(err.code)
    //         }
    //       })
    //       return addUserToCollection()
    // }

    // // Gmail Login
    // function gmailLogin(e){
    //   e.preventDefault()
    //   signInWithPopup(auth, googleProvider)
    //       .then(res => {
    //           alert(res.user)
    //       })
    //       .catch(err => {
    //           alert(err.message)
    //       })

    //   return addUserToCollection()
    // }

    

  useEffect(() => {
    onAuthStateChanged(auth, data => {
        if(data) navigate('../profile')
    })
  }, [])
        
  return (
    <form id='signup' onSubmit={logInWithEmail}>
        <div className='signup--div'>
            <input 
            id='email'
            type="email" 
            name='email' 
            value={user.email} 
            placeholder='Username/Email Address' 
            required 
            onChange={handleChange}
            />
            <input 
            id='password'
            type="password" 
            name='password' 
            value={user.password} 
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
