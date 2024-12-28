import { useState ,useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneServices from './services/phonebook'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas' ,
  //     phone: '040-1234567'
  //   }
  // ]) 



   const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)



  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    const messageStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }

    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }


  useEffect(() => {
    console.log('effects for phone ')

    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //     setNewNumber('')
    
    phoneServices 
      .getAllDetails()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  



  const handlePersonChange = (event) => {
    setNewName(event.target.value)
    // setNewPhone(event.target.value)

  } 

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }


  const  deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name} ?`)
    if(result){
      // axios
      //   .delete(`http://localhost:3001/persons/${id}`)
      //   .then(response => {
      //     setPersons(persons.filter(person => person.id !== id))
      //   })

      phoneServices
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = showAll 
  ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))



  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      // alert(`${newName} is already added to phonebook`)
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if(result){
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        // axios
        //   .put(`http://localhost:3001/persons/${person.id}`, changedPerson)
        //   .then(response => {
        //     setPersons(persons.map(person => person.id !== person.id ? person : response.data))
        //   })

        phoneServices
          .updateContact(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)))
            setErrorMessage(`Updated ${person.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
            .catch (error => {
              alert(`the person '${person.name}' was already deleted from server`)
              setPersons(persons.filter(p => p.id !== person.id))
            })

      }
      setNewName('') 
      setNewNumber('') 
      return ;
    }


    const personObject = {
      name: newName ,
      number : newNumber 
    }

    // axios
    //   .post('http://localhost:3001/persons', personObject)
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(persons.concat(response.data))

    phoneServices
      .createContact(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added Note :--- ${personObject.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      

    // setPersons(persons.concat(personObject))
    // setNewName('')
    // setNewNumber('')
  }

 
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} />
     
      {/* <div>
      FILTER shown with <input value={search}  onChange={handleSearchChange}/> <br />

       </div>
        <br /> */}


        <Filter search={search} handleSearchChange={handleSearchChange} />
     

        <h2>Add new Number </h2>

     
      {/* <form onSubmit={addPerson}>
        <div>





          name: <input value={newName}  onChange={handlePersonChange}/> <br />
          phone: <input value={newPhone}  onChange={handlePhoneChange}/>
        </div>
        <div>
          <button   type="submit">add</button>
        </div>
      </form> */}



        <PersonForm
        addPerson={addPerson}
        newName={newName}
        newPhone={newNumber}
        handlePersonChange={handlePersonChange}
        handlePhoneChange={handlePhoneChange}
      />



      {/* <h2>Numbers</h2>
      {personsToShow.map(person =>
        <p key={person.name}>{person.name}  : {person.phone}</p>
      )} */}



        <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App