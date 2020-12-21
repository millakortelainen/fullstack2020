import React from 'react'
import AnecdoteForm from './AnecdoteForm.js'
import AnecdoteList from './AnecdoteList.js'
import Notification from './Notification.js'
import Filter from './Filter.js'

const Anecdotes = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <Notification></Notification>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm ></AnecdoteForm>
    </div>
  )
}

export default Anecdotes