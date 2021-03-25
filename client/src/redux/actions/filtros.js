export const CHANGE_FILTRO_ACTIVIDAD = "CHANGE_FILTRO_ACTIVIDAD"
export const CHANGE_FILTRO_CONTINENTE = "CHANGE_FILTRO_CONTINENTE"
export const CHANGE_FILTRO_ORDEN = "CHANGE_FILTRO_ORDEN"
export const CHANGE_FILTRO_NOMBRE = "CHANGE_FILTRO_NOMBRE"

export function changeFiltroContinentes(filtro){
    return {
        type:CHANGE_FILTRO_CONTINENTE,
        payload:filtro
    }
}

export function changeFiltroActividad(filtro){
    return {
        type:CHANGE_FILTRO_ACTIVIDAD,
        payload:filtro
    }
}

export function changeFiltroOrden(filtro){
    return{
        type:CHANGE_FILTRO_ORDEN,
        payload:filtro
    }
}
export function changeFiltroNombre(filtro){
    return{
        type:CHANGE_FILTRO_NOMBRE,
        payload:filtro
    }
}