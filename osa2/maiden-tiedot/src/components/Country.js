import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    if (weather != null) {
        return (
            <div><h2>weather in {country.capital}</h2>
            <b>temperature:</b> {weather.current.temperature}<br></br>
                {weather.current.weather_icons.map((icon, i) => <img key={i} src={icon} />)}<br></br>
            <b>wind:</b> {weather.current.wind_speed} mph direction {weather.wind_dir}
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}

const Country = ({ country }) => (
    <div>
        <h1>{country.name}</h1>
    capital {country.capital}<br></br>
    population {country.population}
        <h2>languages</h2>
        <ul>
            {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
        </ul>
        <img src={country.flag} alt="flag" height={100} />
        <Weather country={country} />
    </div>
)

export default Country