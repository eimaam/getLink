import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { app, database, auth} from '../firebaseConfig'
import { useAuth } from '../context/AuthContext'

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
    const { logOut, user } = useAuth();

    const navigate = useNavigate()
    
    const [userDetail, setUserDetail] = useState([])
    const DocRef = collection(database, 'userDetails')

    const fetchUserDetail = async() => {
        getDocs(DocRef)
        .then(res => {
            console.log(res.docs.map(item => {
                return {...item.data(), id: item.id} 
            }))
        })
        .catch(err => {
            alert(err.code)
        })
    }

    // fetch User's detail on load
    useEffect(() => {
        fetchUserDetail()
    }, [])

    // check if user is Logged in... navigate to LOGIN page if not logged in
    useEffect(() => {
        onAuthStateChanged(auth, data => {
            if(!data) navigate('../login')
        })
    }, [])


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
          <img src={user.photoURL} alt="avatar" />
          <div className='header--text'>
            {user ? <h3>{user.displayName}</h3> : <p>Loading...</p>}
            <h4>Bio:</h4>
            {bio ? <i>{bio[random].body}</i> : <p>Loading...</p>}
            
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
