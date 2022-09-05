import React, { useState, useEffect } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"
import { app, auth, database } from '../firebaseConfig'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDoc, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import avatar from "../Assets/avatar.jpg"
import { useAuth } from '../context/AuthContext';

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
  // Hook for checking if User is Logged in
    useEffect(() => {
      if(!data){
        navigate('../signup')
      }
    })


  const { isLogged, user } = useAuth();

  const navigate = useNavigate()
  const DocRef = collection(database, 'userDetails')
  

    const [data, setData] = useState({
      instagram: '',
      twitter: '',
      snapchat: '',
      portfolio: '',
      youtube: '',
      apple: '',
      spotify: '',
      audiomack: '',
      bio: ''
    })

    // useState HOOKS
    const [state, setState] = useState({});
    const [message, setMessage] = useState('') 
    //
    
    // Profile Inputs
  let mappedInputs = inputs.map((element, index) => {
    return (
      <div key={index}>
        {element.icon}
        <input 
          type='text' 
          name={element.name}
          value={data.name}
          placeholder={element.name + ' Handle @eimaam'}
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

  // function to handle Form submit
  const updateProfile = async (e) => {
    e.preventDefault();
    // const document = await getDoc(DocRef)
    try{
        await updateDoc(doc(collection(database, 'userDetails'), user.email),{
          twitter: `twitter.com/${data.twitter}`,
          instagram: `instagram.com/${data.instagram}`,
          snapchat: `snapchat.com/${data.snapchat}`,
          portfolio: data.portfolio,
          youtube: data.youtube,
          apple: data.apple,
          spotify: data.spotify,
          audiomack: data.audiomack,
          bio: data.bio
        })
        .then(res => setMessage('Profile Update...'))
      } 
      catch(error){
        alert(error.message)
      }
  }
  
  
    function addField(e){
      e.preventDefault();
      setState(inputs.push({
        icon: <FaLink className="profile--icon" />,
        input: <input type="text" placeholder='Enter Link'/>
      })
      )
    }


  return (
    <div id='create'>
        <div id='avatar'>
          <img src={avatar} alt="avatar" />
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
        <form onSubmit={updateProfile}>
          {mappedInputs}
          <button onClick={addField}>Add More Links</button> 
          {message && <p className='success'>{message}</p>}
          <br /> 
          <br /> 
          <button>CREATE!</button>
        </form>
    </div>
  )
}
