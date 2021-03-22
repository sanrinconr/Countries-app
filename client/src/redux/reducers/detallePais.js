import {FETCH_DETALLE_PAIS_REQUEST, FETCH_DETALLE_PAIS_SUCCESS, FETCH_DETALLE_PAIS_ERROR} from "../actions/fetchDetallePais"

const default_paises_reducer={
    pais:{},
    consultando:false,
    error:null
}

export default function paiseDetalleReducer(status = default_paises_reducer, action){
    switch(action.type){
        case FETCH_DETALLE_PAIS_REQUEST:
            return {
                ...status,
                consultando:true,
            }
        case FETCH_DETALLE_PAIS_SUCCESS:
            return {
                ...status,
                consultando:false,
                paises: action.payload
            }
        case FETCH_DETALLE_PAIS_ERROR:
            return {
                ...status,
                consultando:false,
                paises: {},
                error:action.payload
            }   
        default:
            return status
    }
}