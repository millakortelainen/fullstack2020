import React from 'react'

const Person = ({ person, removePerson }) => <li>{person.name} {person.number}
<button onClick={removePerson}>delete</button>
</li>

export default Person