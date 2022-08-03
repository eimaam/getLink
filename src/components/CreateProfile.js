import React from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaFirefoxBrowser} from "react-icons/fa"

import avatar from "../Assets/avatar.jpg"
export default function CreateProfile() {
  return (
    <div id='create'>
        <div id='avatar'>
          <img src={avatar} alt="avatar" />
        </div>
        <form>
            <div>
              <FaInstagram className="profile--icon" /><input type="text" placeholder='Instagram Handle'/>
            </div>
            <div>
              <FaTwitter className="profile--icon" /><input type="text" placeholder='Twitter Handle'/>
            </div>
            <div>
              <FaSnapchat className="profile--icon" /><input type="text" placeholder='Snapchat Handle'/>
            </div>
            <div>
              <FaFirefoxBrowser className="profile--icon" /><input type="text" placeholder='Portfolio Website'/>
            </div>
            <div>
              <FaYoutube className="profile--icon" /><input type="text" placeholder='YouTube Channel'/>
            </div>
            <div>
              <FaMusic className="profile--icon" /><input type="text" placeholder='Apple Music Profile'/>
            </div>
            <div>
              <FaSpotify className="profile--icon" /><input type="text" placeholder='Spotify'/>
            </div>
            <div>
              <FaMusic className="profile--icon" /><input type="text" placeholder='Audiomack'/>
            </div>
            
            <button> CREATE </button>

        </form>
    </div>
  )
}
