const {models} = require('../../sequelize/db');
const {buscarPorId} = require("../countries/db")
//Operadores or y and
const { Op } = require("sequelize");

/**
 * Creacion de una nueva actividad y se vincula a los paises pedidos
 */
function crearActividad(nombre,dificultad,duracion,temporada, paises){
    return models.Actividad.create({
        Nombre:nombre,
        Dificultad:dificultad,
        Duracion:duracion,
        Temporada:temporada,
    })
    .then(actividad=>{
        return _vincularActividadConPais(actividad, paises)
    })
    .then((res)=>{
        if(res){
            return {nombre,dificultad,duracion,temporada, paises}
        }else{
            return {error:"Error al crear actividad",detail:"Ningun pais es valido"}
        }
    })
    .catch(err=>{
        return {error:"Error al crear actividad", detail:err}
    })
    
}

/**
 * Con esta funcion se vinculan los paises pedidos por el usuario a la nueva actividad
 */
function _vincularActividadConPais(objActividad, paises){
    if(!paises) return false
    return _garantizarPaisesEnBD(paises)
    .then(()=>{
        return _obtenerPaises(paises)
    })
    .then(paises=>{
        if(paises.length === 0){
            throw Error("Ningun pais existe")
        }
        //Ese metodo addPais es creado automaticamente por sequelize
        objActividad.addPais(paises)
    })
    .then(()=>{
        return true
    })
    .catch(()=>{
        objActividad.destroy()
        .then(res=>false)
    })
    
}
/**
 * Ya que el usuario puede pedir paises que no esten el base de datos
 * antes de hacer cualquier cosa toca validar que estos paises esten el bd
 * y sino agregarlos desde la api
 */
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
                Nombre:{
                    [Op.or]:paises
                }
            },
        })
        .catch(err=>{
            return {err:"error",detail:err}
        })
    
}
function obtenerActividades(){
	return models.Actividad.findAll({
        attributes:["Nombre"]
    })
	.then(res=>{
        return res.map(act=>act.Nombre)
    })
	.catch(err=>{
		return {error:"Ocurrio un error obteniendo actividades", details:err}
	})
}
function eliminarActividad(Nombre){
    return models.Actividad.destroy({
        where:{
            Nombre
        }
    })
    .then(res=>{
        return res.toString()
    })
    
}
module.exports = {crearActividad,obtenerActividades, eliminarActividad}