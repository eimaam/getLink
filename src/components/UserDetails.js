import React, { useState, useEffect } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"
import { app, auth, database } from '../firebaseConfig'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDoc, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import avatar from "../Assets/avatar.jpg"
import { useAuth } from '../context/AuthContext';
import { Circles, CirclesWithBar } from 'react-loader-spinner'
import { useData } from '../context/DataContext';


export default function UserDetails() {
  const navigate = useNavigate()
  const { isLogged, user, } = useAuth();
  const { userInfo, fetchUserDetail } = useData();
 
  useEffect(() => {
    fetchUserDetail()
    console.log(userInfo.username)
  }, [])
  useEffect(() => {
    onAuthStateChanged(auth, data => {
        if(!data) navigate('../login')
    })
}, [])



  // STATE Hooks:
  const [message, setMessage] = useState('') 
  const [data, setData] = useState({
    username: '',
    displayName: '',
    bio: ''
  })  
  
  function handleChange(e){
    const {name, value} = e.target;
    setData(prevData => ({
      ...prevData, 
      [name]:value
    }))
    console.log(data)
  }
//   function to handle Form submit
  const addToUserInfoDoc = async (e) => {
    e.preventDefault();
    // const document = await getDoc(DocRef)
    try{
        await updateDoc(doc(collection(database, 'userDetails'), user.email), data)
        .then(res => {
          setTimeout(() => {
            setMessage('Profile Updated...')
          }, 2000); 
        })
      } 
      catch(error){
        alert(error.message)
      }
  }

  
  return (
    <div id='userDetails'>
        <div id='avatar'>
          {/* {user.photoURL ? <img src={user.photoURL} alt="avatar" /> : <Circles />} */}
          <label htmlFor="Display Photo">
            Upload/Change Photo:
          </label>
          <input type="file" accept='image' />
          <div className='header--text'>
            {/* <h3>{user.email}</h3>               */}
          </div>
        </div>
        <form onSubmit={addToUserInfoDoc}>
            <div>
                <label htmlFor="About">
                    About:
                </label>
                <textarea
                name='bio' 
                cols={10}
                placeholder="Enter a brief about you. eg. SOFTWARE ENGINEER @ Microsoft"
                value={data.bio}
                onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="Username">
                    Username:
                </label>
                {
                    userInfo.username 
                    ? 
                    <input 
                    type="text" 
                    value={userInfo.username}
                    />
                    :
                    <input 
                    type="text" 
                    name='username' 
                    value={data.username} 
                    onChange={(e) => handleChange(e)}
                    required
                    pattern='[A-Za-z0-9_]{1,15}'
                    />
                }
            </div>
            <div>
                <label htmlFor="Full Name">
                    Full Name:
                </label>
                <input 
                type="text" 
                name='displayName' 
                value={data.displayName} 
                onChange={(e) => handleChange(e)}
                />
            </div>
            
            <br />

            <input type='submit' value='UPDATE PROFILE' />
            {/* <button onClick={edit}>EDIT DATA</button> */}
            {message && <p className='success'>{message}</p>}
          <br /> 
          <br /> 
        </form>
    </div>
  )
}
