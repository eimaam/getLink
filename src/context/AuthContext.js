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
    const [isLogged, setIsLogged] = useState();
    const [user, setUser] = useState({})
    const [userInfo, setUserInfo] = useState({})

    // firestore
    const DocRef = collection(database, 'userDetails');

      useEffect(() => {
        const getUserData = async () => {
            onAuthStateChanged(auth, async data => {
                if(data){
                    try{
                        const document = await getDoc(doc(database, "userDetails", data.email))
                        if(!document.exists()){
                            await setDoc(doc(collection(database, "userDetails"), data.email),{
                            displayName: data.displayName,
                            photoURL: data.photoURL,
                        })
                        }
                        
                        const querySnapshot = await getDocs(collection(database, "userDetails"));
                        querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        })
                        setUser(data)
                        setIsLogged(!isLogged)
                    }
                    catch(err){
                        console.log(err.message)
                    }
                }
                })
            }
            
            getUserData()

        }, [])       


    const logInWithEmail = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(result => {
                setUser({
                    email: result.email,
                    id: result.uid,
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



      

    const logOut = () => {
        signOut(auth)
        setIsLogged(!isLogged)
        // setUser(undefined)
        navigate('../login')
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


