import React, { useState, useEffect } from "react";
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState("")
  const [newCountry, setNewCountry] = useState("")
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

  const CountriesList = () =>  {
    const countriesToShow = countries.filter(country => (country.name.toLowerCase()).includes(newSearch.toLowerCase()))

    return (
      countriesToShow.length > 10 ? <div>Too many matches, specify another filter</div>
      : countriesToShow.length === 1 
      ? PrintOneCountry(countriesToShow)
      : countriesToShow.map(country => (
        <li key={country.numericCode}>
        {country.name}
        <button value={country.name} onClick={handleCountry} type="Click">show</button>
        {newShow === true ?  
          <div>
          <h2>{country.name}</h2>
          <div>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
          </div>
          <h2>languages</h2>
          <div>
            <ul>
              {PrintLanguages(country.languages)}
            </ul>
          </div>
          <div><img src={country.flag}/></div>
        </div>
        {setNewShow(false)}
        : <div></div>}
        </li>

      ))
    )   

  }

  const handleCountry = event => {
      setNewShow(true);

  }

  const PrintLanguages = (props) => {

    const languages = props.map(language => <li key={props.indexOf(language)} >{language.name}</li>)

    return (
      languages
    )
  }
  const PrintOneCountry2 = (props) => {
    
    return (
      <div>
      <h2>{props.name}</h2>
      <div>
        <p>capital {props.capital}</p>
        <p>population {props.population}</p>
      </div>
      <h2>languages</h2>
      <div>
        {/* <ul>
          {PrintLanguages(props.languages)}
        </ul> */}
      </div>
      <div><img src={props.flag}/></div>
    </div>
    )
  }

  const PrintOneCountry = (props) => {
    
    return (
      <div>
      <h2>{props[0].name}</h2>
      <div>
        <p>capital {props[0].capital}</p>
        <p>population {props[0].population}</p>
      </div>
      <h2>languages</h2>
      <div>
        <ul>
          {PrintLanguages(props[0].languages)}
        </ul>
      </div>
      <div><img src={props[0].flag}/></div>
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