import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const data = [
        {
            placeholder: "First Name",
            type: "text",
        },
        {
            placeholder: "Middle Name",
            type: "text",
        },
        {
            placeholder: "Last Name",
            type: "text",
        },
        {
            placeholder: "Email Address",
            type: "email",
        },
        {
            placeholder: "Choose a Username",
            type: "text",
        },
        {
            placeholder: "Password",
            type: "password",
        },
        {
            placeholder: "Confirm Password",
            type: "password",

        }
    ]

    let mappedData = data.map((element, index) => {
        return (
            <input type={element.type} placeholder={element.placeholder} />
        )
    })
  return (
    <form id='signup'>
        <div className='signup--div'>
            {mappedData}
            <button>SIGNUP</button>
            <p>Have an account already? <Link to="/login">LOG IN</Link></p>
        </div>
    </form>
  )
}
