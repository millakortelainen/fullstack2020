import React from 'react'
import Person from './Person'

const People = ({ people, peopleService, setPeople, setMessage }) => {
    const removePerson = id => {
        const result = window.confirm(`Delete ${people.find(p => p.id === id).name}?`)
        if (result) {
            setMessage(`${people.find(p => p.id === id).name} removed from phonebook`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            peopleService
                .remove(id)
            setPeople(people.filter(p => p.id !== id))

        }

    }
    return (
        <ul>
            {people.map((person, i) =>
                <Person key={person.name} person={person}
                    removePerson={() => removePerson(person.id)} />
            )}
        </ul>
    )
}

export default People