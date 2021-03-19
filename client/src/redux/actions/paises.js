import axios from "axios";


export const FETCH_PAISES_REQUEST = "FETCH_PAISES_REQUEST"
export const FETCH_PAISES_SUCCESS = "FETCH_PAISES_SUCCESS"
export const FETCH_PAISES_ERROR = "FETCH_PAISES_ERROR"


function _fetchPaisesRequest(){
    return {
        type:FETCH_PAISES_REQUEST,
    }
}
function _fetchPaisesSuccess(paises){
    return {
        type:FETCH_PAISES_SUCCESS,
        paylaod:paises
    }
}
function _fetchPaisesError(err){
    return {
        type:FETCH_PAISES_ERROR,
        payload:err
    }
}

export default function fetchPaises(){
    //El dispach se recibe gracias a thunk
    return (dispatch) =>{
        dispatch(_fetchPaisesRequest())
        axios.get(process.env.URL_API+"/countries")
        .then(res=>{
            dispatch(_fetchPaisesSuccess(res))
        })
        .catch(err=>{
            dispatch(_fetchPaisesError(err))
        })
    }
}