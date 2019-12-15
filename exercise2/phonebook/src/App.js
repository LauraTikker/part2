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
    const message = `Delete ${person.name}?`
    return window.confirm(message)
  };

  const Notification = ({notification, notificationSuccess}) => {
    if (notification === null) {
      return (
        null
      )
    }

    return (
      <div className={notificationSuccess}>
          {notification}
        </div>
    )

  }

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("")
  const [notification, setNotification] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState('notificationSuccess')

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
        setNotification(`Updated ${returnedPerson.name} phonenumber`)
        
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        
      }).catch(error => {
        setNotification(`The ${newPerson.name} is not in the phonebook`)
        setNotificationSuccess('notificationError')
        setTimeout(() => {
          setNotification(null)
          setNotificationSuccess('notificationSuccess')
        }, 5000)
        setPersons(persons.filter(person => person.name !== newPerson.name))
    })
      
      )
      
    : console.log('not updated'))

      : personService.addPerson(newPerson)
      .then(returnedPerson => {
        setNotification(`Added ${returnedPerson.name} to the phonebook`)

        setTimeout(() => {
          setNotification(null)
        }, 5000)
        
        setPersons(persons.concat(returnedPerson)
        );
      }).catch(error => {
        setNotification(`The ${newPerson.name} is already in the phonebook`)
        setNotificationSuccess('notificationError')
        setTimeout(() => {
          setNotification(null)
          setNotificationSuccess('notificationSuccess')
        }, 5000)
        
        personService.getAllPersons()
        .then(initialPersons => {
          setPersons(initialPersons)
        })

    })
    
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (personToBeDeleted) => {
    windowsAlertForDeletion(personToBeDeleted) 
    ? personService.removePerson(persons.find(person => person.name === personToBeDeleted.name))
    .then(returnedPerson => {
      setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
    }).catch(error => {
        setNotification(`The ${personToBeDeleted.name} has already been removed from phonebook`)
        setNotificationSuccess('notificationError')
        setTimeout(() => {
          setNotification(null)
          setNotificationSuccess('notificationSuccess')
        }, 5000)
        setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
    })
     
    : console.log('nothing deleted')
    
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
      <Notification notification={notification} notificationSuccess={notificationSuccess}/>
      <Filter searchPerson={searchPerson} handleSearchChange={handleSearchChange} newSearch={newSearch}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} newSearch={newSearch} handlePersonDeletion={removePerson}/>
    </div>
  );
};

export default App;