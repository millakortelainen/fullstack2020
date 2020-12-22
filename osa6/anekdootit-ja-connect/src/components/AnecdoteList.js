
import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes
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
                            props.addVote(anecdote.id)
                            props.setNotification(`you voted '${anecdote.content}'`, 5)
                        }}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.sort((anecdote1, anecdote2) =>
            anecdote2.votes - anecdote1.votes)
            .filter(a => a.content.includes(state.filter))
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)