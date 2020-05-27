import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }
  return (
    <>
    <table>
      <tbody>
      <StatLine text={"good"} num={good} />
      <StatLine text={"neutral"} num={neutral} />
      <StatLine text={"bad"} num={bad} />
      <All all={all} />
      <Average good={good} bad={bad} all={all} />
      <Positive good={good} all={all} />
      </tbody>
      </table>
    </>

  )
}


const Title = ({ title }) => <h2>{title}</h2>

const StatLine = ({ text, num }) => <tr><td>{text}</td><td>{num}</td></tr>

const All = ({ all }) => <StatLine text={"all"} num={all} />

const Average = ({ good, bad, all }) => {
  let avg = (good + bad * (-1)) / all
  return (
      <StatLine text={"average"} num={avg} />
  )
}

const Positive = ({ good, all }) => <tr><td>positive</td><td>{(good / all) * 100} %</td></tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const addAll = () => setAll(all + 1)
  const addGood = () => {
    setGood(good + 1)
    addAll()
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
    addAll()
  }
  const addBad = () => {
    setBad(bad + 1)
    addAll()
  }
  return (
    <div>
      <Title title={"give feedback"} />
      <Button handleClick={addGood} text={"good"} />
      <Button handleClick={addNeutral} text={"neutral"} />
      <Button handleClick={addBad} text={"bad"} />
      <Title title={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)