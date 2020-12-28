import React from 'react'
import Notification from './Notification'

const Login = (handleLogin, username, setUsername, password, setPassword) => {
    return (
        <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
}

export default Login