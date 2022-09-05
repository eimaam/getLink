import React, { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

// firebase auth and firestore imports
import { GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { doc, addDoc, collection, getDoc, getDocs, onSnapshot, orderBy, query, where, setDoc } from 'firebase/firestore'
import { app, database, auth } from '../firebaseConfig'
import { async } from '@firebase/util'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}   
    
export function AuthProvider({children}){
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const [error, setError] = useState('')
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({})
    // const [userInfo, setUserInfo] = useState([])


    // firestore
    const DocRef = collection(database, 'userDetails');

      useEffect(() => {
        const getUserData = async () => {
            onAuthStateChanged(auth, async data => {
                if(data){
                    setIsLogged(true)
                    try{
                        const document = await getDoc(doc(database, "userDetails", data.email))
                        if(!document.exists()){
                            await setDoc(doc(collection(database, "userDetails"), data.email),{
                            displayName: data.displayName,
                            photoURL: data.photoURL,
                            email: data.email
                        })
                        }
                    }
                    catch(err){
                        console.log(err.message)
                    }
                }
                setUser(data)
                console.log(data)
                // setIsLogged(false)
                })
            }
            getUserData()

        }, [])       


    // Gmail Login
    const logInWithPopUp = async (e) => {
        e.preventDefault()
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser({
                    email: result.email,
                    displayName: result.displayName,
                    photoURL: result.photoURL,
                    id: result.uid
                })
            })    
            .catch(err => {
                if(err.code == 'auth/popup-blocked'){
                    setError(err.code)
                }else{
                    setError(err.message)
                }
            })
      }

    //   LOGOUT function
    const logOut = () => {
        signOut(auth)
        .then(() => {
            localStorage.clear()
            setIsLogged(false)
            alert('Logged Out of session!')
        })
        navigate('../login')
    }


// set exports to variable Value 
const value = {
    logInWithPopUp,
    logOut,
    user,
    setUser,
    error,
    setError,
    isLogged,
    setIsLogged,
    googleProvider,
}
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}


