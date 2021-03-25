/**
 * Al dar click en buscar se pedira a redux y este al back que traiga los paises que coincidan con 
 * ese nombre
 */
import { useState } from "react"
import {connect} from "react-redux"
import fetchPaises from "../../../redux/actions/fetchPaises";
import fetchPaisesNombre from "../../../redux/actions/fetchPaisesNombre";
import { cleanPaises } from "../../../redux/actions/limpiar";
import "./SearchBar.scss"

function SearchBar({obtenerPaisesPorNombre, cargarPaisesCero}){

    const [input, setInput] = useState("")

    function handleChange(event){
        setInput(event.target.value)
    }

    return <div className="searchBar">
        <input type="text" value={input} onChange={handleChange}/>
        <input type="button" value="buscar" onClick={()=>obtenerPaisesPorNombre(input)}/>
        <input type="button" value="Ver todos" onClick={()=>cargarPaisesCero()}/>
    </div>
}

const mapDispatchToProps = (dispatch, ownProps) => ({
        obtenerPaisesPorNombre: (nombre) => {
                dispatch(fetchPaisesNombre(nombre,0))
        },
        cargarPaisesCero:()=>{
            dispatch(cleanPaises())
            dispatch(fetchPaises())
        }
})


export default connect(
    null,
    mapDispatchToProps
  )(SearchBar)