import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", key: "Arto Hellas", number: "1234567" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [printAll, setPrintAll] = useState(true);
  const [newSearch, setNewSearch] = useState("")

  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      key: newName,
      number: newNumber
    };

    persons.find(person => person.name === newName)
      ? windowsAlert(newName)
      : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
  };

  const printCheck = () => {
    if (printAll === true) {
      printNames();
    }
    else{
      const people = persons.find(person => person.name === newName);
      printNames(people);
    }
    
  };
  const printNames = (props) =>
    persons.map(person => (
      <li key={person.key}>
        {person.name} {person.number}
      </li>
    ));

  const windowsAlert = () => {
    window.alert('${newName} is already added to the phonebook')
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        // onSubmit={
        //   persons.includes(person => person.name === newName)
        //     ? setPrintAll(false)
        //     : setPrintAll(true)
        // }
      >
        <div>
          filter shown with
          <input value={newSearch} onChange={handleSearchChange} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{printCheck()}</div>
    </div>
  );
};

export default App;
