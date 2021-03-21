import { useState } from "react"
import "./SearchBar.scss"
export default function SearchBar({obtenerPaisesPorNombre}){

    const [input, setInput] = useState("")

    function handleChange(event){
        setInput(event.target.value)
    }

    return <div className="searchBar">
        <input type="text" value={input} onChange={handleChange}/>
        <input type="button" value="buscar" onClick={()=>obtenerPaisesPorNombre(input)}/>
    </div>
}