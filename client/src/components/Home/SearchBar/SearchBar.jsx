import { useState } from "react"
import {connect} from "react-redux"
import fetchPaisesNombre from "../../../redux/actions/fetchPaisesNombre";
import "./SearchBar.scss"

function SearchBar({obtenerPaisesPorNombre}){

    const [input, setInput] = useState("")

    function handleChange(event){
        setInput(event.target.value)
    }

    return <div className="searchBar">
        <input type="text" value={input} onChange={handleChange}/>
        <input type="button" value="buscar" onClick={()=>obtenerPaisesPorNombre(input)}/>
    </div>
}

const mapDispatchToProps = (dispatch, ownProps) => ({
        obtenerPaisesPorNombre: (nombre) => {
                dispatch(fetchPaisesNombre(nombre,0))
        }
})


export default connect(
    null,
    mapDispatchToProps
  )(SearchBar)