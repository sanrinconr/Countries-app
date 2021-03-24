import { useEffect, useState } from "react"
import {connect} from "react-redux"

import fetchPaises from "../../../redux/actions/fetchPaises"
import changeFiltroContinentes from "../../../redux/actions/filtroContinentes"

import "./Filtros.scss"
function Filtros({cambiarOrden, paginaSiguiente, orden, filtroContinentes, setContinente}){
    function handleChangeContinente(e){
        e.preventDefault()
        setContinente(e.target.value)
    }
    function handleChangeAlfabeto(e){
        if(orden !== e.target.value){
            cambiarOrden(0, e.target.value)
        }
        e.preventDefault()

    }
    return <div className="filtros">
                <span>Ordenar por  </span>
                <div className="filtroAlfabetico">
                       <select className='select' name="continente"  onChange={handleChangeAlfabeto}>
                        <option value="ASC">A-Z</option>
                        <option value="DESC">Z-A</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Polar">Antartida</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                <div className="filtroContinente">
                    <select value= {filtroContinentes} className='select' name="continente"  onChange={handleChangeContinente}>
                        <option value="Todos">Todos</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Polar">Antartida</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
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
    },
    setContinente:(continente)=>{
        dispatch(changeFiltroContinentes(continente))
    }
})


export default connect(
mapStateToProps,
mapDispatchToProps
)(Filtros)