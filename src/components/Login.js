import React from 'react'

export default function Login() {
  return (
    <form id='signup'>
        <div className='signup--div'>
            <input type="text" placeholder='Username/Email Address' required />
            <input type="password" placeholder='Password' required />
            <button>LOG IN</button>
            <p>Don't have an account yet?<a href="/signup"> SIGN UP! </a></p>
            <p>Forgot Password? <a href="/"> Reset</a></p>
        </div>
    </form>
  )
}
