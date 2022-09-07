import React, { useState, useEffect } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"
import { app, auth, database } from '../firebaseConfig'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDoc, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import avatar from "../Assets/avatar.jpg"
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext'
import { Circles } from 'react-loader-spinner'
import { toast } from 'react-toastify';

// Data
let inputs = [
  {
    icon: <FaInstagram className="profile--icon" />,
    name: 'instagram',
  },
  {
    icon: <FaTwitter className="profile--icon" />,
    name: 'twitter',
  },
  {
    icon: <FaSnapchat className="profile--icon" />,
    name: 'snapchat'
  },
  {
    icon: <FaLink className="profile--icon" />,
    name: 'portfolio'
  },
  {
    icon: <FaYoutube className="profile--icon" />,
    name: 'youtube'
  },
  {
    icon: <FaMusic className="profile--icon" />,
    name: 'apple'
  },
  {
    icon: <FaSpotify className="profile--icon" />,
    name: 'spotify'
  },
  {
    icon: <FaMusic className="profile--icon" />,
    name: 'audiomack'
  }
]



export default function CreateProfile() {
  const navigate = useNavigate()
  const { isLogged, user } = useAuth();
  // const { handleChange } = useData();

  

  // Check if User is Logged in
  useEffect(() => {
    onAuthStateChanged(auth, data => {
      data ? navigate('../create') : navigate('../signup')
    })
  }, [user])



  // STATE Hooks:
  const [state, setState] = useState({});
  const [message, setMessage] = useState('') 
  const [data, setData] = useState({
    instagram: null,
    twitter: null,
    snapchat: null,
    portfolio: null,
    youtube: null,
    apple: null,
    spotify: null,
    audiomack: null,
    bio: null
  })
  
  const DocRef = collection(database, 'userDetails')
  

    
    // Profile Inputs
  let mappedInputs = inputs.map((element, index) => {
    return (
      <div key={index}>
        {element.icon}
        <input 
          type='text' 
          name={element.name}
          value={data.name}
          placeholder={element.name + ' @eimaam'}
          onChange={(e) => handleChange(e)}
        />
      </div>
    )
    setState(mappedInputs);
  })
  
  function handleChange(e){
    const {name, value} = e.target;
    setData(prevData => ({
      ...prevData, 
      [name]:value
    }))
    console.log(data)
  }

  // function to add data to UserInfo collection:
  const addToUserInfoDoc = async (e) => {
    e.preventDefault();
    // const document = await getDoc(DocRef)
    try{
        await updateDoc(doc(collection(database, 'userDetails'), user.email), data)
        .then(res => {
          setTimeout(() => {
            toast.success('Profile Updated...')
          }, 2000); 
        })
      } 
      catch(error){
        alert(error.message)
      }
  }
  
  
    function addField(e){
      // e.preventDefault();
      setState(inputs.push({
        icon: <FaLink className="profile--icon" />,
        name: 'Enter Personal Link'
      })
      )
    }


  return (
    <div id='create'>
        <div id='avatar'>
          {user.photoURL ? <img src={user.photoURL} alt="avatar" /> : <Circles />}
          <div className='header--text'>
            <h3>{data.email}</h3>
        
              <textarea
              name='bio' 
              cols={10}
              placeholder="Bio goes here... Enter a brief about you"
              value={data.bio}
              onChange={(e) => handleChange(e)}
              />
            
          </div>
        </div>
        <form onSubmit={addToUserInfoDoc}>
          {/* mapped inputs */}
            
            {mappedInputs}

             {/*  */}
          <button onClick={addField}>Add More Links</button> 
          {message && <p className='success'>{message}</p>}
          <br /> 
          <br /> 
          <input type="submit" value="Update Profile"/>
        </form>
    </div>
  )
}
