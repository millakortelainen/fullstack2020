import React, { useState } from 'react'
const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const userStuff = () => {
    if (blog.user) {
      return (
        <>{blog.user.name}</>
      )
    }
  }

  const showRemoveButton = () => {
    if (blog.user) {
      if (blog.user.name === user.name) {
        return (
          <button onClick={removeBlog} id='remove-button'>remove</button>
        )
      }
    }

  }
  return (
    <div>
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility} id='view-button'>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button><br></br>
        {blog.url}<br></br>
        likes {blog.likes} <button onClick={addLike} id='like-button'>like</button><br></br>
        {userStuff()}<br></br>
        {showRemoveButton()}
      </div>
    </div>
  )
}

export default Blog
