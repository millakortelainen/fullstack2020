import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(newZeroArray(anecdotes.length))
  const [favorite, setFavorite] = useState(0)

  function newZeroArray(length) {
    return Array.apply(null, new Array(length)).map(Number.prototype.valueOf, 0)
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  function indexOfMax(arr) {
    let maxVal = arr[0]
    let maxIndex = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > maxVal) {
        maxVal = arr[i]
        maxIndex = i
      }
    }
    return maxIndex
  }

  const handleClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [ ...points ]
    copy[selected] += 1
    setPoints(copy)
    setFavorite(indexOfMax(copy))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br></br>
       has {points[selected]} votes <br></br>
      <Button handleClick={handleVoteClick} text={"vote"} />
      <Button handleClick={handleClick} text={"next anecdote"} />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[favorite]} <br></br>
      has {points[favorite]} votes
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)