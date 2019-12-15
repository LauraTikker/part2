import React, { useState, useEffect } from "react";
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState("")
  const [showCountry, setShowCountry] = useState("")
  const [newShow, setNewShow] = useState(false)

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  const handleSearchChange = event => {
    setNewSearch(event.target.value)
  }

  const searchCountry = event =>  {
    event.preventDefault()
  }

  const PrintCountries = (props) =>  {
    if (newShow === false && showCountry === "")  {
      return (
      props.map(country => (
      <li key={country.numericCode}>
        {country.name}
        <button onClick={handleCountry.bind(this, country)} type="Click">show</button></li>) 
    ))
    }

    return (
      <div>
        <button onClick={handleBack} type="Click">back</button>
        <h2>{showCountry.name}</h2>
        <div>
          <p>Capital {showCountry.capital}</p>
          <p>Population {showCountry.population}</p>
        </div>
        <h2>Languages</h2>
        <div>
          <ul>
            {PrintLanguages(showCountry.languages)}
          </ul>
        </div>
        <div><img src={showCountry.flag} alt={'flag of ' + props[0].name} width={200}/></div>
        <h2>Weather in {showCountry.capital}</h2>

        <h5>temperature</h5>

        <h5>wind</h5>

      </div>
    )
            
  }
  const handleBack = () => {
    newShow ? setNewShow(false) : setNewShow(true)
      setShowCountry("")
  }

  const CountriesList = () =>  {
    const countriesToShow = countries.filter(country => (country.name.toLowerCase()).includes(newSearch.toLowerCase()))

    return (
      countriesToShow.length > 10 ? <div>Too many matches, specify another filter</div>
      : countriesToShow.length === 1 
      ? PrintOneCountry(countriesToShow)
      : PrintCountries(countriesToShow) 
    )   
  }

  const handleCountry = (props) => {
      newShow ? setNewShow(false) : setNewShow(true)
      setShowCountry(props)     
  }

  const PrintLanguages = (props) => {
    const languages = props.map(language => <li key={props.indexOf(language)} >{language.name}</li>)

    return (
      languages
    )
  }

  const PrintOneCountry = (props) => {
    const parameters = {
      access_key: '7d5ac25c67b72e7e4ef6d0eed8de3a26',
      query: props[0].name
    }
    const query = 'query = ' + props[0].name
    const APiKey = 'access_key = 7d5ac25c67b72e7e4ef6d0eed8de3a26'
    axios.get('http://api.weatherstack.com/current' ? {APiKey} : {query})
    .then(response => {
      console.log('promise fulfilled2')
      console.log(response.data)
    })


    return (
      <div>
      <h2>{props[0].name}</h2>
      <div>
        <p>Capital {props[0].capital}</p>
        <p>Population {props[0].population}</p>
      </div>
      <h2>Languages</h2>
      <div>
        <ul>
          {PrintLanguages(props[0].languages)}
        </ul>
      </div>
      <div><img src={props[0].flag} alt={'flag of ' + props[0].name} width={200}/></div>
    </div>
    )
  }

  return (
    <form
        onSubmit={searchCountry}>
        <div>
          find countries 
          <input value={newSearch} onChange={handleSearchChange} />
        </div>
        <div>
          {CountriesList()}
        </div>
      </form>
  )
}

export default App;