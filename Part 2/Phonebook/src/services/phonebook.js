import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllDetails = () => {
   const request =  axios.get(baseUrl)
   return  request.then(response => response.data)
    }

const createContact = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteContact = id => {
    
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateContact = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}



export default { getAllDetails, createContact, updateContact ,deleteContact }