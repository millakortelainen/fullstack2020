import React from 'react'
import Person from './Person'

const People = ({ people }) =>
    (
        <ul>
            {people.map((person, i) =>
                <Person key={person.name} person={person} />
            )}
        </ul>
    )

export default People