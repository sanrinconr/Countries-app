export const CHANGE_FILTRO_CONTINENTE = "CHANGE_FILTRO_CONTINENTE"
export default function changeFiltroContinentes(filtro){
    return {
        type:CHANGE_FILTRO_CONTINENTE,
        payload:filtro
    }
}