/**
 * Conjunto de acciones encargado de traer paises por nombre
 */
import axios from "axios"; 

export const FETCH_PAISES_NOMBRE_REQUEST = "FETCH_PAISES_NOMBRE_REQUEST"
export const FETCH_PAISES_NOMBRE_SUCCESS = "FETCH_PAISES_NOMBRE_SUCCESS"
export const FETCH_PAISES_NOMBRE_ERROR = "FETCH_PAISES_NOMBRE_ERROR"


function _fetchPaisesNombreRequest(limpiar){
    return {
        type:FETCH_PAISES_NOMBRE_REQUEST,
        payload: {
            limpiar: limpiar
        }
    }
}
function _fetchPaisesNombreSuccess(paises){
    return {
        type:FETCH_PAISES_NOMBRE_SUCCESS,
        payload:paises
    }
}
function _fetchPaisesNombreError(err){
    return {
        type:FETCH_PAISES_NOMBRE_ERROR,
        payload:err
    }
}

export default function fetchPaisesNombre(nombre, paginaSiguiente){
    //El dispach se recibe gracias a thunk
    return (dispatch) =>{
        //Si se pide la pagina cero entonces se le dice a redux que limpie lo que haya de paises
        dispatch(_fetchPaisesNombreRequest(paginaSiguiente === 0 ? true : false))
        axios.get(process.env.REACT_APP_URL_API+"countries",{params:{name:nombre}})
        .then(res=>{
            console.log(res.data)
            dispatch(_fetchPaisesNombreSuccess(res.data))
        })
        .catch(err=>{
            dispatch(_fetchPaisesNombreError(err))
        })
    }
}