const {models} = require('../../sequelize/db');
const {buscarPorId} = require("../countries/db")
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
function _vincularActividadConPais(objActividad, paises){

    Promise.all(paises.map(pais=>buscarPorId(pais)))
    .then(res=>{
        console.log(res)
        return res
    })
    .catch(err=>{
        return {err:"Error",detail:err}
    })
}

module.exports = {crearActividad}