import React from 'react'
import AnecdoteForm from './AnecdoteForm.js'
import AnecdoteList from './AnecdoteList.js'
import Notification from './Notification.js'

const Anecdotes = () => {

  return (
    <div>
      <Notification></Notification>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm ></AnecdoteForm>
    </div>
  )
}

export default Anecdotes