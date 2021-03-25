import { useEffect, useState } from "react"
import {connect} from "react-redux"

import fetchPaises from "../../../redux/actions/fetchPaises"
import {changeFiltroContinentes, changeFiltroActividad, changeFiltroOrden} from "../../../redux/actions/filtros"

import axios from "axios"
import "./Filtros.scss"
function Filtros(props){
     //Relativo actividades, los filtros del componente
     const [actividades, setActividades] = useState([])

    //Relativo a los continentes
    const continentes = props.filtrosActuales.continentes
    const setContinente = props.setContinente

    //Relativo a el orden
    const orden = props.filtrosActuales.orden
    const cambiarOrden = props.cambiarOrden   

    //Actividad actual, desde redux
    const actividad =  props.filtroActividad
    const cambiarActividad = props.cambiarActividad

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL_API+"activity")
        .then(res=>res.data)
        .then(res=>setActividades(["Todas",...res]))
    },[])
    function handleChangeContinente(e){
        e.preventDefault()
        setContinente(e.target.value)
    }
    function handleChangeAlfabeto(e){

        if(orden !== e.target.value){
            cambiarOrden(e.target.value)
            props.fetchPaises()
        }
        e.preventDefault()

    }
    function handleChangeActividad(e){
        e.preventDefault()
        if(actividad !== e.target.value){
            if(e.target.value === "Todas"){
                cambiarActividad(null)
            }else{
                cambiarActividad(e.target.value)
            }
            props.fetchPaises()
        }
    }
    return <div className="filtros">
                <span>Ordenar por  </span>
                <div className="filtroAlfabetico">
                       <select value={orden} className='select' name="continente"  onChange={handleChangeAlfabeto}>
                        <option value="ASC">A-Z</option>
                        <option value="DESC">Z-A</option>
                    </select>
                </div>
                <div className="filtroContinente">
                    <select value= {continentes} className='select' name="continente"  onChange={handleChangeContinente}>
                        <option value="Todos">Todos</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Polar">Antartida</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                <div className="filtroActividades">
                    <select className='select' name="actividades"  onChange={handleChangeActividad}>
                        {actividades.map((act,i)=><option key={i} value={act}>{act}</option>)}
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
    /**
     * Se pide al back la pagina 0 de 15 paises dependiendo el orden
     * (se borra todos los paises actuales que se tengan)
     */
    cambiarOrden: (orden) => {
            dispatch(changeFiltroOrden(orden))
    },
    /**
     * Se actualiza en redux el filtro actual de continentes
     */
    setContinente:(continente)=>{
        dispatch(changeFiltroContinentes(continente))
    },
    /**
     * Se cambian los paises mostrados, se filtran por actividad
     */
    cambiarActividad:(actividad)=>{
        dispatch(changeFiltroActividad(actividad))
    },
    fetchPaises: ()=>{
        dispatch(fetchPaises())
    },
})


export default connect(
mapStateToProps,
mapDispatchToProps
)(Filtros)