import React, { useState } from 'react'
import { getAuth, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    sendPasswordResetEmail
  } from "firebase/auth";

export default function ResetPass() {
    const auth = getAuth()

    const [data, setData] = useState({
        email: ''
    })

    // Password Reset
    function resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(auth, data.email)
        .then((res) => {
          alert('Check your mail for reset link!')
        })
        .catch((err) => alert(err.messsage))
      }

      function handleChange(e){
        const {name, value} = e.target
        setData(prevData => ({
          ...prevData,
          [name]: value
        })
        )}
        console.log(data)
  return (
    <div className='resetPass'>
        <form action="" onSubmit={resetPassword}>
            <label htmlFor="reset password">Enter registered Email Address:</label>
            <input 
            type="email" 
            name='email'
            value={data.email}
            onChange={handleChange}
            />
            <input type="submit" value='RESET' />
        </form>
    </div>
  )
}
