import axios from "axios"; 
import env from "react-dotenv";

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
        payload:paises
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
        axios.get(env.URL_API+"countries")
        .then(res=>{
            console.log(res.data)
            dispatch(_fetchPaisesSuccess(res.data))
        })
        .catch(err=>{
            dispatch(_fetchPaisesError(err))
        })
    }
}