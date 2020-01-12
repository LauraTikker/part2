import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const removePerson = (person) => {
    const request = axios.delete(`${baseUrl}/${person.id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}

export default { getAllPersons, addPerson, removePerson, updatePerson}