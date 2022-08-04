import React from 'react'

import landingImage from "../Assets/Landing.svg";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
        <div>
            <h2>One Link for all</h2>
            <h3>Get one single link for all your social profiles </h3>
            <ul>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Apple Music</li>
                <li>Youtube and lots more!</li>
            </ul>
            <h3>Let your your customers/fans reach all your platforms in ONE click!</h3>
            <br />
            <Link to="/signup"><button>CREATE NOW!</button></Link>
        </div>
        <div>
            <img src={landingImage} alt="landing image"  id='landingImage'/>
        </div>
    </header>
  )
}
