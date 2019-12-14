import React from 'react'

const Filter = ({searchPerson, handleSearchChange, newSearch}) => {
    return ( 
       <form
          onSubmit={searchPerson}>
          <div>
            filter shown with
            <input value={newSearch} onChange={handleSearchChange} />
          </div>
        </form>
    )
  }

export default Filter