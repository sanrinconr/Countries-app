import { useState } from "react"
import {connect} from "react-redux"

import fetchPaises from "../../../redux/actions/fetchPaises"

function Filtros({cambiarOrden, paginaSiguiente, orden}){
    const [input , setInput] = useState({
        continente:"",
        actividad:"",
    })
    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }
    function handleChangeAlfabeto(e){
        if(orden !== e.target.value){
            cambiarOrden(0, e.target.value)
        }
        e.preventDefault()

    }
    return <div className="filtros">
        <div className="filtroAlfabetico">
            <button name="nombre" value="ASC"  onClick={handleChangeAlfabeto}>Ascendentemente</button>
            <button name="nombre" value="DESC"  onClick={handleChangeAlfabeto}>Descendentemente</button>
        </div>
        <div className="filtroContinente">
            <select className='select' name="continente"  onChange={handleChange}>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Polar">Antartida</option>
                <option value="Oceania">Oceania</option>

            </select>
        </div>
        {/* <div className="filtroActividades">
        <select className='select' name="actividad" onChange={handleChange}> 
                <option value="test1">test1</option>
                <option value="test2">test2</option>
                <option value="test3">test3</option>

            </select>
        </div> */}
    </div>
}

//Para conocer que paises existen actualmente
const mapStateToProps = (state)=>{
    return state.paisesReducer
};
//Para poder pedir los primeros 10 paises
const mapDispatchToProps = (dispatch, ownProps) => ({
    cambiarOrden: (paginaSiguiente, orden) => {
            dispatch(fetchPaises(paginaSiguiente, orden))
    }
})


export default connect(
mapStateToProps,
mapDispatchToProps
)(Filtros)