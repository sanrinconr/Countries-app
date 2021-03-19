import {FETCH_PAISES_REQUEST, FETCH_PAISES_SUCCESS, FETCH_PAISES_ERROR} from "../actions/paises"

const default_paises_reducer={
    paises:[],
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
                payload: action.payload
            }
        case FETCH_PAISES_SUCCESS:
            return {
                ...status,
                consultando:false,
                payload: action.payload
            }
        default:
            return status
    }
}