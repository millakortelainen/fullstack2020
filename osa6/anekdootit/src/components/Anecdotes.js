import React from 'react'
import AnecdoteForm from './AnecdoteForm.js'
import AnecdoteList from './AnecdoteList.js'

const Anecdotes = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm ></AnecdoteForm>
    </div>
  )
}

export default Anecdotes