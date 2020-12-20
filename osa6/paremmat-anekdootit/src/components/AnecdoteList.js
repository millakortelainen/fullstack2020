
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showVoteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const filter = useSelector(({ filter }) =>
    filter)
    const anecdotes = useSelector(({ anecdotes }) => anecdotes)
                        .sort((anecdote1, anecdote2) =>
                          anecdote2.votes - anecdote1.votes)
                        .filter(a => a.content.includes(filter))
    const dispatch = useDispatch()
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => { 
                            dispatch(addVote(anecdote.id)) 
                            dispatch(showVoteNotification(anecdote.content))
                            setTimeout(() => {
                                dispatch(resetNotification())
                            }, 5000)
                            }}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList