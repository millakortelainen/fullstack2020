import React from 'react'

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Part = ({ part, exercises }) => <><p>{part} {exercises}</p></>

const Content = ({ parts }) => (
  <div>
    {parts.map(value =>
      <Part key={value.id} part={value.name} exercises={value.exercises} />
    )}
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      <b>total of exercises {total}</b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course