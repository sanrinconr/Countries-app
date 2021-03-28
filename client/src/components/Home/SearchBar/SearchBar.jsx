/**
 * Al dar click en buscar se pedira a redux y este al back que traiga los paises que coincidan con 
 * ese nombre
 */
import { useState } from "react"
import {connect} from "react-redux"
import fetchPaises from "../../../redux/actions/fetchPaises";
import { changeFiltroActividad, changeFiltroContinentes, changeFiltroNombre, changeFiltroOrden } from "../../../redux/actions/filtros";
import { cleanPaises } from "../../../redux/actions/limpiar";
import "./SearchBar.scss"

function SearchBar({obtenerPaisesPorNombre, cargarPaisesCero}){

    const [input, setInput] = useState("")

    function handleChange(event){
        setInput(event.target.value)
    }

    return <div className="searchBar" aria-label="searchBarContainer">
        <input type="text" value={input} onChange={handleChange}/>
        <input type="button" className="button buttonBuscarPaises" value="buscar" onClick={()=>obtenerPaisesPorNombre(input)}/>
        <input type="button" className= "button buttonReiniciar" value="Ver todos" onClick={()=>{setInput("");cargarPaisesCero()}}/>
    </div>
}

const mapDispatchToProps = (dispatch, ownProps) => ({
        obtenerPaisesPorNombre: (nombre) => {
                dispatch(changeFiltroNombre(nombre))
                dispatch(cleanPaises())
                dispatch(fetchPaises())
        },
        cargarPaisesCero:()=>{
            dispatch(changeFiltroNombre(null))
            dispatch(changeFiltroContinentes("Todos"))
            dispatch(changeFiltroOrden("ASC"))
            dispatch(changeFiltroActividad(null))
            dispatch(cleanPaises())
            dispatch(fetchPaises())
        }
})


export default connect(
    null,
    mapDispatchToProps
  )(SearchBar)