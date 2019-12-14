import React from 'react'

const PersonList = ({persons, newSearch, handlePersonDeletion}) => {
    const peopleToShow = persons.filter(person => (person.name.toLowerCase()).includes(newSearch.toLowerCase()))
  
    return (
        newSearch === "" ? persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => handlePersonDeletion(person)}>delete</button></li>
        ))
        : peopleToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
          <button onClick={() => handlePersonDeletion(person)}>delete</button>
          </li>))
    )
}

export default PersonList