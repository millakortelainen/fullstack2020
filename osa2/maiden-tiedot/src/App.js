import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'



const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(null)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <div>find countries <input onChange={handleCountryFilterChange} />
      <ShowCountries countries={countriesToShow} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
    </div>

  )
}
export default App