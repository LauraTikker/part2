import React, { useState, useEffect } from "react";
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const windowsAlertForUpdate = (newPerson) => {
    const message = `${newPerson.name}` + ' is already added to the phonebook, replace the old number with a new one?'
    return window.confirm(message)
  };

  const windowsAlertForDeletion = (person) => {
    console.log(person.name)
    const message = `Delete ${person.name}?`
    return window.confirm(message)
  };

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("")

  const hook = () => {
    personService.getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    const existingPerson = persons.find(person => person.name === newPerson.name)

    existingPerson ? (windowsAlertForUpdate(existingPerson) ? (
      
      personService.updatePerson(existingPerson.id, {...newPerson, id: existingPerson.id})
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
      }))
    
    : console.log('not updated'))

      : personService.addPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      })
      
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (personToBeDeleted) => {
    windowsAlertForDeletion(personToBeDeleted) 
    ? personService.removePerson(persons.find(person => person.name === personToBeDeleted.name))
    .then(returnedPerson => {

      setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
    }) : console.log('nothing deleted')
    
  }

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
      <PersonList persons={persons} newSearch={newSearch} handlePersonDeletion={removePerson}/>
    </div>
  );
};

export default App;