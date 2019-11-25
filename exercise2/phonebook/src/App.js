import React, { useState, useEffect } from "react";
import axios from 'axios'

const Filter = (props) => {
  return ( 
     <form
        onSubmit={props.searchPerson}>
        <div>
          filter shown with
          <input value={props.newSearch} onChange={props.handleSearchChange} />
        </div>
      </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const PersonList = (props) => {
  const peopleToShow = props.persons.filter(person => (person.name.toLowerCase()).includes(props.newSearch.toLowerCase()))

  return (
      props.newSearch === "" ? props.persons.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>))
      : peopleToShow.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>))
  )
}

const windowsAlert = (props) => {
    const message = props + ' is already added to the phonebook'
    window.alert(message)
  };

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("")

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    persons.find(person => person.name === newName)
      ? windowsAlert(newName)
      : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const searchPerson = event => {
    event.preventDefault();
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearchChange={handleSearchChange} newSearch={newSearch}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} newSearch={newSearch}/>
    </div>
  );
};

export default App;