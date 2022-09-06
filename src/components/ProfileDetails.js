import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { app } from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function ProfileDetails() {
    let auth = getAuth();
    
    const [data, setData] = useState({
            f_name:"",
            m_name:"",
            l_name:"",
            username:"",
            password:"",
        }
    )

    function handleChange(e){
        const {name, value} = e.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        })
        )
    };

    function handleSubmit(e){
        e.preventDefault()
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                console.log(res.user)
            })
            .catch(err => {
                alert(err.message)
            })
    }
    

    
  return (
    <form id='signup' onSubmit={handleSubmit}>
        <div className='signup--div'>
                <label htmlFor="Username">
                    Username:
                </label>
                <input type="text" name='username' value={data.username} onChange={(e) => handleChange(e)}/>
                <label htmlFor="First Name">
                    First Name:
                </label>
                <input type="text" name='f_name' value={data.f_name} onChange={(e) => handleChange(e)}/>
                <label htmlFor="Middle Name">
                    Middle Name:
                </label>
                <input type="text" name='m_name' value={data.m_name} onChange={(e) => handleChange(e)}/>
                <label htmlFor="Last Name">
                    Last Name:
                </label>
                <input type="text" name='l_name' value={data.l_name} onChange={(e) => handleChange(e)}/>
                
                 
                
                <input type='submit' value='UPDATE PROFILE' />
        </div>
    </form>
  )
}
