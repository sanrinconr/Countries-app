import {FETCH_PAISES_REQUEST, FETCH_PAISES_SUCCESS, FETCH_PAISES_ERROR} from "../actions/fetchPaises"
import { FETCH_PAISES_NOMBRE_ERROR, FETCH_PAISES_NOMBRE_REQUEST, FETCH_PAISES_NOMBRE_SUCCESS } from "../actions/fetchPaisesNombre"

const default_paises_reducer={
    paises:[],
    paginaSiguiente:0,
    consultando:false,
    orden:"ASC"
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
            if(action.payload.orden === status.orden){
                return {
                    ...status,
                    consultando:false,
                    paises: [...status.paises, ...action.payload.paises],
                    paginaSiguiente: status.paginaSiguiente+1
                }
            }else{
                return {
                    ...status,
                    consultando:false,
                    paises: [...action.payload.paises],
                    paginaSiguiente: 1,
                    orden:action.payload.orden
                }
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
                
        default:
            return status
    }
}