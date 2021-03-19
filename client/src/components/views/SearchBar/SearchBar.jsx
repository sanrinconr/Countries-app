import { useState } from "react"

export default function SearchBar({obtenerPaisesPorNombre}){

    const [input, setInput] = useState("")

    function handleChange(event){
        setInput(event.target.value)
    }

    return <div>
        <input type="text"
    name="username" 
    value={input}
    onChange={handleChange}/>
    <button onClick={()=>obtenerPaisesPorNombre(input)}>Solitar</button>
    </div>
}