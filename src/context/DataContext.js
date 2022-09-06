import React from 'react'
import { dele } from 'firebase/auth'
import { collection, getDoc, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { createContext } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { database } from '../firebaseConfig'
import { useAuth } from './AuthContext'
import { useEffect } from 'react'


const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}
export function DataProvider({ children }){

    const { user } = useAuth()
    
    const [userInfo, setUserInfo] = useState([])

    
// //   const navigate = useNavigate()
// //   const [state, setState] = useState({});
// //   const [message, setMessage] = useState('') 
// //   const [data, setData] = useState({
// //     instagram: null,
// //     twitter: null,
// //     snapchat: null,
// //     portfolio: null,
// //     youtube: null,
// //     apple: null,
// //     spotify: null,
// //     audiomack: null,
// //     bio: null,
// //     fullname: '',
// //     username: null,

// //   })

//   function handleChange(e){
//     const {name, value} = e.target;
//     setData(prevData => ({
//       ...prevData, 
//       [name]:value
//     }))
//     console.log(data)
//   }


// //   // function to add data to UserInfo collection:
// //   const addToUserInfoDoc = async (e) => {
// //     e.preventDefault();
// //     // const document = await getDoc(DocRef)
// //     try{
// //         await updateDoc(doc(collection(database, 'userDetails'), user.email), data)
// //         .then(res => {
// //           setTimeout(() => {
// //             setMessage('Profile Updated...')
// //           }, 2000); 
// //         })
// //       } 
// //       catch(error){
// //         alert(error.message)
// //       }
// //   }

    // FUnction for fetching a specific user's detail
    const fetchUserDetail = async() => {
        const data = await getDoc(doc(database, "userDetails", user.email))
        .then(res => {
            setUserInfo(res.data())
            console.log(userInfo)
        })
        .catch(err => console.log(err.message))
    }



  

    
    
    
    
    
    
    
    const value = {
        userInfo,
        setUserInfo,
        fetchUserDetail,
    }
  return (
    <DataContext.Provider value={value}>
        { children }
    </DataContext.Provider>
  )
}
