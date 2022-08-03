import React, { useState } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaMusic, FaYoutube, FaSpotify, FaLink} from "react-icons/fa"

import avatar from "../Assets/avatar.jpg"
let inputs = [
  {
    icon: <FaInstagram className="profile--icon" />,
    input: <input type="text" placeholder='Instagram Handle'/>
  },
  {
    icon: <FaTwitter className="profile--icon" />,
    input: <input type="text" placeholder='Twitter Handle'/>
  },
  {
    icon: <FaSnapchat className="profile--icon" />,
    input: <input type="text" placeholder='Snapchat Handle'/>
  },
  {
    icon: <FaLink className="profile--icon" />,
    input: <input type="text" placeholder='Portfolio Website'/>
  },
  {
    icon: <FaYoutube className="profile--icon" />,
    input: <input type="text" placeholder='YouTube Channel'/>
  },
  {
    icon: <FaMusic className="profile--icon" />,
    input: <input type="text" placeholder='Apple Music'/>
  },
  {
    icon: <FaSpotify className="profile--icon" />,
    input: <input type="text" placeholder='Spotify Profile'/>
  },
  {
    icon: <FaMusic className="profile--icon" />,
    input: <input type="text" placeholder='Audiomack'/>
  }
]



export default function CreateProfile() {

  const [state, setState] = useState({});

  let mappedInputs = inputs.map((element, index) => {
    return (
      <div key={index}>
        {element.icon}
        {element.input}
      </div>
    )
    setState(mappedInputs);
  })
  
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
        </div>
        <form>
          {mappedInputs}
          <button onClick={addField}>Add More Links</button> 
          <br /> 
          <br /> 
          <button>CREATE!</button>
        </form>


        {/* <form>
            <div>
              <FaInstagram className="profile--icon" />
              <input type="text" placeholder='Instagram Handle'/>
            </div>
            <div>
              <FaTwitter className="profile--icon" />
              <input type="text" placeholder='Twitter Handle'/>
            </div>
            <div>
              <FaSnapchat className="profile--icon" />
              <input type="text" placeholder='Snapchat Handle'/>
            </div>
            <div>
              <FaFirefoxBrowser className="profile--icon" />
              <input type="text" placeholder='Portfolio Website'/>
            </div>
            <div>
              <FaYoutube className="profile--icon" />
              <input type="text" placeholder='YouTube Channel'/>
            </div>
            <div>
              <FaMusic className="profile--icon" />
              <input 
              type="text" 
              placeholder='Apple Music Profile'
              />
            </div>
            <div>
              <FaSpotify className="profile--icon" />
              <input type="text" placeholder='Spotify'/>
            </div>
            <div>
              <FaMusic className="profile--icon" />
              <input type="text" placeholder='Audiomack'/>
            </div>
            
            <button> CREATE </button>

        </form> */}
    </div>
  )
}
