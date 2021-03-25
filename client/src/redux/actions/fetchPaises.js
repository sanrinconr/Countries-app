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
    return (dispatch, getState) =>{
        dispatch(_fetchPaisesRequest())
        axios.get(process.env.REACT_APP_URL_API+"countries",{
            params:{
                page:getState().paisesReducer.paginaSiguiente, 
                orden:getState().paisesReducer.filtrosActuales.orden, 
                actividad:getState().paisesReducer.filtrosActuales.actividad,
                nombre:getState().paisesReducer.filtrosActuales.nombre}
            })
        .then(res=>{
            dispatch(_fetchPaisesSuccess(
            //Como las actividades vienen en Nombre:"Actividad" se deja solo como un arreglo de strings
            res.data.map(pais=>{
                return {...pais, Actividades:pais.Actividades.map(act=>act.Nombre)}
            })
            ))
        })
        .catch(err=>{
            dispatch(_fetchPaisesError(err))
        })
    }
}