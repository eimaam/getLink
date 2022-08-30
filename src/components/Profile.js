import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth'

const data = [
    {
        icon: <FaInstagram className="profile--icon"/>,
        link: "instagram.com/eimaam",
        title: "Instagram"
    },
    {
        icon: <FaTwitter className="profile--icon"/>,
        link: "twitter.com/eimaam",
        title: "Twitter"
    },
    {
        icon: <FaSnapchat className="profile--icon"/>,
        link: "snapchat/eimaam",
        title: "Snapchat"
    },
    {
        icon: <FaLink className="profile--icon"/>,
        link: "imamddahir.vercel.app/",
        title: "Portfolio"
    },
    {
        icon: <FaYoutube className="profile--icon"/>,
        link: "twitter.com/eimaam",
        title: "Twitter"
    },
    {
        icon: <FaMusic className="profile--icon"/>,
        link: "snapchat/eimaam",
        title: "Apple Music"
    },
    {
        icon: <FaSpotify className="profile--icon"/>,
        link: "snapchat/eimaam",
        title: "Spotify"
    },
    {
        icon: <FaMusic className="profile--icon"/>,
        link: "snapchat/eimaam",
        title: "Audiomack"
    },
]

export default function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, data => {
            console.log(data)
            if(!data) navigate('../login')
        })
    }, [])

    // SIGNOUT Function
    function handleSignOut(){
        signOut(auth)
        alert('SIGNED OUT successfully!')
    }

    const mappedData = data.map((element, index) => {
        return (
            <div key={index}>
                {element.icon}
                <a href={element.link} >
                    <h3>{element.title}</h3>
                </a>
            </div>
        )
    })

    const [username, setUsername] = useState(""); //random username state management
    const [avatar, setAvatar] = useState({});
    const [bio, setBio] = useState("");
    const random = Math.floor(Math.random() * 10) //generate random number
    
   const fetchData = () =>{
        let urls = [
            'https://jsonplaceholder.typicode.com/users',
            'https://jsonplaceholder.typicode.com/photos',
            'https://jsonplaceholder.typicode.com/posts'
        ]
       
       axios.all(urls.map(url => axios.get(url))).then((data) => {
            setUsername(data[0].data)
            setAvatar(data[1].data[random])
            setBio(data[2].data)

            
        })
    .catch(err => console.log(err))   
           
    }    
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
    <div id='profile'>
        <div id='avatar'>
          <img src={avatar.url} alt="avatar" />
          <div className='header--text'>
            {username ? <h3>{username[random].name}</h3> : <p>Loading...</p>}
            <h4>Bio:</h4>
            {bio ? <i>{bio[random].body}</i> : <p>Loading...</p>}
            
          </div>
        </div>
        <div className='form--data'>
            {mappedData}
        </div>
        <button onClick={handleSignOut}>SIGN OUT</button>
    </div>
  )
}
