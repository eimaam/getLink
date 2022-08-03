import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hashlink"
import { FaBars, FaTimes } from "react-icons/fa"

import avatar from "../Assets/avatar.jpg"

// Mobile Navigation setup
function showHideNav(){
    const hamburger = document.querySelector(".FaBars") 
    const mNav = document.getElementById("mNav");
    const closeNav = document.querySelector(".FaTimes");
    if(mNav.style.display !== "flex"){
        mNav.style.display = "flex"
        closeNav.style.display = "block"
        hamburger.style.display = "none"
    }else{
        mNav.style.display = "none"
        closeNav.style.display = "none"
        hamburger.style.display = "block"
    }
}
// function end


// Hide Mobie Nav Bar on click of body
export function hideMobileNav(){
    const hamburger = document.querySelector(".FaBars");
    const closeNav = document.querySelector(".FaTimes");
    const mNav = document.getElementById("mNav");
    
    mNav.style.display = "none";
    closeNav.style.display = "none";
    hamburger.style.display = "block";
}

export default function Nav(){
    return (
        <React.Fragment>
            <nav id="nav">
                <div className="nav--element1">
                    <img src={avatar} alt="logo" style={{borderRadius: "50%"}}/>
                    <h2><a href="/" >getLinked</a></h2>
                </div>
                <ul className="nav--element1">
                    <li><HashLink to="#contactContainer">Contact <span>us</span></HashLink></li>
                    <li><HashLink to="#skillsContainer">How-to</HashLink></li>
                    <li><HashLink to="#aboutContainer">About us</HashLink></li>
                    <li><Link to="/create" id="hireButton">create links</Link></li>
                </ul>
                <FaBars className="FaBars" onClick={showHideNav}/>
                <FaTimes className="FaTimes" onClick={showHideNav}/>
            </nav>

            {/* Mobile Navigation Menu */}
            <div id="mNav">
                <ul>
                <li><HashLink to="#contactContainer">'Contact <span>us'</span></HashLink></li>
                    <li><HashLink to="#skillsContainer">How-to</HashLink></li>
                    <li><HashLink to="#aboutContainer">About us</HashLink></li>
                    <li><HashLink to="#contactContainer" id="hireButton">create links</HashLink></li>
                </ul>
                {/* <p>&copy; Tech Desk Inc.</p> */}
            </div>
        </React.Fragment>
            
    )
}