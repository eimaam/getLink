import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { app, database, auth} from '../firebaseConfig'
import { useAuth } from '../context/AuthContext'





export default function Profile() {
    
    // check if user is Logged in... navigate to LOGIN page if not logged in
    useEffect(() => {
        onAuthStateChanged(auth, data => {
            if(!data) navigate('../login')
        })
    }, [])
    
    const { logOut, user } = useAuth();

    const navigate = useNavigate()
    
    const [userInfo, setUserInfo] = useState([])

    const fetchUserDetail = async() => {
        const data = await getDoc(doc(database, "userDetails", user.email))
        // const data = await getDocs(DocRef, user.email)
        .then(res => {
            setUserInfo(res.data())
            console.log(userInfo)
        })
        .catch(err => console.log(err.message))
    }

    // fetch User's detail on load
    useEffect(() => {
        fetchUserDetail()
    }, [user])
    const data = [
        {
            icon: <FaInstagram className="profile--icon"/>,
            link: userInfo.instagram,
            title: "Instagram"
        },
        {
            icon: <FaTwitter className="profile--icon"/>,
            link: userInfo.twitter,
            title: "Twitter"
        },
        {
            icon: <FaSnapchat className="profile--icon"/>,
            link: userInfo.snapchat,
            title: "Snapchat"
        },
        {
            icon: <FaLink className="profile--icon"/>,
            link: userInfo.portfolio,
            title: "Portfolio"
        },
        {
            icon: <FaYoutube className="profile--icon"/>,
            link: userInfo.youtube,
            title: "YouTube"
        },
        {
            icon: <FaMusic className="profile--icon"/>,
            link: userInfo.apple,
            title: "Apple Music"
        },
        {
            icon: <FaSpotify className="profile--icon"/>,
            link: userInfo.spotify,
            title: "Spotify"
        },
        {
            icon: <FaMusic className="profile--icon"/>,
            link: userInfo.audiomack,
            title: "Audiomack"
        },
    ]

    const mappedData = data.map((element, index) => {
        return (
            element.link != '' &&
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
    
   
        
    
   

    return (
    <div id='profile'>
        <div id='avatar'>
          <img src={userInfo.photoURL} alt="avatar" />
          <div className='header--text'>
            {userInfo.displayName ? <h3>{userInfo.displayName}</h3> : <i>Loading...</i>}
            <h4>Bio:</h4>
            <b>{userInfo.bio}</b> 
          </div>
        </div>
        <div className='form--data'>
            {mappedData}
        </div>
        <button>EDIT PROFILE</button>
        <button onClick={logOut}>SIGN OUT</button>
    </div>
  )
}
