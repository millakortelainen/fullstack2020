import React from 'react'
import ReactDOM from 'react-dom'
const Header = (props) => { 
  return (
    <div>      
      <h1>{props.course.name}</h1>
    </div>
  ) 
}
const Part = (props) => { 
  return (
    <div>      
      <p>{props.part} {props.exercises}</p>
    </div>
  ) 
}

const Content = (props) => { 
 
  return (
    <>
    {props.parts.map(value => <Part part={value.name} exercises={value.exercises} />)}
    </>
  ) 
}

const Total = (props) => { 
  let total = 0
  props.parts.map(value => total += value.exercises)
  return (
    <div>      
      <p>Number of exercises {total}</p>
    </div>
  ) 
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }




  return (
    <>
      <Header course={course} />
      <Content parts ={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))