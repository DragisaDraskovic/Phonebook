
  import {useEffect, useState} from "react";
  import personService from "./services/personService";
  import Person from "./Components/Person";
import { renderHook } from "@testing-library/react";


//FETCH I USEEFFECT
// const App = () => {
//   const [persons, setPersons] = useState([])
//   const [newPersonName, setNewPersonName] = useState('')
//   const [newPhoneNumer, setNewPhoneNumber] = useState('')

//   // useEffect(() => [
//   //   personService
//   //   .getAll()
//   //   .then(initialPerson => {
//   //     setPersons(initialPerson)
//   //   })
//   // ])

//   useEffect(() => {
//     axios
//     .get('http://localhost:3001/persons')
//     .then(response => {
//       setPersons(response.data)
//     })
//   })

//   const addPerson = (event) => {
//     event.preventDefault()
//     const personObject = {
//       name: newPersonName,
//       number: newPhoneNumer,
//       id: persons.length + 1
//     }

//     personService
//     .create(personObject)
//     .then(returnPerson => {
//       setPersons(persons.concat(returnPerson))
//       setNewPersonName(``)
//       setNewPhoneNumber(``)
//     })
//   }

//   const handlePersonNameChange = (event) => {
//     setNewPersonName(event.target.value)
//   }
  
//   const handlePhoneNumberChange = (event) => {
//     setNewPhoneNumber(event.target.value)
//   }

//   return (
//     <div>
//       <div>
//         <h1>Phonebook</h1>
//         {persons.map(person => {
//           <Person key={person.id} name={person.name} number={person.number} />
//         })}
//       </div>
//       <div>
//         <h1>Numbers</h1>
//       </div>
//     </div>
//   )
    //ZA SADA NIJE POTREBNA
  // const updatePerson = id => {
  //   const person = persons.find(p => p.id === id)
  //   const changePerson = {...Note, ovde ide sta zelim da promenim}

  //   personService
  //   .update(id, changePerson)
  //   .then(returnPerson => {
  //     setPersons(persons.map(person => person.id !== id ? note: returnPerson))
  //   })
  //   .catch(error => {
  //     alert(`neka poruka`)
  //   })
  //   setPersons(persons.filter(p => p.id !== id))
  // }
  //   return (
  //     <div>
  //       <h1>Notes</h1>
  //       <div>
  //         <button onClick={() => setShowAll(!showAll)}>
  //           show {showAll ? 'important' : 'all' }
  //         </button>
  //       </div>   
  //       <ul>
  //         {notesToShow.map(note => 
  //           <Note key={note.id} note={note} toogleImportance={() => toggleImportanceOf(note.id)}/>
  //         )}
  //       </ul>
  //       <form onSubmit={addNote}>
  //         <input
  //           value={newNote}
  //           onChange={handleNoteChange}
  //         />
  //         <button type="submit">save</button>
  //       </form>
  //     </div>
  //   )
  // }
// }
//     export default App


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPersonName, setNewPersonName] = useState('')
  const [newPhoneNumer, setNewPhoneNumber] = useState('')
  const [searchInput, setSearchIput] = useState([])
  const [personId, setPersonId] = useState('')
  const [nameId, setNameID] = useState('')



  useEffect(() => {
    personService
    .getAll()
    .then(initialPerson => {
      setPersons(initialPerson)
    })
  },[])

  const filterrrr = (names, newPersonName) => {
    return names.some((x) => newPersonName === x.newPersonName)
    }

  

  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newPersonName,
      number: newPhoneNumer,
      // id se generise sam u bazi!
      //id: persons.length + 1
    }


   if(filterrrr(persons, newPersonName) !== true){
    console.log(`nije se poklopilo i upisuje se novi`)
    personService
    .create(personObject)
    .then(returnPerson => {
      //zato sto se cita direkt iz baze, zato nema potreba da se radi sa ovim nizovima
      //setPersons(persons.concat(returnPerson))
      setNewPersonName(``)
      setNewPhoneNumber(``)
    })
    .catch(error => {
      console.log(error.respones.data.error)
    })
   } else {
    console.log(`ime za fetch ${newPersonName}`)
    console.log(`poklopilo se`)
    const result = persons.find(name => name.name === newPersonName)
    console.log(result.name)
    const id = result.id
    console.log(id)
    personService.update(id,personObject).then(returnedPerson => {
      setNewPersonName(``)
      setNewPhoneNumber(``)
    }
    )
   }

  }
  const deletePerson = (event) => {
    event.preventDefault()
    console.log(`u metodi delete }`)
    console.log(` ovaj id treba da se obrise ${personId}`)

    personService.deletePerson(personId)
    setNameID(personId)
  }

  const handlePersonNameChange = (event) => {
    setNewPersonName(event.target.value)
  }
  
  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleChange = (event) => {
    setSearchIput(event.target.value)
    
  }


  const fileredContact = persons.filter(
    ({name}) => name.toLowerCase().includes(searchInput)
    );

    const hook = (id) => {
    console.log(`id iz hooka ${id}`)
    setPersonId(id)
  }

  return (
    <div>
      <div>
        <h1>Phonebook</h1> 
        <ul>
        Filter shown with <p/>
        <input placeholder="Enter contact" onChange={handleChange}></input>
          {fileredContact.length > 1 ? `` :  fileredContact.map(person => 
            <Person key={person.id} name={person.name} number={person.number} />
          )}
        </ul>
      </div>
      <div>
        <h1>Add a new contact</h1>
        <form onSubmit={addPerson}>
          name: <input value={newPersonName} onChange={handlePersonNameChange}></input>
          <p/>
          number: <input value={newPhoneNumer} onChange={handlePhoneNumberChange}></input>
          <p/>       
        <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <form onSubmit={deletePerson}>
        <h1>Numbers</h1>
        <ul>
        {persons.map(person => 
            //<Person key={person.id} name={person.name} number={person.number} id={person.id}  />
            <li key={person.id}> {person.name}  {person.number} <button type="submit" onClick={() => hook(person.id)}>Delete</button></li>
        )}
        </ul>
        </form>
      </div>  
    </div>
  )
}
    export default App