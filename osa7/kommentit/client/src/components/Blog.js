import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, own, addComment }) => {

  const [comment, setComment] = useState('')

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
      <input value={comment} onChange={(event) => {
        setComment(event.target.value)
      }}></input><button onClick={() => {
        addComment(comment, blog.id)
        setComment('')
      }}>add comment</button>
      <ul>
        {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog