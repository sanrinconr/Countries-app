const {models} = require('../../sequelize/db');
const {buscarPorId} = require("../countries/db")
//Operadores or y and
const { Op } = require("sequelize");

function crearActividad(nombre,dificultad,duracion,temporada, paises){
    return models.Actividad.create({
        Nombre:nombre,
        Dificultad:dificultad,
        Duracion:duracion,
        Temporada:temporada,
    })
    .then(actividad=>{
        if(paises.length !==0){
            return _vincularActividadConPais(actividad, paises)
        }
        return false
    })
    .then(()=>{
        return {nombre,dificultad,duracion,temporada, paises}
    })
    .catch(err=>{
        return {error:"Error",details:err}
    })
}
async function _vincularActividadConPais(objActividad, paises){
    _garantizarPaisesEnBD(paises)
    .then(()=>{
        return _obtenerPaises(paises)
    })
    .then(paises=>{
        objActividad.addPais(paises)
    })
    .catch(err=>{
        return {err:"error",detail:err}
    })
    
}
function _garantizarPaisesEnBD(paises){
    return Promise.all(paises.map(pais=>buscarPorId(pais)))
    .then(res=>{
        return res
    })
    .catch(err=>{
        return {err:"Errors",detail:err}
    })
}

/**
 * Con esta funcion se obtienen todos los paises que se desean vincular
 * ¿Ya no los tenemos?, si pero hace falta el objeto pais para poder vincularlo
 */
function _obtenerPaises(paises){
        return models.Pais.findAll({
            where:{
                [Op.or]:paises.map(pais=>{
                    return {Id:pais}
                })
            },
        })
        .catch(err=>{
            return {err:"error",detail:err}
        })
    
}

module.exports = {crearActividad}