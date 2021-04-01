import {FETCH_PAISES_REQUEST, FETCH_PAISES_SUCCESS, FETCH_PAISES_ERROR} from "../actions/fetchPaises"
import { CHANGE_FILTRO_ACTIVIDAD, CHANGE_FILTRO_CONTINENTE, CHANGE_FILTRO_NOMBRE, CHANGE_FILTRO_ORDEN } from "../actions/filtros"
import { CLEAN_PAISES } from "../actions/limpiar"

const default_paises_reducer={
    paises:[],
    paginaSiguiente:0,
    consultando:false,
    filtrosActuales:{
        orden:"ASC",
        continente:"Todos",
        actividad:null,
        nombre:null
    },
    error:null
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
                paises: [],
                error: action.payload
            }
        case FETCH_PAISES_SUCCESS:
            return {
                ...status,
                consultando:false,
                paises: [...status.paises, ...action.payload],
                paginaSiguiente:status.paginaSiguiente+1,
                error: null                
            }
        case CHANGE_FILTRO_CONTINENTE:
            return {
                ...status,
                filtrosActuales:{...status.filtrosActuales, continente:action.payload}
            }
        case CHANGE_FILTRO_ACTIVIDAD:
            return {
                ...status,
                paises:[],
                paginaSiguiente:0,
                filtrosActuales:{...status.filtrosActuales, actividad:action.payload}
            }
        case CHANGE_FILTRO_ORDEN:
            if(action.payload !== status.filtrosActuales.orden){
                return {
                    ...status,
                    paises:[],
                    paginaSiguiente:0,
                    filtrosActuales:{...status.filtrosActuales, orden:action.payload}
                }
            }
            return status
        case CHANGE_FILTRO_NOMBRE:
            return {
                ...status,
                filtrosActuales:{...status.filtrosActuales, nombre:action.payload}
            }
        case CLEAN_PAISES:
            return{
                ...status,
                paises:[],
                paginaSiguiente:0,
            }
        
        default:
            return status
    }
}