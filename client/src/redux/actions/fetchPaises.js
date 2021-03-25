/**
 * Este conjunto de acciones se encarga de obtener los paises que se observan en \home
 */
import axios from "axios"; 

export const FETCH_PAISES_REQUEST = "FETCH_PAISES_REQUEST"
export const FETCH_PAISES_SUCCESS = "FETCH_PAISES_SUCCESS"
export const FETCH_PAISES_ERROR = "FETCH_PAISES_ERROR"


function _fetchPaisesRequest(){
    return {
        type:FETCH_PAISES_REQUEST,
    }
}
function _fetchPaisesSuccess(paises, orden){
    return {
        type:FETCH_PAISES_SUCCESS,
        payload:{paises, orden}
    }
}
function _fetchPaisesError(err){
    return {
        type:FETCH_PAISES_ERROR,
        payload:err
    }
}

export default function fetchPaises(paginaSiguiente, orden){
    //El dispach se recibe gracias a thunk
    return (dispatch) =>{
        dispatch(_fetchPaisesRequest())
        axios.get(process.env.REACT_APP_URL_API+"countries",{params:{page:paginaSiguiente, orden}})
        .then(res=>{dispatch(_fetchPaisesSuccess(
            //Como las actividades vienen en Nombre:"Actividad" se deja solo como un arreglo de strings
            res.data.map(pais=>{
                return {...pais, Actividades:pais.Actividades.map(act=>act.Nombre)}
            }), 
            orden))
        })
        .catch(err=>{
            dispatch(_fetchPaisesError(err))
        })
    }
}