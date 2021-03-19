import {FETCH_PAISES_REQUEST, FETCH_PAISES_SUCCESS, FETCH_PAISES_ERROR} from "../actions/paises"

const default_paises_reducer={
    paises:[],
    paginaSiguiente:0,
    consultando:false
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