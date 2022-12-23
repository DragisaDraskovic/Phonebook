import Button from "./Button"

const Person = (person) => {



    return(
        <li>
            {person.name} {person.number} <Button/>
            
            
        </li>
    )
}
export default Person