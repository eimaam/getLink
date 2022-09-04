import React, { useState, useEffect } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"
import { app, auth, database } from '../firebaseConfig'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDoc, addDoc, doc, setDoc } from 'firebase/firestore'
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
    })

    // useState HOOKS
    const [state, setState] = useState({});
    const [message, setMessage] = useState('') 
    //
    //  

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
  }

  // function to handle Form submit
  const updateProfile = async (e) => {
    e.preventDefault();
    // const document = await getDoc(DocRef)
    try{
      
            await setDoc(doc(collection(database, 'userDetails'), user.email),{
            instagram: data.instagram,
            twitter: data.twitter,
            snapchat: data.snapchat,
            portfolio: data.portfolio,
            youtube: data.youtube,
            apple: data.apple,
            spotify: data.spotify,
            audiomack: data.audiomack,
        }, {merge : true})
        } 
    // addDoc(DocRef, {
    //     email: user.email,
    //     instagram: data.instagram,
    //     twitter: data.twitter,
    //     snapchat: data.snapchat,
    //     portfolio: data.portfolio,
    //     youtube: data.youtube,
    //     apple: data.apple,
    //     spotify: data.spotify,
    //     audiomack: data.audiomack,
    //   })
    //   .then((res) => {
    //     setMessage('Note Uploaded successfully!')
    //   })
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

    // Hook for checking if User is Logged in
    useEffect(() => {
      onAuthStateChanged(auth, data => {
          if(!data) navigate('../signup')
          !isLogged && navigate('../signup')
      })
    }, [user])


  return (
    <div id='create'>
        <div id='avatar'>
          <img src={avatar} alt="avatar" />
          <div className='header--text'>
            <h3>{user.email}</h3>
            <i>'Bio goes here...Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, voluptate?' </i>
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
