const {models} = require('../../sequelize/db');

function crearActividad(nombre,dificultad,duracion,temporada){
    return models.Actividad.create({
        Nombre:nombre,
        Dificultad:dificultad,
        Duracion:duracion,
        Temporada:temporada,
    })
    .then(()=>{
        return {nombre,dificultad,duracion,temporada}
    })
    .catch(err=>{
        return {error:"Error",details:err}
    })
}

module.exports = {crearActividad}