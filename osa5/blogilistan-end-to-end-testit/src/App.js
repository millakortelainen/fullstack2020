import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })
  }

  const addLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: (blog.likes) + 1 }

    blogService
      .update(id, changedBlog, changedBlog.user)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log(`updating error ${error}`)
      })
  }

  const removeBlog = (id) => {
    const result = window.confirm(`Delete ${blogs.find(b => b.id === id).title}?`)
    if (result) {
      blogService
        .remove(id)
        .catch(error => {
          console.log(`wrong person ${error}`)
        })
      setBlogs(blogs.filter(blog => blog.id !== id))

    }
  }

  const loginStuff = () => {
    if (user === null) {
      return (
        <div id='loginForm'>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} />
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit" id='login-button'>login</button>
          </form>
        </div>
      )
    }

    const sortedBlogs = () => {
      return blogs.sort(function (a, b) {
        return b.likes - a.likes
      })
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogOut}>
          <button type="submit" onSubmit={handleLogOut}>log out</button>
        </form>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>


        {sortedBlogs().map(blog =>
          <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} removeBlog={() => removeBlog(blog.id)} user={user} />
        )}
      </div>
    )
  }

  return (
    <div>
      {loginStuff()}
    </div>
  )
}

export default App