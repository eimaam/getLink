import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { app, auth, database} from '../firebaseConfig'
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore'
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';

export default function Signup() {
    const DocRef = collection(database, 'userDetails')
    const { error, setError, isLogged, user, setUser} = useAuth();
    const { userInfo } = useData();
    const navigate = useNavigate();
    const [data, setData] = useState({
            displayName:"",
            email:"",
            username: "",
            password:"",
            confirm_password:"",
        }
    )

    useEffect(() => {
        onAuthStateChanged(auth, data => {
            if(data) navigate('../profile') 
        })
    }, [])
    
    useEffect(() => {
        error && setTimeout(() => {
            setError(null)
        }, 3000);
    }, [error])

    function handleChange(e){
        const {name, value} = e.target
    
        setData(prevData => ({
            ...prevData,
            [name]: value
        })
        )
    };

    function signUp(e){
        e.preventDefault()
        if(data.password != data.confirm_password ){
            return toast.error('Passwords do not match')
        }else if(data.password.length < 6){
            toast.error('Password must be more min of 6 characters')
        }else{
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                setUser({
                    email: data.email,
                    photoURL: res.photoURL,
                    displayName: data.displayName,
                    username: data.username
                })
                setDoc(doc(DocRef, data.email), {
                    email: data.email,
                    username: data.username,
                    displayName: data.displayName
                })
                
            })
            .catch(err => {
                if(err.code === 'auth/weak-password'){
                    toast.error('Weak Password! Password should be at least 6 characters')
                }else if(err.code === 'auth/email-already-in-use'){
                    toast.error('Account already exist!')
                }else{
                    toast.error(err.code)
                }
                
            })
        }
    }
    
    
    
  return (
    <form id='signup' onSubmit={signUp}>
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

                <label htmlFor="Full Name">
                    Full Name:
                </label>
                <input 
                type="text" 
                name='displayName' 
                value={data.displayName} 
                required
                onChange={(e) => handleChange(e)}
                />

                <label htmlFor="Username">
                    Username:
                </label>
                <input 
                type="text" 
                name='username' 
                value={data.username} 
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
