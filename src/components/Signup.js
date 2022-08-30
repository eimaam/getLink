import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { app } from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from 'react';

export default function Signup() {
    let auth = getAuth();
    const [error, setError] = useState('')

    const [data, setData] = useState({
            email:"",
            password:"",
            confirm_password:"",
        }
    )

    function handleChange(e){
        const {name, value} = e.target
        
        setData(prevData => ({
            ...prevData,
            [name]: value
        })
        )
        console.log(data)
    };

    function handleSubmit(e){
        e.preventDefault()
        if(data.password != data.confirm_password){
            return setError('Passwords do not match')
        }else{
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                console.log(res.user)
            })
            .catch(err => {
                if(err.code === 'auth/weak-password'){
                    setError('Weak Password! Password should be at least 6 characters')
                }else if(err.code === 'auth/email-already-in-use'){
                    setError('Account already exist!')
                }else{
                    alert(err.code)
                }
                console.log(err.code)
            })
        }
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, data => {
            console.log(data)
            if(data){
                setError('SIGNED UP successfully... ')
            }
        })
    }, [error])
    
  return (
    <form id='signup' onSubmit={handleSubmit}>
        <div className='signup--div'>
                {/* {mappedData} */}
                <label htmlFor="Email">
                    Email:
                </label>
                <input 
                type="text" 
                name='email' 
                value={data.email} 
                required
                onChange={(e) => handleChange(e)}
                />
                
                <label htmlFor="Password">
                    Password:
                </label>
                <input 
                type="password" 
                name='password' 
                value={data.password} 
                required
                onChange={(e) => handleChange(e)}
                />
                
                <label htmlFor="Confirm Password">
                    Confirm Password:
                </label>
                <input 
                type="password" 
                name='confirm_password' 
                value={data.confirm_password} 
                onChange={(e) => handleChange(e)}
                />
                <p className='alert'>{error}</p>
                <input type='submit' value='SIGN UP' />
            <p>Have an account already? <Link to="/login">LOG IN</Link></p>
        </div>
    </form>
  )
}
