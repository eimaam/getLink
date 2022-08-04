import React from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"

import avatar from "../Assets/avatar.jpg"

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
    const mappedData = data.map((element, index) => {
        return (
            <div>
                {element.icon}
                <a href={element.link} key={index}>
                    <h3>{element.title}</h3>
                </a>
            </div>
        )
    })
  return (
    <div id='profile'>
        <div id='avatar'>
          <img src={avatar} alt="avatar" />
          <div className='header--text'>
            <h3>$Username</h3>
            <i>'Bio goes here...Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, voluptate?' </i>
          </div>
        </div>
        <div className='form--data'>
            {mappedData}
        </div>
    </div>
  )
}
