import React, { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'

// firebase auth and firestore imports
import { GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { app, database, auth } from '../firebaseConfig'
import { Navigate, useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}   
    
export function AuthProvider({children}){
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const [error, setError] = useState('')
    const [isLogged, setIsLogged] = useState();
    const [user, setUser] = useState({
        email:"",
        password:"",
        displayName: ""
      })


      useEffect(() => {
        function getUserData(){
            onAuthStateChanged(auth, data => {
                if(data){
                    setIsLogged(true)
                    setUser({
                        email: user.email,
                        password: user.password
                    })
                }
                // console.log(data)
                // console.log(isLogged)
                // console.log(user.email)
            })
            }
            
            getUserData()

        }, [isLogged])
        

    const logInWithEmail = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(res => {
                setUser(prevData => ({
                    ...prevData,
                    displayName: res.displayName,
                    photoURL: res.photoURL
                }))
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

    // Gmail Login
    const logInWithPopUp = (e) => {
        e.preventDefault()
        signInWithPopup(auth, googleProvider)
            .then(res => {
                setUser(res.user)
                console.log(res)
            })
            .catch(err => {
                setError(err.code)
            })
            
      }

      

    const logOut = () => {
        signOut(auth)
        alert('SIGNED OUT successfully!')
        setIsLogged(false)
    }

const value = {
    logInWithEmail,
    logInWithPopUp,
    logOut,
    user,
    setUser,
    error,
    setError,
    isLogged,
    setIsLogged,
    googleProvider
}
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}


