import React from 'react'

import avatar from "../Assets/avatar.jpg"
export default function CreateProfile() {
  return (
    <div id='create'>
        <div id='avatar'>
          <img src={avatar} alt="avatar" />
        </div>
        <form>
            <input type="text" placeholder='Instagram Handle'/>
            <input type="text" placeholder='Twitter Handle'/>
            <input type="text" placeholder='Portfolio Website'/>
            <input type="text" placeholder='Apple Music Profile'/>
            <input type="text" placeholder='Spotify'/>
            <input type="text" placeholder='Audiomack'/>
            <input type="button" className="button" value="SUBMIT"/>
        </form>
    </div>
  )
}
