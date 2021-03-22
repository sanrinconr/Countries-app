import axios from "axios"; 

export const FETCH_DETALLE_PAIS_REQUEST = "FETCH_DETALLE_PAIS_REQUEST"
export const FETCH_DETALLE_PAIS_SUCCESS = "FETCH_DETALLE_PAIS_SUCCESS"
export const FETCH_DETALLE_PAIS_ERROR = "FETCH_DETALLE_PAIS_ERROR"


function _fetchDetallePaisRequest(){
    return {
        type:FETCH_DETALLE_PAIS_REQUEST,
    }
}
function _fetchDetallePaisSuccess(paises){
    return {
        type:FETCH_DETALLE_PAIS_SUCCESS,
        payload:paises
    }
}
function _fetchDetallePaisError(err){
    return {
        type:FETCH_DETALLE_PAIS_ERROR,
        payload:err
    }
}

export default function fetchDetallePais(id){
    //El dispach se recibe gracias a thunk
    return (dispatch) =>{
        dispatch(_fetchDetallePaisRequest())
        axios.get(process.env.REACT_APP_URL_API+`countries/${id}`)
        .then(res=>{
            dispatch(_fetchDetallePaisSuccess(res.data))
        })
        .catch(err=>{
            dispatch(_fetchDetallePaisError(err))
        })
    }
}