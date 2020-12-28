import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  if (!blog) { return null }
  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : `no user`}</div>
        {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog