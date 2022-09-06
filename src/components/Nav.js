import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hashlink"
import { FaBars, FaTimes } from "react-icons/fa"

import { useAuth } from "../context/AuthContext";

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
    const { logOut, isLogged } = useAuth();

    return (
        <React.Fragment>
            <nav id="nav">
                <div className="nav--element1">
                    <img src={avatar} alt="logo" style={{borderRadius: "50%"}}/>
                    <h2><a href="/" >getLinked</a></h2>
                </div>
                <ul className="nav--element1">
                    <li><HashLink to="/">HOME </HashLink></li>
                    <li><HashLink to="#skillsContainer">How-to</HashLink></li>
                    <li><HashLink to="#aboutContainer">About us</HashLink></li>
                    <li><HashLink to="#contactContainer">Contact <span>us</span></HashLink></li>
                    {
                    isLogged ? 
                    <li><NavLink to="/profile" id="customButton">profile</NavLink></li>
                    :
                    <li><NavLink to="/login" id="customButton">LOGIN</NavLink></li>
                    }
                    {isLogged && <li id="customButton" onClick={logOut}>SIGN OUT</li>}
                </ul>
                <FaBars className="FaBars" onClick={showHideNav}/>
                <FaTimes className="FaTimes" onClick={showHideNav}/>
            </nav>

            {/* Mobile Navigation Menu */}
            <div id="mNav">
                <ul>
                    <li><HashLink to="/">HOME </HashLink></li>
                    <li><HashLink to="#skillsContainer">How-to</HashLink></li>
                    <li><HashLink to="/profile" id="customButton">PROFILE</HashLink></li>
                    <li><HashLink to="#contactContainer">'Contact <span>us'</span></HashLink></li>
                    {/* <li><NavLink to="/create" id="hireButton">create links</NavLink></li> */}
                    {isLogged && <li id="customButton" onClick={logOut}>SIGN OUT</li>}
                </ul>
                {/* <p>&copy; Tech Desk Inc.</p> */}
            </div>
        </React.Fragment>
            
    )
}