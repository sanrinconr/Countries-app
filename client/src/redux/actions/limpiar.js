export const CLEAN_PAISES = "CLEAN_PAISES"
export const CLEAN_PAISES_DETALLE = "CLEAN_PAISES_DETALLE"

export function cleanPaises(){
    return{
        type:CLEAN_PAISES
    }
}

export function cleanPaisesDetalle(){
    return{
        type:CLEAN_PAISES_DETALLE
    }
}
