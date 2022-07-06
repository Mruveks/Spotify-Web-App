import React from "react"
import './login.css'

const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id=9b47b2c3fa614b70957ca57f85b96f08&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div className="login_container">
        <div className="login_button">
          <a href={AUTH_URL}>
          Login With Spotify
          </a>
        </div>
    </div>

  )
}