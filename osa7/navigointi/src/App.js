import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, newBlog, removeBlog, likeBlog } from './reducers/blogReducer'
import {
  Switch, Route, useRouteMatch, Link
} from "react-router-dom"

import loginService from './services/login'
import storage from './utils/storage.js'
import { initUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const users = useSelector(({ users }) => users)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const match = useRouteMatch('/users/:id')
  const showUser = match ? users.find(u => u.id === match.params.id) : null

  const match2 = useRouteMatch('/blogs/:id')
  const blog = match2 ? blogs.find(b => b.id === match2.params.id) : null

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification(message, type, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(newBlog(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: user.id }
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
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
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div>
      <div>
        <Link style={{ padding: 5 }} to={`/`}>blogs</Link>
        <Link style={{ padding: 5 }} to={`/users`}>users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User user={showUser} blogs={blogs} />
        </Route>
        <Route path='/users'>
          <Users users={users} blogs={blogs} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={user.username === (blog ? blog.user ? blog.user.username : null : false)}
          />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          {blogs.sort(byLikes).map(blog =>
            <div key={blog.id} style={blogStyle} className='blog'>
              <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
            </div>
          )}
        </Route>
      </Switch>

    </div>
  )
}

export default App