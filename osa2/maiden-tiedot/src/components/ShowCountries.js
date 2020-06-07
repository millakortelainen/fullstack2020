import React from 'react'
import Country from './Country'

const ShowCountries = ({ countries, setSelectedCountry, selectedCountry }) => {

    if (selectedCountry != null) {
        return (
            <Country country={selectedCountry} />
        )
    }
    if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    }
    if (countries.length < 10) {
        return (
            countries.map(country => <div key={country.name}>
                {country.name} <button onClick={() => setSelectedCountry(country)}>show</button></div>)
        )
    }
    return (
        <div>Too many matches, specify another filter</div>
    )
}

export default ShowCountries