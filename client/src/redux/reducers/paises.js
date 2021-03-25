import {FETCH_PAISES_REQUEST, FETCH_PAISES_SUCCESS, FETCH_PAISES_ERROR} from "../actions/fetchPaises"
import { FETCH_PAISES_NOMBRE_ERROR, FETCH_PAISES_NOMBRE_REQUEST, FETCH_PAISES_NOMBRE_SUCCESS } from "../actions/fetchPaisesNombre"
import { CHANGE_FILTRO_CONTINENTE } from "../actions/filtros"

const default_paises_reducer={
    paises:[],
    paginaSiguiente:0,
    consultando:false,
    orden:"ASC",
    filtroContinentes:"Todos",
    filtroActividad:"Todas"
}

export default function paisesReducer(status = default_paises_reducer, action){
    switch(action.type){
        case FETCH_PAISES_REQUEST:
            return {
                ...status,
                consultando:true,
            }
        case FETCH_PAISES_ERROR:
            return {
                ...status,
                consultando:false,
                paises: action.payload
            }
        case FETCH_PAISES_SUCCESS:
            let paisesNuevos = []
            let paginaSiguienteNueva = 0
            if(action.payload.orden === status.orden){
                paisesNuevos=[...status.paises, ...action.payload.paises]
                paginaSiguienteNueva=status.paginaSiguiente+1
            }
            else{
                paisesNuevos = [...action.payload.paises]
                paginaSiguienteNueva = 1
            }
            return {
                ...status,
                consultando:false,
                paises: paisesNuevos,
                paginaSiguiente: paginaSiguienteNueva,
                orden:action.payload.orden
            }
            
        
        case FETCH_PAISES_NOMBRE_REQUEST:
            return {
                ...status,
                consultando:true,
                paises: action.payload.limpiar ? [] : status.paises,
                paginaSiguiente: action.payload.limpiar? 0 : status.paginaSiguiente
            }
        case FETCH_PAISES_NOMBRE_ERROR:
            return {
                ...status,
                consultando:false,
                paises: action.payload
            }

        case FETCH_PAISES_NOMBRE_SUCCESS:
            return {
                ...status,
                consultando:false,
                paises: [...status.paises, ...action.payload],
                paginaSiguiente: status.paginaSiguiente+1
            }
        case CHANGE_FILTRO_CONTINENTE:
            return {
                ...status,
                filtroContinentes:action.payload
            }
        default:
            return status
    }
}