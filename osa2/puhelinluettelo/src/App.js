import React, { useState, useEffect } from 'react'
import axios from 'axios'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import peopleService from './services/people'



const App = () => {
    const [people, setPeople] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        peopleService
            .getAll()
            .then(initialPeople => {
                setPeople(initialPeople)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const found = people.find(person => person.name === newName)

        if (found !== undefined) {
            const personObject = {
                name: found.name,
                number: newNumber
            }
            const result = window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)
            if (result) {
                peopleService
                    .update(found.id, personObject)
                    .then(returnedPerson => {
                        setPeople(people.map(p => p.id !== found.id ? p : returnedPerson))
                        setMessage(`${found.name}'s number updated`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(`Information of ${found.name} was already removed from server.`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPeople(people.filter(p => p.id !== found.id))
                    })


            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            peopleService
                .create(personObject)
                .then(returnedPerson => {
                    setPeople(people.concat(returnedPerson))
                    setMessage(`${personObject.name} added to phonebook`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })

        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const peopleToShow = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <ErrorNotification message={errorMessage} />
            <Filter handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <People people={peopleToShow} peopleService={peopleService}
                setPeople={setPeople} setMessage={setMessage} />
        </div>
    )

}

export default App